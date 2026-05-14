import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Umre Arbitraj Radarı',
  description: 'Ankara (ESB) vs İstanbul (SAW) Umre Maliyet Karşılaştırması • 2026',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="bg-zinc-950 text-white">{children}</body>
    </html>
  )
}
