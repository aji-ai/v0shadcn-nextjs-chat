import Link from 'next/link'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Simple Chat App',
  description: 'A simple chat app with OpenAI integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-background")}>
        <div className="flex h-screen">
          <nav className="w-64 bg-card text-card-foreground shadow-lg fixed h-full overflow-y-auto">
            <div className="p-4">
              <h1 className="text-2xl font-bold mb-4">Chat App</h1>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-primary hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/chat" className="text-primary hover:underline">
                    Chat
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="text-primary hover:underline">
                    Docs
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <main className="flex-1 p-4 overflow-auto ml-64">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}