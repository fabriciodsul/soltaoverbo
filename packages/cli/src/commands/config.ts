import { getApiKey, setApiKey } from "@soltaoverbo/core"
import { bold, cyan, dim } from "../ui.ts"

export function runConfig(args: string[]): void {
  const [subcmd, ...rest] = args

  switch (subcmd) {
    case "set-key": {
      const key = rest[0]
      if (!key) {
        console.error(`${bold("Uso:")} verbo config set-key <chave>`)
        process.exit(1)
      }
      setApiKey(key)
      console.log(`${bold("[verbo]")} API key salva em ${dim("~/.verbo/config.json")}`)
      break
    }
    case "show-key": {
      const key = getApiKey()
      if (!key) {
        console.log(dim("Nenhuma API key configurada."))
      } else {
        // Show only first 8 and last 4 chars — never log the full key
        console.log(`API key: ${cyan(`${key.slice(0, 8)}...${key.slice(-4)}`)}`)
      }
      break
    }
    default:
      console.log(
        `${bold("verbo config")} — configurações do verbo\n\n` +
        `  ${bold("set-key")} ${dim("<chave>")}   Salva a API key da Anthropic em ~/.verbo/config.json\n` +
        `  ${bold("show-key")}            Exibe a API key atual (parcial)\n`,
      )
  }
}
