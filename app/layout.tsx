import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WeatherWise',
  description: 'WeatherWise is a weather forecast app built with Next.js',
  generator: 'Shinde Sanket',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
