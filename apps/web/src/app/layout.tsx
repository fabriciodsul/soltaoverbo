import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "verbo — inglês técnico enquanto você coda",
  description: "Aprenda inglês técnico passivamente. O verbo detecta termos no seu código e exibe traduções em português direto no terminal ou no VS Code.",
  openGraph: {
    title: "verbo — inglês técnico enquanto você coda",
    description: "Aprenda inglês técnico passivamente. 275 termos, 14 categorias, repetição espaçada.",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
