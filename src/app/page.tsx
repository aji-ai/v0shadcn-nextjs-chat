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