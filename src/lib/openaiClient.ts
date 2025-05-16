import OpenAI from "openai";

// Create a function to initialize the OpenAI client with the current API key
const createOpenAIClient = () => {
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    throw new Error('Missing OpenAI API key environment variable');
  }

  return new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
    timeout: 300 * 1000, // 5 minute timeout
    maxRetries: 2 // Add some retries for reliability
  });
};

// Export a function to get a configured client
export const getOpenAIClient = () => {
  return createOpenAIClient();
};