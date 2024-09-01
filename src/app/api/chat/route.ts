import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
//  apiKey: "sk-lO48KTOlBvO1BD_-r2NdbgVPKy_ndmpEt2X6VIpipQT3BlbkFJSAj3QsbcZUjYdpemTh1Qy1d2sKCZUJimgBohJrr2sA",
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