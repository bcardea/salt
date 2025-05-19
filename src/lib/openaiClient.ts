import OpenAI from "openai";

interface SermonAnalysis {
  title: string;
  topic: string;
}

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

// Analyze sermon input to extract title and topic
export const analyzeSermonInput = async (input: string): Promise<SermonAnalysis> => {
  const openai = getOpenAIClient();
  
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-2025-04-14",
    messages: [
      {
        role: "system",
        content: `
Reply ONLY with a valid JSON object in this format:
{
  "title": "The Good Shepherd",
  "topic": "Seeking and Saving the Lost"
}

You are an expert at analyzing sermon content. Your job is to extract or create an appropriate title and topic from the given input. For longer sermon notes, create a concise title that captures the main theme.

Your response must be ONLY a valid JSON object with "title" and "topic" keys, parseable by JSON.parse().

Do NOT include any commentary, explanation, or extra text before or after the JSON. Only output the JSON object.

If you cannot determine a separate title and topic, use the input as both title and topic.`
      },
      {
        role: "user",
        content: `Analyze this sermon input and extract or create an appropriate title and topic. If it's a short input (like "The Good Shepherd"), use it as both title and topic. If it's longer sermon notes, create a title that captures the main theme.\n\nInput: ${input}`
      }
    ]
  });

  const result = response.choices[0].message.content;
  
  try {
    const parsed = JSON.parse(result);
    return {
      title: parsed.title || input,
      topic: parsed.topic || input
    };
  } catch (e) {
    // Fallback if the response isn't properly formatted JSON
    return {
      title: input,
      topic: input
    };
  }
};