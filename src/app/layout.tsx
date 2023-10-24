import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CBoarding',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
