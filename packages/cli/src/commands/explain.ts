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

  const explanations = await explainCode(code, lang, apiKey)
  const annotated = injectExplanations(code, explanations)
  process.stdout.write(annotated + "\n")
}

function askConsent(fileName: string): Promise<boolean> {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stderr })
    rl.question(
      `${bold("[verbo]")} O conteúdo de ${cyan(fileName)} será enviado para a API da Anthropic.\n` +
      `         Esta mensagem só aparece uma vez. Continuar? (s/N): `,
      (answer) => {
        rl.close()
        resolve(answer.trim().toLowerCase() === "s")
      },
    )
  })
}
