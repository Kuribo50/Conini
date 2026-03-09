import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Feliz Cumpleaños Monita 🌸',
  description: 'Para Constanza, con todo mi amor ♡',
  openGraph: {
    title: 'Feliz Cumpleaños Monita 🌸',
    description: 'Para Constanza, en su día especial ♡',
  },
  icons: {
    icon: [
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon_io/favicon.ico' },
    ],
    apple: '/favicon_io/apple-touch-icon.png',
    other: [
      { rel: 'manifest', url: '/favicon_io/site.webmanifest' },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
