import OpenAI from "openai";

// Log the API key presence (not the actual key) for debugging
console.log('OpenAI API Key present:', !!import.meta.env.VITE_OPENAI_API_KEY);

export const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
  timeout: 300 * 1000, // 5 minute timeout
  maxRetries: 0 // Disable retries to get faster error feedback
});