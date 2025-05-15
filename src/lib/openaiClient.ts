import OpenAI from "openai";

// Create a function to initialize the OpenAI client with the current API key
const createOpenAIClient = (apiKey: string) => {
  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
    timeout: 300 * 1000, // 5 minute timeout
    maxRetries: 2 // Add some retries for reliability
  });
};

// Export a function to get a configured client
export const getOpenAIClient = (apiKey: string) => {
  return createOpenAIClient(apiKey);
};