import axios from "axios";
import { getOpenAIClient } from "../lib/openaiClient";
import { PromptData } from "../types/prompt";

export type StylePreset = {
  id: string;
  title: string;
  description: string;
  promptModifiers: string;
  previewUrl: string;
  referenceUrl: string;
};

async function urlToFile(url: string): Promise<File> {
  const res = await axios.get<ArrayBuffer>(url, { responseType: "arraybuffer" });
  const type = res.headers["content-type"] ?? "image/png";
  const blob = new Blob([res.data], { type });
  const file = new File([blob], `reference.png`, { type });
  return file;
}

export async function generateSermonArtPrompt(
  sermTitle: string,
  topic: string,
  stylePreset?: StylePreset
): Promise<{ fullPrompt: string; promptData: PromptData }> {
  const openai = getOpenAIClient();

  const isFullNotes = topic.length > 100;
  
  const systemPrompt = `You are an expert prompt engineer for graphic design with over 20 years of experience. Your task is to create a detailed image generation prompt that captures the essence of a sermon topic. The prompt should be broken down into interactive elements that can be customized.

Your response must be a JSON object with this exact structure:
{
  "elements": [
    {
      "type": "style",
      "value": "the main visual style for the image",
      "suggestions": ["4 alternative style suggestions"]
    },
    {
      "type": "title_style",
      "value": "how the main title text should be styled",
      "suggestions": ["4 alternative title style suggestions"]
    },
    {
      "type": "subtitle_style",
      "value": "how the subtitle/topic text should be styled",
      "suggestions": ["4 alternative subtitle style suggestions"]
    },
    {
      "type": "subject",
      "value": "the main visual element or focal point",
      "suggestions": ["4 alternative subject suggestions"]
    },
    {
      "type": "setting",
      "value": "the background and environment",
      "suggestions": ["4 alternative setting suggestions"]
    },
    {
      "type": "mood",
      "value": "the emotional tone and atmosphere",
      "suggestions": ["4 alternative mood suggestions"]
    }
  ],
  "summary": "A natural language description using {variables} that match the element values exactly",
  "rawPrompt": "The complete technical prompt for the image generation API"
}

Each element must have:
1. A clear, specific value that fits the sermon theme
2. Exactly 4 creative alternative suggestions
3. Values that work together cohesively
4. Natural language that flows well when combined

The summary must:
1. Use {variables} that exactly match the element values
2. Flow naturally as a sentence
3. Include all key elements
4. Be easy to read and understand

The raw prompt must:
1. Be technically detailed and specific
2. Include all necessary parameters for image generation
2. Specify image dimensions (1536x1024)
3. Include typography and layout details`;

  const promptChat = await openai.chat.completions.create({
    model: "gpt-4.1-2025-04-14",
    messages: [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: isFullNotes
          ? `Create an image prompt based on these sermon notes:\n\n${topic}\n\nCreate a fresh 1536×1