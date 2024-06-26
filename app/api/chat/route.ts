import OpenAI from 'openai';

import { OpenAIStream, StreamingTextResponse } from 'ai';
import { openai } from '@/app/utils/openai';

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

// Route that handles a request to receive a joke from the AI with various parameters set by the user
export async function POST(req: Request) {
  const { messages, temperature } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content:
          "You are a professional comedian. You receive requests from the audience to tell a joke. An audience member will provide you the topic, tone, and type of delivery format. You must take into account the audience member's request and deliver a joke that meets their criteria.",
      },
      ...messages,
    ],
    temperature: +temperature,
    max_tokens: 300,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
