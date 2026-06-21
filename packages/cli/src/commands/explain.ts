import { createInterface } from "node:readline"
import { readFileSync } from "node:fs"
import { basename, extname } from "node:path"
import { explainCode, getApiKey, hasConsented, injectExplanations, setConsented } from "@soltaoverbo/core"
import { bold, cyan, dim } from "../ui.ts"

export async function runExplain(args: string[]): Promise<void> {
  const filePath = args[0]
  if (!filePath) {
    console.error(`${bold("Uso:")} verbo explain <arquivo>`)
    process.exit(1)
  }

  const apiKey = getApiKey()
  if (!apiKey) {
    console.error(
      `${bold("verbo explain")} requer uma API key da Anthropic.\n` +
      `Configure com: ${cyan("verbo config set-key <sua-chave>")}\n` +
      `Obtenha sua chave em: https://console.anthropic.com/`,
    )
    process.exit(1)
  }

  if (!hasConsented()) {
    const confirmed = await askConsent(basename(filePath))
    if (!confirmed) {
      console.error("Operação cancelada.")
      process.exit(0)
    }
    setConsented()
  }

  let code: string
  try {
    code = readFileSync(filePath, "utf-8")
  } catch {
    console.error(`Não foi possível ler o arquivo: ${filePath}`)
    process.exit(1)
  }

  const lang = extname(filePath).replace(".", "") || "código"

  process.stderr.write(dim(`[verbo] Explicando ${basename(filePath)}...\n`))

  let explanations: Map<number, string>
  try {
    explanations = await explainCode(code, lang, apiKey)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.includes("credit balance is too low")) {
      console.error(`${bold("[verbo]")} Sem créditos na conta Anthropic. Adicione em: https://console.anthropic.com`)
    } else if (msg.includes("401") || msg.includes("invalid x-api-key") || msg.includes("authentication")) {
      console.error(`${bold("[verbo]")} API key inválida. Reconfigure com: verbo config set-key <chave>`)
    } else if (msg.includes("529") || msg.includes("overloaded")) {
      console.error(`${bold("[verbo]")} API sobrecarregada. Tente novamente em alguns instantes.`)
    } else {
      console.error(`${bold("[verbo]")} Erro na API: ${msg}`)
    }
    process.exit(1)
  }

  const annotated = injectExplanations(code, explanations)
  process.stdout.write(annotated + "\n")
}

function askConsent(fileName: string): Promise<boolean> {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stderr })
    let settled = false
    const done = (val: boolean) => {
      if (settled) return
      settled = true
      rl.removeAllListeners()
      rl.close()
      resolve(val)
    }
    rl.on("close", () => done(false))
    rl.question(
      `${bold("[verbo]")} O conteúdo de ${cyan(fileName)} será enviado para a API da Anthropic.\n` +
      `         Esta mensagem só aparece uma vez. Continuar? (s/N): `,
      (answer) => done(answer.trim().toLowerCase() === "s"),
    )
  })
}
