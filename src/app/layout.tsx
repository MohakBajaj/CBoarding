import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: 'CBoarding',
  description: 'CBoarding is a collaborative whiteboard and notes taking app that allows teams to brainstorm ideas and share feedback together. It is built with Next.js, TypeScript, and Node.js.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
    shortcut: '/favicon.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div id="Main" className="flex w-full gap-3 h-[92.26vh]">
            <Sidebar />
            <div id="Content" className="w-full h-full overflow-clip">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
