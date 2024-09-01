# Simple Streaming OpenAI Chat with NextJS, Tailwind, Yarn (2024)

I used v0 to get somewhere and discovered I had to figure out a lot. Hopefully this will help you in 2024. Note that there's one piece of code that's been deprecated so this will eventually not work :-(. Try it out while it still works!

## Using v0

I got v0 to create most of the app. But I had to use GitHub Copilot to fix a lot. I also needed to use my own knowledge (a lot) to fix it. It works :-).
## Prerequisite
It will help you if you walk through my manual setup of a simple shadcn project over [here](https://medium.com/@johnmaeda/shadcn-with-nextjs-tailwind-yarn-on-macos-2024-75cb85491e97)

## Okay let's get setup
If these all work for you in sequence, then consider yourself lucky.
```
yarn create next-app . --tailwind --typescript --eslint
npx shadcn@latest init
npx shadcn@latest add button input card scroll-area
yarn add ai
yarn add zod
```

## We need to modify files
Your app/layout.tsx

```
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
```

## Your app/page.tsx 
```
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Welcome to the Simple Chat App</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          This is a simple chat application that uses OpenAI for generating responses.
        </p>
        <p>
          Navigate to the <Link href="/chat" className="text-primary hover:underline">Chat</Link> page to start a conversation,
          or visit the <Link href="/docs" className="text-primary hover:underline">Docs</Link> page for more information.
        </p>
      </CardContent>
    </Card>
  )
}
```
## Make a few new files and directories

Your app/api/chat/route.ts (yes that's ts and not tsx)
```
import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages,
    });

    const stream = OpenAIStream(response)
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred during your request.' }, { status: 500 });
  }
}
Note that you'll get a complaint that two functions are deprecated. No worries at it will still work for now.
Your app/chat/page.tsx
'use client'

import { useChat } from 'ai/react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  })

  const customHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSubmit(e); // Call the handleSubmit from useChat
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Chat with AI</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[60vh] mb-4 p-4 border rounded">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {message.content}
              </span>
            </div>
          ))}
        </ScrollArea>
        <form onSubmit={customHandleSubmit} className="flex space-x-2">
          <Input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

Your app/docs/page.tsx 

```
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Docs() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Documentation</CardTitle>
      </CardHeader>
      <CardContent>
        <h2 className="text-2xl font-semibold mb-2">How to use the Chat App</h2>
        <ol className="list-decimal list-inside mb-4 space-y-2">
          <li>Navigate to the Chat page</li>
          <li>Type your message in the input field</li>
          <li>Press Enter or click the Send button</li>
          <li>Wait for the AI to generate a response</li>
          <li>Continue the conversation as needed</li>
        </ol>
        <p>
          The chat app uses OpenAI&apos;s GPT model to generate responses. The conversation
          is processed in real-time for an interactive experience.
        </p>
      </CardContent>
    </Card>
  )
}
```

## Let's run run run

Before you run, you'll need to add your OAI key to your environment. This does it temporarily:

```
export OPENAI_API_KEY=sk-your-key-blah-blah-blah
```

You're all set I think. Just do it.
```
yarn dev
```

This should give you a streaming style chat experience that you've dreamed of making one day to feel like the cool kids.