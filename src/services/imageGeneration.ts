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
  
  const systemPrompt = `You are an expert prompt engineer for graphic design with over 20 years of experience. Your task is to create a detailed, creative image generation prompt that captures the essence of a sermon topic. The prompt should be broken down into interactive elements that can be customized.

Your response must be a JSON object with this exact structure:
{
  "elements": [
    {
      "type": "style",
      "value": "detailed description of the main visual style",
      "suggestions": ["4 unique, creative alternative style suggestions"]
    },
    {
      "type": "subject",
      "value": "detailed description of the main visual element or focal point",
      "suggestions": ["4 unique, creative alternative subject suggestions"]
    },
    {
      "type": "setting",
      "value": "detailed description of the background and environment",
      "suggestions": ["4 unique, creative alternative setting suggestions"]
    },
    {
      "type": "mood",
      "value": "detailed description of the emotional tone and atmosphere",
      "suggestions": ["4 unique, creative alternative mood suggestions"]
    }
  ],
  "summary": "A natural language description that incorporates all elements using {variables} that match the element values exactly",
  "rawPrompt": "The complete, detailed technical prompt for the image generation API"
}

Each element must have:
1. A highly detailed, specific value that fits the sermon theme
2. Four creative, unique alternative suggestions that maintain the same level of detail
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
3. Specify image dimensions (1536x1024)
4. Include typography and layout details`;

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
          ? `Create an image prompt based on these sermon notes:\n\n${topic}\n\nCreate a fresh 1536×1024 landscape sermon graphic that captures the core message.${
              stylePreset ? `\nStyle inspiration: ${stylePreset.promptModifiers}` : ""
            }`
          : `Create an image prompt for the sermon title "${sermTitle}" with the topic: ${topic}.\n\nCreate a fresh 1536×1024 landscape sermon graphic that captures this message.${
              stylePreset ? `\nStyle inspiration: ${stylePreset.promptModifiers}` : ""
            }`
      }
    ]
  });

  const response = JSON.parse(promptChat.choices[0].message.content!);

  return {
    fullPrompt: response.rawPrompt,
    promptData: response
  };
}

export async function convertSummaryToPrompt(
  promptData: PromptData,
  stylePreset?: StylePreset
): Promise<string> {
  const openai = getOpenAIClient();

  const chat = await openai.chat.completions.create({
    model: "gpt-4.1-2025-04-14",
    messages: [
      {
        role: "system",
        content: "You are an expert prompt engineer for image generation. Convert the given design concept into a detailed, technical prompt that will produce the desired image. Include specific details about composition, lighting, style, and mood."
      },
      {
        role: "user",
        content: `Convert this design concept into a detailed image generation prompt:\n\n${promptData.summary}\n\n${
          stylePreset ? `Style inspiration: ${stylePreset.promptModifiers}` : ""
        }`
      }
    ]
  });

  return chat.choices[0].message.content!.trim();
}

export async function generateSermonArt(
  prompt: string,
  stylePreset?: StylePreset
): Promise<string | null> {
  const openai = getOpenAIClient();

  let referenceFile: File | undefined;
  if (stylePreset) {
    try {
      referenceFile = await urlToFile(stylePreset.referenceUrl);
    } catch (error) {
      console.error('Error downloading reference image:', error);
      throw new Error('Failed to download reference image');
    }
  }

  const finalPrompt = stylePreset 
    ? `${prompt}\n\nNOTE: Use this image as style reference only. Do not copy specific elements.`
    : prompt;

  try {
    const rsp = referenceFile 
      ? await openai.images.edit({
          model: "gpt-image-1",
          image: referenceFile,
          prompt: finalPrompt,
          size: "1536x1024",
          quality: "high",
          n: 1
        })
      : await openai.images.generate({
          model: "gpt-image-1",
          prompt: finalPrompt,
          size: "1536x1024",
          quality: "high",
          n: 1
        });

    if (!rsp?.data?.[0]) {
      throw new Error("No image data received from OpenAI");
    }

    const { url, b64_json } = rsp.data[0];
    if (url) {
      return url;
    }
    if (!b64_json) {
      throw new Error("No image data received");
    }

    const byteChars = atob(b64_json);
    const byteNumbers = new Array(byteChars.length).fill(0).map((_, i) => byteChars.charCodeAt(i));
    const blob = new Blob([new Uint8Array(byteNumbers)], { type: "image/png" });
    const objectUrl = URL.createObjectURL(blob);

    return objectUrl;
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    throw new Error(`OpenAI API error: ${error.message || 'Unknown error'}`);
  }
}