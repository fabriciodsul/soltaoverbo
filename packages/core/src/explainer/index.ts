import Anthropic from "@anthropic-ai/sdk"

interface ExplanationEntry {
  line: number
  explanation: string
}

export async function explainCode(
  code: string,
  lang: string,
  apiKey: string,
): Promise<Map<number, string>> {
  const client = new Anthropic({ apiKey })

  const response = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 2048,
    system: `Você é um assistente especializado em explicar código para desenvolvedores brasileiros.
Explique o código linha por linha em português brasileiro (pt-BR).

Regras:
- Explique apenas linhas com lógica relevante (ignore linhas em branco, chaves sozinhas, colchetes isolados)
- Explicações concisas: máximo 80 caracteres
- Use português brasileiro informal e técnico
- Responda APENAS com um array JSON válido, sem texto adicional fora do JSON
- Formato: [{"line": <número>, "explanation": "<explicação>"}]
- Numere as linhas a partir de 1`,
    messages: [
      {
        role: "user",
        content: `Explique este código ${lang} linha por linha:\n\n${code}`,
      },
    ],
  })

  const text = response.content.find((b) => b.type === "text")?.text ?? "[]"

  // Claude may wrap JSON in markdown code fences — extract the array
  const match = text.match(/\[[\s\S]*\]/)
  if (!match) return new Map()

  let entries: ExplanationEntry[]
  try {
    entries = JSON.parse(match[0]) as ExplanationEntry[]
  } catch {
    return new Map()
  }

  return new Map(entries.map((e) => [e.line, e.explanation]))
}

export function injectExplanations(
  code: string,
  explanations: Map<number, string>,
): string {
  return code
    .split("\n")
    .map((line, i) => {
      const explanation = explanations.get(i + 1)
      return explanation ? `${line}  // → ${explanation}` : line
    })
    .join("\n")
}
