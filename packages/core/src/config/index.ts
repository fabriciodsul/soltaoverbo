import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"

interface VerboConfig {
  apiKey?: string
  explainConsented?: boolean
}

const CONFIG_DIR = join(homedir(), ".verbo")
const CONFIG_PATH = join(CONFIG_DIR, "config.json")

function readConfig(): VerboConfig {
  if (!existsSync(CONFIG_PATH)) return {}
  try {
    return JSON.parse(readFileSync(CONFIG_PATH, "utf-8")) as VerboConfig
  } catch {
    return {}
  }
}

function writeConfig(config: VerboConfig): void {
  mkdirSync(CONFIG_DIR, { recursive: true })
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8")
}

export function getApiKey(): string | undefined {
  return readConfig().apiKey
}

export function setApiKey(key: string): void {
  writeConfig({ ...readConfig(), apiKey: key })
}

export function hasConsented(): boolean {
  return readConfig().explainConsented === true
}

export function setConsented(): void {
  writeConfig({ ...readConfig(), explainConsented: true })
}
