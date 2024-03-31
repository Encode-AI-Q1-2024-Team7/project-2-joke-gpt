import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { openai } from '@/app/utils/openai';

export const runtime = 'edge';


// Route that handles a request to provide ratings for joke content
export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    
    messages: [
      {
        role: 'system',
        content: `You are a professional judge that provides ratings on joke content. Given the following joke content, on a rating scale from zero to 100 percent, provide a rating for each of the following three criteria: 1. funny, 2. dark, and 3. appropriate. Respond with a JSON object in the format: { "funny": "%", "dark": "%", "appropriate": "%"}, or an empty {} if you are not able to complete the request. Only respond with an object. Here is the joke content to rate: ${prompt}
          
  Output:\n`,
      },
    ],
    max_tokens: 200,
    temperature: 0,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
