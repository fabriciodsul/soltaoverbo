export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-md">
        <span className="text-sm font-semibold tracking-tight text-white">verbo</span>
        <div className="flex items-center gap-6 text-sm text-zinc-400">
          <a href="#funciona" className="hover:text-white transition-colors">Como funciona</a>
          <a href="#explain" className="hover:text-white transition-colors">verbo explain</a>
          <a href="#instalacao" className="hover:text-white transition-colors">Instalação</a>
          <a
            href="https://marketplace.visualstudio.com/items?itemName=verbo-dev.verbo"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 bg-[#4ade80] text-black rounded-full text-xs font-semibold hover:bg-[#4ade80]/90 transition-colors"
          >
            VS Code
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-8 text-center overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#4ade80]/8 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 text-xs font-medium border border-[#4ade80]/20 rounded-full text-[#4ade80] bg-[#4ade80]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
            275 termos · 14 categorias · repetição espaçada
          </div>
          <h1 className="text-shimmer text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Inglês técnico<br />enquanto você coda
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto leading-relaxed mb-10">
            O verbo detecta termos como <Code>middleware</Code>, <Code>embedding</Code> e <Code>payload</Code> no
            seu código e exibe traduções em português — sem interromper o fluxo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <code className="bg-[#111112] border border-[#27272a] text-[#4ade80] px-5 py-3 rounded-xl text-sm font-mono select-all">
              npm install -g @soltaoverbo/cli
            </code>
            <a
              href="https://marketplace.visualstudio.com/items?itemName=verbo-dev.verbo"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 border border-white/10 rounded-xl text-sm font-medium hover:border-white/30 hover:bg-white/5 transition-colors"
            >
              Instalar no VS Code →
            </a>
          </div>

          {/* Terminal preview */}
          <div className="mt-16 mx-auto max-w-3xl bg-[#111112] border border-[#27272a] rounded-2xl overflow-hidden text-left shadow-2xl">
            <div className="flex items-center gap-1.5 px-5 py-3 border-b border-[#27272a]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-zinc-500 font-mono">~/projeto $ cat handler.ts | verbo start</span>
            </div>
            <pre className="p-6 text-sm font-mono leading-7 overflow-x-auto">
              <div><span className="text-[#c792ea]">export async function</span> <span className="text-[#82aaff]">handleRequest</span><span className="text-zinc-300">(req: Request) {"{"}</span><span className="text-zinc-600 italic">  {"// function → função"}</span></div>
              <div><span className="text-zinc-300">{"  "}</span><span className="text-[#c792ea]">const</span><span className="text-zinc-300"> payload = </span><span className="text-[#c792ea]">await</span><span className="text-zinc-300"> req.json()</span><span className="text-zinc-600 italic">  {"// payload → carga útil · await → aguardar"}</span></div>
              <div><span className="text-zinc-300">{"  "}</span><span className="text-[#c792ea]">const</span><span className="text-zinc-300"> cached = </span><span className="text-[#c792ea]">await</span><span className="text-zinc-300"> cache.get(payload.id)</span><span className="text-zinc-600 italic">  {"// cached → em cache"}</span></div>
              <div><span className="text-zinc-300">{"  "}</span><span className="text-[#c792ea]">if</span><span className="text-zinc-300"> (cached) </span><span className="text-[#c792ea]">return</span><span className="text-zinc-300"> cached</span><span className="text-zinc-600 italic">  {"// return → retornar"}</span></div>
              <div><span className="text-zinc-300">{"  "}</span><span className="text-[#c792ea]">const</span><span className="text-zinc-300"> response = </span><span className="text-[#c792ea]">await</span><span className="text-zinc-300"> fetch(endpoint)</span><span className="text-zinc-600 italic">  {"// fetch → buscar · endpoint → ponto final"}</span></div>
              <div><span className="text-zinc-300">{"  "}</span><span className="text-[#c792ea]">return</span><span className="text-zinc-300"> response.json()</span></div>
              <div><span className="text-zinc-300">{"}"}</span></div>
            </pre>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-8 border-y border-[#27272a]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <StatItem value="275" label="termos técnicos" />
          <StatItem value="14" label="categorias" />
          <StatItem value="20+" label="linguagens" />
          <StatItem value="5x" label="visto = absorvido" />
        </div>
      </section>

      {/* Como funciona */}
      <section id="funciona" className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Como funciona</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Aprenda sem parar de trabalhar
          </h2>
          <p className="text-zinc-400 mb-16 max-w-lg">
            O verbo funciona em segundo plano. Você codifica, ele ensina.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              number="01"
              title="Watch mode"
              description="Observa o diretório e loga novos termos no terminal sempre que um arquivo é salvo."
              example="verbo start --watch ./src"
            />
            <FeatureCard
              number="02"
              title="VS Code"
              description="Ghost text inline ao final de cada linha com a tradução em português. Zero configuração."
              example="async → assíncrono / não bloqueia"
            />
            <FeatureCard
              number="03"
              title="Repetição espaçada"
              description="Após ver um termo em 5 sessões diferentes, ele é marcado como absorvido e sai da rotação."
              example="12 vistos · 3 absorvidos"
            />
          </div>
        </div>
      </section>

      {/* verbo explain */}
      <section id="explain" className="py-24 px-8 bg-[#0d0d0f]">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Novo</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            verbo explain
          </h2>
          <p className="text-zinc-400 mb-10 max-w-lg">
            Explica qualquer arquivo linha por linha em português via IA. Útil para entender código
            legado, bibliotecas novas ou trechos complexos sem sair do terminal.
          </p>

          <div className="bg-[#111112] border border-[#27272a] rounded-2xl overflow-hidden mb-6">
            <div className="flex items-center gap-1.5 px-5 py-3 border-b border-[#27272a]">
              <span className="w-3 h-3 rounded-full bg-white/10" />
              <span className="w-3 h-3 rounded-full bg-white/10" />
              <span className="w-3 h-3 rounded-full bg-white/10" />
              <span className="ml-3 text-xs text-zinc-500 font-mono">auth.ts</span>
            </div>
            <pre className="p-6 text-sm font-mono overflow-x-auto leading-7">
              <CodeLine>
                <Kw>import</Kw> {"{ readFileSync }"} <Kw>from</Kw> <Str>"node:fs"</Str>
                <Comment>  // importa leitura síncrona de arquivos</Comment>
              </CodeLine>
              <CodeLine>
                <Kw>import</Kw> {"{ basename, extname }"} <Kw>from</Kw> <Str>"node:path"</Str>
                <Comment>  // extrai nome e extensão do caminho</Comment>
              </CodeLine>
              <CodeLine>&nbsp;</CodeLine>
              <CodeLine>
                <Kw>export async function</Kw> <Fn>runExplain</Fn>
                {"(args: string[]): Promise<void> {"}
                <Comment>  // função principal do comando</Comment>
              </CodeLine>
              <CodeLine>
                {"  "}<Kw>const</Kw> filePath = args[<Num>0</Num>]
                <Comment>  // pega o primeiro argumento como caminho</Comment>
              </CodeLine>
              <CodeLine>
                {"  "}<Kw>if</Kw> (!filePath) {"{"} <Kw>return</Kw> {"}"}
                <Comment>  // valida se o arquivo foi informado</Comment>
              </CodeLine>
            </pre>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-5 border border-[#27272a] rounded-2xl bg-[#111112]">
              <p className="text-xs text-zinc-500 uppercase tracking-wide font-medium mb-2">Configurar</p>
              <code className="text-sm font-mono text-[#4ade80]">verbo config set-key sk-ant-...</code>
            </div>
            <div className="p-5 border border-[#27272a] rounded-2xl bg-[#111112]">
              <p className="text-xs text-zinc-500 uppercase tracking-wide font-medium mb-2">Usar</p>
              <code className="text-sm font-mono text-[#4ade80]">verbo explain src/auth.ts</code>
            </div>
          </div>
        </div>
      </section>

      {/* Cobertura */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Cobertura</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            275 termos em 14 categorias
          </h2>
          <p className="text-zinc-400 mb-10">Detectados automaticamente em 20+ linguagens.</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {["general","backend","frontend","devops","data","ai","javascript","python","architecture","git","performance","security","testing","typescript"].map((cat) => (
              <span
                key={cat}
                className="px-3 py-1.5 bg-[#4ade80]/10 text-[#4ade80] text-sm font-medium rounded-full border border-[#4ade80]/20 hover:bg-[#4ade80]/20 transition-colors cursor-default"
              >
                {cat}
              </span>
            ))}
          </div>
          <p className="text-sm text-zinc-600">
            TypeScript · JavaScript · Python · Go · Rust · Java · Kotlin · Ruby · PHP · C# · Swift · Dart · Scala · Elixir · Shell · SQL · Lua · C · C++ · e mais
          </p>
        </div>
      </section>

      {/* Instalação */}
      <section id="instalacao" className="py-24 px-8 bg-[#0d0d0f]">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Instalação</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16">
            Pronto em 30 segundos
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border border-[#27272a] rounded-2xl bg-[#111112]">
              <p className="text-xs text-zinc-500 uppercase tracking-wide font-medium mb-4">CLI</p>
              <div className="bg-[#09090b] border border-[#27272a] rounded-xl px-5 py-4 font-mono text-sm text-[#4ade80] mb-4">
                npm install -g @soltaoverbo/cli
              </div>
              <p className="text-sm text-zinc-500">
                Depois rode <span className="font-mono text-zinc-300">verbo start --watch</span> no diretório do projeto.
              </p>
            </div>
            <div className="p-6 border border-[#27272a] rounded-2xl bg-[#111112]">
              <p className="text-xs text-zinc-500 uppercase tracking-wide font-medium mb-4">VS Code</p>
              <a
                href="https://marketplace.visualstudio.com/items?itemName=verbo-dev.verbo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-[#4ade80] text-black rounded-xl px-5 py-4 text-sm font-semibold hover:bg-[#4ade80]/90 transition-colors mb-4"
              >
                <span>Solta o Verbo — VS Code Marketplace</span>
                <span className="text-black/50 text-xs">→</span>
              </a>
              <p className="text-sm text-zinc-500">
                Ghost text inline, repetição espaçada, zero configuração.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Da Mesma Equipe */}
      <section className="py-16 px-8 border-t border-[#27272a]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium mb-1">Da Mesma Equipe</p>
            <p className="text-sm text-zinc-400">
              Fabricio Guimarães, Julio Sergio e Bruno Carvalho também estão construindo o{" "}
              <a
                href="https://www.instagram.com/agoniadoz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white hover:text-[#4ade80] transition-colors"
              >
                @Agoniadoz
              </a>
              {" "}— Do caos ao controle, em tempo real. Vem aí.
            </p>
          </div>
          <a
            href="https://www.instagram.com/agoniadoz"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-4 py-2 text-xs font-medium border border-[#27272a] rounded-full text-zinc-400 hover:border-[#4ade80]/50 hover:text-[#4ade80] transition-colors"
          >
            @Agoniadoz
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-[#27272a]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600">
          <span>verbo by Agoniadoz</span>
          <div className="flex items-center gap-4">
            <a href="https://www.npmjs.com/package/@soltaoverbo/cli" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">npm</a>
            <a href="https://marketplace.visualstudio.com/items?itemName=verbo-dev.verbo" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">VS Code</a>
            <a href="https://github.com/fabriciodsul/soltaoverbo" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-400 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

    </main>
  )
}

// ─── Components ───────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-[#4ade80] uppercase tracking-widest font-medium mb-3">{children}</p>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-base bg-white/5 px-1.5 py-0.5 rounded text-[#4ade80]">{children}</code>
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-zinc-500">{label}</p>
    </div>
  )
}

function FeatureCard({ number, title, description, example }: { number: string; title: string; description: string; example: string }) {
  return (
    <div className="p-6 bg-[#111112] border border-[#27272a] rounded-2xl hover:border-[#4ade80]/30 transition-colors group">
      <p className="text-xs font-mono text-[#4ade80]/40 mb-3 group-hover:text-[#4ade80]/70 transition-colors">{number}</p>
      <p className="font-semibold text-sm mb-2 text-white">{title}</p>
      <p className="text-sm text-zinc-400 leading-relaxed mb-4">{description}</p>
      <code className="text-xs font-mono text-zinc-600">{example}</code>
    </div>
  )
}

function CodeLine({ children }: { children: React.ReactNode }) {
  return <div className="whitespace-pre-wrap">{children}</div>
}

function Kw({ children }: { children: React.ReactNode }) {
  return <span className="text-[#c792ea]">{children}</span>
}

function Fn({ children }: { children: React.ReactNode }) {
  return <span className="text-[#82aaff]">{children}</span>
}

function Str({ children }: { children: React.ReactNode }) {
  return <span className="text-[#c3e88d]">{children}</span>
}

function Num({ children }: { children: React.ReactNode }) {
  return <span className="text-[#f78c6c]">{children}</span>
}

function Comment({ children }: { children: React.ReactNode }) {
  return <span className="text-zinc-600 italic">{children}</span>
}
