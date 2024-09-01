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