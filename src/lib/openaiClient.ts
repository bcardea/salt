import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
  timeout: 300 * 1000, // 5 minute timeout
  maxRetries: 0 // Disable retries to get faster error feedback
});
