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
  
  const systemPrompt = `You are an expert prompt engineer for graphic design with over 20 years of experience. Your task is to:
1. Analyze the input and create a detailed image generation prompt
2. Break down the key elements into a structured JSON format
3. Generate alternative suggestions for each element
4. Create a user-friendly summary with variables

The JSON response MUST follow this exact structure:
{
  "elements": [
    {
      "type": "title_style",
      "value": "clean, contemporary sans-serif, uppercase, white font with neon glow",
      "suggestions": [
        "elegant serif, gold with subtle shadow",
        "bold geometric sans, gradient fill with outline",
        "modern condensed sans, metallic with light rays",
        "hand-drawn script, glowing with sparkles"
      ]
    },
    {
      "type": "subtitle_style",
      "value": "elegant script in soft white, small supporting position",
      "suggestions": [
        "minimal sans-serif in muted gold",
        "condensed caps with thin strokes",
        "classic serif with delicate flourishes",
        "modern geometric with gradient"
      ]
    },
    {
      "type": "subject",
      "value": "macro photo of a hand holding a classic analog compass",
      "suggestions": [
        "vintage suitcase beside a winding road",
        "weathered wooden door slightly ajar",
        "paper boat on turbulent waters",
        "lone figure on a mountain path"
      ]
    },
    {
      "type": "setting",
      "value": "neon duotone gradient in purple and blue with ambient haze",
      "suggestions": [
        "misty dawn with golden rays breaking through",
        "stormy skies with dramatic lightning",
        "desert landscape under starlit sky",
        "abstract geometric patterns with light beams"
      ]
    },
    {
      "type": "style",
      "value": "spiritual synthwave aesthetic",
      "suggestions": [
        "vintage film photography",
        "minimal geometric design",
        "watercolor and ink fusion",
        "retro poster art"
      ]
    },
    {
      "type": "mood",
      "value": "reflective and directional, adventurous and energized by divine clarity",
      "suggestions": [
        "peaceful and contemplative with hope",
        "dramatic and powerful with purpose",
        "gentle and nurturing with wisdom",
        "bold and inspiring with conviction"
      ]
    }
  ],
  "summary": "A {style} image featuring {title_style} as the title, centered over a {subject}. Below, the subtitle is styled in {subtitle_style}. The background is a {setting}, incorporating faded repeated text in the corners. The mood is {mood}.",
  "rawPrompt": "The complete technical prompt that will be sent to the image generation API"
}

IMPORTANT: 
- Each element MUST have exactly 4 alternative suggestions
- Make suggestions specific and varied while maintaining theme
- The summary MUST use {variables} that exactly match element values
- Ensure title and subtitle styling are separate elements
- Keep the structure exactly as shown above`;

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
          ? `Create an image prompt based on these sermon notes:\n\n${topic}\n\nCreate a fresh 1536×1024 landscape sermon graphic that captures the core message.\nTitle text: "${sermTitle}"\nSubtitle text: "${topic}"${
              stylePreset ? `\nStyle inspiration: ${stylePreset.promptModifiers}` : ""
            }`
          : `Create an image prompt for the title "${sermTitle}" (topic: ${topic}).\nTitle text: "${sermTitle}"\nSubtitle text: "${topic}"${
              stylePreset ? `\nStyle inspiration: ${stylePreset.promptModifiers}` : ""
            }`
      }
    ],
    response_format: { type: "json_object" }
  });

  const promptData = JSON.parse(promptChat.choices[0].message.content!) as PromptData;

  return {
    fullPrompt: promptData.rawPrompt,
    promptData
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
        content: "You are an expert prompt engineer for gpt-image-1 image generation. Convert the given design concept and elements into a detailed, technical prompt that will produce the desired image. Include specific details about composition, lighting, style, mood, and typography. Pay special attention to title and subtitle placement and styling."
      },
      {
        role: "user",
        content: `Convert this design concept into a detailed gpt-image-1 prompt:

Summary: ${promptData.summary}

Elements:
${promptData.elements.map(e => `${e.type}: ${e.value}`).join('\n')}

${stylePreset ? `Style inspiration: ${stylePreset.promptModifiers}` : ""}`
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
    ? `${prompt}\n\nNOTE: You're being given an image reference. Do not replicate the specifics of this image reference including characters, location, etc but instead pull those from the prompt itself. Use the image reference as an inspirational foundation and a guide for how to layout the image with text and design, do not copy the characters in the reference verbatim but instead use them as an example of how to incorporate the characters referenced in the prompt itself.`
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