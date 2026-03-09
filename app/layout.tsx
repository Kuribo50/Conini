import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Feliz Cumpleaños Monita 🌸',
  description: 'Para Constanza, con todo mi amor ♡',
  openGraph: {
    title: 'Feliz Cumpleaños Monita 🌸',
    description: 'Para Constanza, en su día especial ♡',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
