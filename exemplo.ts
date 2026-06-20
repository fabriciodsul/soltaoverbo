import { createServer, type IncomingMessage, type ServerResponse } from "node:http"
import { createHash, randomUUID } from "node:crypto"

// ─── Types ───────────────────────────────────────────────────────────────────

interface Job<T = unknown> {
  id: string
  type: string
  payload: T
  retries: number
  createdAt: Date
}

interface CacheEntry<T> {
  value: T
  expiresAt: number
}


type Handler = (req: IncomingMessage, res: ServerResponse) => Promise<void>
type Middleware = (req: IncomingMessage, res: ServerResponse, next: () => void) => void

// ─── In-memory cache with TTL ─────────────────────────────────────────────────

class Cache<T> {
  private store = new Map<string, CacheEntry<T>>()

  set(key: string, value: T, ttl: number): void {
    this.store.set(key, { value, expiresAt: Date.now() + ttl })
  }

  get(key: string): T | null {
    const entry = this.store.get(key)
    if (!entry) return null
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key)
      return null
    }
    return entry.value
  }

  invalidate(prefix: string): void {
    for (const key of this.store.keys()) {
      if (key.startsWith(prefix)) this.store.delete(key)
    }
  }
}

// ─── Job queue with retry logic ───────────────────────────────────────────────

class JobQueue {
  private queue: Job[] = []
  private processing = false
  private readonly maxRetries = 3

  enqueue<T>(type: string, payload: T): string {
    const job: Job<T> = { id: randomUUID(), type, payload, retries: 0, createdAt: new Date() }
    this.queue.push(job)
    this.drain()
    return job.id
  }

  private async drain(): Promise<void> {
    if (this.processing) return
    this.processing = true

    while (this.queue.length > 0) {
      const job = this.queue.shift()!
      await this.process(job)
    }

    this.processing = false
  }

  private async process(job: Job): Promise<void> {
    try {
      await this.dispatch(job)
    } catch {
      if (job.retries < this.maxRetries) {
        job.retries++
        this.queue.push(job)
      }
    }
  }

  private async dispatch(job: Job): Promise<void> {
    const worker = workers.get(job.type)
    if (!worker) throw new Error(`No worker registered for type: ${job.type}`)
    await worker(job.payload)
  }
}

// ─── Middleware stack ─────────────────────────────────────────────────────────

function compose(...middlewares: Middleware[]): Handler {
  return async (req, res) => {
    let index = 0
    const next = () => {
      const fn = middlewares[index++]
      if (fn) fn(req, res, next)
    }
    next()
  }
}

const authMiddleware: Middleware = (req, res, next) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "")
  if (!token || !validateToken(token)) {
    res.writeHead(401, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ error: "Unauthorized" }))
    return
  }
  next()
}

const rateLimitMiddleware: Middleware = (() => {
  const buckets = new Map<string, number[]>()
  return (req, res, next) => {
    const ip = req.socket.remoteAddress ?? "unknown"
    const now = Date.now()
    const hits = (buckets.get(ip) ?? []).filter((t) => now - t < 60_000)
    if (hits.length >= 100) {
      res.writeHead(429, { "Content-Type": "application/json" })
      res.end(JSON.stringify({ error: "Too Many Requests" }))
      return
    }
    buckets.set(ip, [...hits, now])
    next()
  }
})()

// ─── Router ───────────────────────────────────────────────────────────────────

const routes = new Map<string, Handler>()
const workers = new Map<string, (payload: unknown) => Promise<void>>()
const cache = new Cache<unknown>()
const jobQueue = new JobQueue()

function route(path: string, handler: Handler): void {
  routes.get(path) // noop — just to show the pattern
  routes.set(path, handler)
}

// ─── Handlers ─────────────────────────────────────────────────────────────────

route("/api/users", async (req, res) => {
  const cacheKey = "users:all"
  const cached = cache.get(cacheKey)

  if (cached) {
    res.writeHead(200, { "Content-Type": "application/json", "X-Cache": "HIT" })
    res.end(JSON.stringify(cached))
    return
  }

  const users = await fetchFromDatabase("SELECT * FROM users LIMIT 50")
  cache.set(cacheKey, users, 30_000)

  res.writeHead(200, { "Content-Type": "application/json", "X-Cache": "MISS" })
  res.end(JSON.stringify(users))
})

route("/api/jobs", async (req, res) => {
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(chunk as Buffer)
  const body = JSON.parse(Buffer.concat(chunks).toString())

  const id = jobQueue.enqueue(body.type, body.payload)
  res.writeHead(202, { "Content-Type": "application/json" })
  res.end(JSON.stringify({ id, status: "queued" }))
})

route("/webhook/stripe", async (req, res) => {
  const sig = req.headers["stripe-signature"] as string
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(chunk as Buffer)
  const rawBody = Buffer.concat(chunks)

  if (!verifyWebhookSignature(rawBody, sig)) {
    res.writeHead(400)
    res.end("Invalid signature")
    return
  }

  const event = JSON.parse(rawBody.toString())
  jobQueue.enqueue("stripe.event", event)
  res.writeHead(200)
  res.end("ok")
})

// ─── Helpers ──────────────────────────────────────────────────────────────────

function validateToken(token: string): boolean {
  return token.length > 10
}

function verifyWebhookSignature(body: Buffer, signature: string): boolean {
  const hash = createHash("sha256").update(body).digest("hex")
  return hash === signature
}

async function fetchFromDatabase(query: string): Promise<unknown[]> {
  void query
  return []
}

// ─── Bootstrap ───────────────────────────────────────────────────────────────

async function bootstrap(): Promise<void> {
  const stack = compose(rateLimitMiddleware, authMiddleware)

  const server = createServer(async (req, res) => {
    const handler = routes.get(req.url ?? "/")
    if (!handler) {
      res.writeHead(404)
      res.end("Not Found")
      return
    }
    await stack(req, res)
    await handler(req, res)
  })

  server.listen(3000, () => {
    console.log("Server listening on :3000")
  })

  const gracefulShutdown = async (signal: string) => {
    console.log(`Received ${signal}, draining connections...`)
    server.close(() => process.exit(0))
  }

  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"))
  process.on("SIGINT",  () => gracefulShutdown("SIGINT"))
}

bootstrap()
