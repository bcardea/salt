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
  "title": "Come Get Prayer",
  "topic": "Wednesday at 7pm"
}

You are an expert at analyzing sermon content. Your job is to extract or create an appropriate title and topic from the given input. If the input includes a time, date, location, or event details (e.g. "Wednesday at 7pm" or "Main Sanctuary"), use the first part as the title and treat the time/date/etc as the topic. For longer sermon notes, create a concise title that captures the main theme.

Only ever reply with a valid JSON object containing just these two keys: "title" and "topic". Never add any explanation, commentary, or text before or after the JSON. The response must be a JSON object that can be parsed directly by JSON.parse().

Here are some examples:

Input: "Come Get Prayer: Wednesday Night at 7pm"  
Output: { "title": "Come Get Prayer", "topic": "Wednesday Night at 7pm" }

Input: "For God So Loved You - A Study on John 3:16"  
Output: { "title": "For God So Loved You", "topic": "A Study on John 3:16" }

Input: "Youth Worship Night, Friday at 6pm in Main Hall"  
Output: { "title": "Youth Worship Night", "topic": "Friday at 6pm in Main Hall" }

Input: "Faith That Moves Mountains (Matthew 17:20)"  
Output: { "title": "Faith That Moves Mountains", "topic": "Matthew 17:20" }

If you cannot determine a separate title and topic, use the input as both title and topic.

Never return anything except the JSON object.`
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