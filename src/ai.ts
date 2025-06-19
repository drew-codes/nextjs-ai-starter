import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
export const chat = async (messages: string) =>
  await generateText({ model: openai('gpt-4o'), prompt: messages });
