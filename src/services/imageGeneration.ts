import axios from "axios";
import { openai } from "../lib/openaiClient";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
export type StylePreset = {
  id: string;
  title: string;
  description: string;
  promptModifiers: string;
  previewUrl: string;
};

/* ------------------------------------------------------------------ */
/* 2) Generate prompt text                                            */
/* ------------------------------------------------------------------ */
export async function generateSermonArtPrompt(
  sermTitle: string,
  topic: string,
  apiKey?: string,
  stylePreset?: StylePreset
): Promise<string> {
  // Set API key if provided
  if (apiKey) {
    openai.apiKey = apiKey;
  }

  const isFullNotes = topic.length > 100;
  const typographyInstructions = "Typography: Use a clean, contemporary sans-serif headline font reminiscent of Montserrat, Gotham, or Inter. If the concept benefits from contrast, pair the headline with a small, elegant hand-written/script sub-title (e.g. Great Vibes). Keep all text crisp, legible, and current; avoid dated or default fonts.";

  const systemPrompt = isFullNotes
    ? `You are an expert prompt engineer for graphic design with over 20 years of experience. Analyze the provided sermon notes to extract key themes, metaphors, and imagery. Create a visually compelling prompt that captures the sermon's core message. Focus on creating a modern, impactful design that communicates the message effectively. ${typographyInstructions}`
    : `You are an expert prompt engineer and creative director specializing in sermon artwork. You have a deep understanding of visual storytelling and how to create impactful, meaningful designs that enhance the message. Your role is to craft unique, creative prompts that align with the selected style while being original and specifically tailored to the sermon's message.

When given a style reference, use it as inspiration for the mood, tone, and artistic approach, but don't be constrained by it. Instead, think about what visual elements would best serve this specific message while maintaining the essence of the chosen style.

Focus on:
- Creating unique compositions that serve the specific message
- Using visual metaphors that reinforce the sermon's theme
- Ensuring the design enhances rather than overshadows the message
- Maintaining professional, modern aesthetics
- Placing text thoughtfully to maximize impact

${typographyInstructions}`;

  const chat = await openai.chat.completions.create({
    model: "gpt-4.1-2025-04-14",
    messages: [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: isFullNotes
          ? `Create an image prompt based on these sermon notes:\n\n${topic}\n\nCreate a fresh 1536×1024 landscape sermon graphic that captures the core message.\n${typographyInstructions}${
              stylePreset ? `\nStyle inspiration: ${stylePreset.promptModifiers}` : ""
            }`
          : `Create an image prompt for the title "${sermTitle}" (topic: ${topic}).\n${typographyInstructions}${
              stylePreset ? `\nStyle inspiration: ${stylePreset.promptModifiers}` : ""
            }`
      }
    ],
    temperature: 0.8
  });

  return chat.choices[0].message.content!.trim();
}

/* ------------------------------------------------------------------ */
/* 3) Generate image                                                  */
/* ------------------------------------------------------------------ */
export async function generateSermonArt(
  prompt: string,
  apiKey: string
): Promise<string | null> {
  // Set API key
  openai.apiKey = apiKey;

  console.time('Total image generation');
  console.time('OpenAI API call');
  
  let rsp;
  try {
    console.log('Starting OpenAI API call...', {
      modelName: "gpt-image-1",
      promptLength: prompt.length
    });
    
    rsp = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1536x1024",
      quality: "high",
      n: 1
    });
    
    console.timeEnd('OpenAI API call');
    console.log('API call completed successfully');
  } catch (error: any) {
    console.error('OpenAI API error:', {
      name: error.name,
      message: error.message,
      status: error.status,
      code: error.code,
      type: error.type
    });
    throw new Error(`OpenAI API error: ${error.message || 'Unknown error'}`);
  }

  if (!rsp?.data?.[0]) {
    throw new Error("No image data received from OpenAI");
  }

  const { url, b64_json } = rsp.data[0];
  if (url) {
    console.timeEnd('Total image generation');
    return url;
  }
  if (!b64_json) throw new Error("No image data received");

  console.time('Base64 to Blob conversion');
  // Convert base64 to Blob URL for better performance
  const byteChars = atob(b64_json);
  const byteNumbers = new Array(byteChars.length).fill(0).map((_, i) => byteChars.charCodeAt(i));
  const blob = new Blob([new Uint8Array(byteNumbers)], { type: "image/png" });
  const objectUrl = URL.createObjectURL(blob);
  console.timeEnd('Base64 to Blob conversion');
  console.timeEnd('Total image generation');

  return objectUrl;
}

/* ------------------------------------------------------------------ */
/* Style presets                                                      */
/* ------------------------------------------------------------------ */
export const STYLE_PRESETS: StylePreset[] = [
  {
    id: "photoreal",
    title: "Photographic",
    description: "Professional portrait style with cinematic lighting & subtle environmental storytelling",
    promptModifiers: "Consider a cinematic portrait approach with thoughtful environmental storytelling. Use professional lighting techniques, selective focus, and sophisticated color grading to create depth and emotion. The environment should subtly reinforce the sermon's theme without overshadowing the subject.",
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9d9cd8fb87c29ba7f0.png"
  },
  {
    id: "minimalist",
    title: "Modern Minimal",
    description: "Clean, editorial layout with purposeful negative space",
    promptModifiers: "Draw inspiration from modern editorial design. Use purposeful negative space, strong typographic hierarchy, and a restrained color palette. Consider geometric elements, clean lines, or abstract shapes that complement the message. The design should feel sophisticated and intentional.",
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9c183ce57ad6921011.png"
  },
  {
    id: "retro80s",
    title: "Retro 80s",
    description: "Synthwave-inspired design with bold energy",
    promptModifiers: "Channel retro-futuristic aesthetics with bold color gradients, dynamic lighting, and geometric elements. Consider how to incorporate synthwave elements while maintaining relevance to the sermon's message. The design should feel energetic and nostalgic without being cliché.",
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9db098801ec44508d0.png"
  },
  {
    id: "biblical",
    title: "Cinematic",
    description: "Epic, dramatic artwork inspired by ancient narratives",
    promptModifiers: "Create a cinematic interpretation of biblical themes using dramatic lighting, rich textures, and meaningful symbolism. Consider architectural elements, natural phenomena, or historical artifacts that resonate with the message. The composition should feel timeless and profound, avoiding literal interpretations in favor of powerful visual metaphors.",
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251c81183ce502b0921294.png"
  },
  {
    id: "youth",
    title: "Youthful Collage",
    description: "Modern grunge collage full of energy and layers",
    promptModifiers: "Blend contemporary urban aesthetics with layered textures and dynamic compositions. Consider using mixed media elements, typography as design elements, and energetic visual treatments. The design should feel fresh and authentic, avoiding forced 'youth' stereotypes.",
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9dc469326aedc5682b.png"
  },
  {
    id: "vintage",
    title: "Vintage Print",
    description: "Classic aesthetic with authentic print textures",
    promptModifiers: "Draw from classic print design with authentic textures, traditional typography, and careful attention to detail. Consider how printing artifacts and techniques can add character without overwhelming the design. The result should feel crafted and timeless.",
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9c9cd8fb4b3d9ba7ed.png"
  }
];