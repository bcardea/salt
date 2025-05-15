import OpenAI from "openai";
import { openai } from "../lib/openaiClient";
import { ReferenceImage } from "../constants/referenceImages";

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
/* Style presets                                                      */
/* ------------------------------------------------------------------ */
export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'photoreal',
    title: 'Photoreal Person',
    description: 'Professional portrait style with cinematic lighting',
    promptModifiers: 'portrait lighting, 35 mm DSLR, ultra-detailed skin, cinematic color grade',
    previewUrl: 'https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682391af265ab55b4f38e913.png'
  },
  {
    id: 'minimalist',
    title: 'Super Minimalist',
    description: 'Clean, simple design with strong impact',
    promptModifiers: 'flat vector, thick line art, 2-color palette, vast negative space',
    previewUrl: 'https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682391af16cf7275fa9a083b.png'
  },
  {
    id: 'retro80s',
    title: 'Retro 80s',
    description: 'Synthwave-inspired design with neon elements',
    promptModifiers: 'neon gradient sun, grid floor, VHS noise, retro synthwave poster',
    previewUrl: 'https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682391af265ab584e938e916.png'
  },
  {
    id: 'biblical',
    title: 'Cinematic Bible Scene',
    description: 'Epic, dramatic artwork inspired by biblical imagery',
    promptModifiers: 'epic matte painting, volumetric light beams, master shot, high contrast shadows',
    previewUrl: 'https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682391af77a9d43961dd547c.png'
  },
  {
    id: 'youth',
    title: 'Youth Collage',
    description: 'Modern, energetic design perfect for youth ministry',
    promptModifiers: 'magazine cut-out, ripped paper edges, spray-paint splatter, bold sans serif title, pop punk vibes',
    previewUrl: 'https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682391af265ab5542638e915.png'
  },
  {
    id: 'vintage',
    title: 'Vintage Print',
    description: 'Classic, worn aesthetic with print-inspired textures',
    promptModifiers: 'faded CMYK misprint, halftone dots, retro newspaper texture, limited palette, letterpress style',
    previewUrl: 'https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682391af4ad1fb159ae92eb7.png'
  }
];

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
    : `You are an expert prompt engineer for graphic design. You have over 20 years of experience designing slides for sermons, you understand the importance of clarity and you design with a timeless but modern approach. You design modern sermon artwork. Use the attached reference images ONLY as STYLE inspiration — match their typography, layout, color palette, and design balance. Do NOT copy their text or subject matter. ${typographyInstructions}`;

  const chat = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: isFullNotes
          ? `Create an image prompt based on these sermon notes:\n\n${topic}\n\nCreate a fresh 1536×1024 landscape sermon graphic that captures the core message.\n${typographyInstructions}${
              stylePreset ? `\nStyle: ${stylePreset.promptModifiers}` : ""
            }`
          : `Create an image prompt for the title "${sermTitle}" (topic: ${topic}).\n${typographyInstructions}${
              stylePreset ? `\nStyle: ${stylePreset.promptModifiers}` : ""
            }`
      }
    ],
    temperature: 0.6
  });

  return chat.choices[0].message.content!.trim();
}

/* ------------------------------------------------------------------ */
/* 3) Generate image using reference PNGs                             */
/* ------------------------------------------------------------------ */
export async function generateSermonArt(
  prompt: string,
  apiKey: string,
  selectedStyle?: StylePreset
): Promise<string | null> {
  // Set API key
  openai.apiKey = apiKey;

  console.time('Total image generation');
  
  console.time('OpenAI API call');
  let rsp;
  // Call images.create
  try {
    console.log('Starting OpenAI API call...', {
      model: "dall-e-3",
      promptLength: prompt.length,
    });
    
    rsp = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1792x1024",
      quality: "hd",
      style: "vivid"
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

  // Return URL if present
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