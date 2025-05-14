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
    : `You are an expert prompt engineer for graphic design. You have over 20 years of experience designing slides for sermons, you understand the importance of clarity and you design with a timeless but modern approach. You design modern sermon artwork. ${typographyInstructions}`;

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
      modelName: "dall-e-3",
      promptLength: prompt.length
    });
    
    rsp = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      size: "1792x1024",
      quality: "hd",
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

  const { url } = rsp.data[0];
  if (!url) throw new Error("No image URL received");

  console.timeEnd('Total image generation');
  return url;
}

/* ------------------------------------------------------------------ */
/* Style presets                                                      */
/* ------------------------------------------------------------------ */
export const STYLE_PRESETS: StylePreset[] = [
  {
    id: "photoreal",
    title: "Photoreal Person",
    description: "Professional portrait style with cinematic lighting & subtle environmental storytelling",
    promptModifiers: `cinematic portrait photography, shallow depth‑of‑field, dramatic key & rim lighting, ultra‑detailed skin texture, realistic bokeh, one softly blurred background landmark hinting at theme, sophisticated color grade, modern sans‑serif headline with optional elegant script subtitle, spacious balanced layout`
  },
  {
    id: "minimalist",
    title: "Super Minimalist",
    description: "Clean, editorial layout with huge negative space and restrained color palette",
    promptModifiers: `modern editorial minimalism, vast negative space, slim geometric sans‑serif headline with selective outline accent, limited warm neutral palette plus one muted accent color, oversized typographic hierarchy, crisp vector edges, no shadows or textures`
  },
  {
    id: "retro80s",
    title: "Retro 80s",
    description: "Outrun / synthwave poster bursting with neon nostalgia",
    promptModifiers: `outrun synthwave horizon, neon sunset gradient sky, silhouetted palm trees, infinite laser grid perspective, chrome text with star‑sparkle highlights, handwritten neon script accent, subtle VHS scanlines & film grain`
  },
  {
    id: "biblical",
    title: "Cinematic Bible Scene",
    description: "Epic, dramatic artwork inspired by ancient manuscripts and fallen kingdoms",
    promptModifiers: `weathered parchment texture, warm sepia & bronze wash, diagonal golden light, broken regal relics crumbling into dust, high‑contrast Trajan‑style serif title stack, heavy grain & ash particles, somber mythic mood`
  },
  {
    id: "youth",
    title: "Youth Collage",
    description: "Modern grunge collage full of energy and textured layers",
    promptModifiers: `distressed torn‑paper collage, ripped headline strips, grayscale portrait base, muted reds & dusty pink florals, spray‑paint splatter, bold condensed sans headline, photocopy grit overlay, generous breathing room`
  },
  {
    id: "vintage",
    title: "Vintage Print",
    description: "Classic, worn aesthetic with print-inspired textures",
    promptModifiers: `faded CMYK misprint, halftone dots, retro newspaper texture, limited palette, letterpress style`
  }
];