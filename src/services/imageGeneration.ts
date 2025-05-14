import axios from "axios";
import { openai } from "../lib/openaiClient";
import { ReferenceImage, ReferenceImages } from "../constants/referenceImages";

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
/* 1) Utility: fetch URL → File                                       */
/* ------------------------------------------------------------------ */
async function urlToFile(url: string, i: number): Promise<File> {
  console.log(`Downloading reference image ${i}...`);
  const res = await axios.get<ArrayBuffer>(url, { responseType: "arraybuffer" });
  const type = res.headers["content-type"] ?? "image/png";
  const blob = new Blob([res.data], { type });
  const file = new File([blob], `ref${i}.png`, { type });
  console.log(`Reference image ${i} downloaded:`, {
    size: file.size,
    type: file.type,
    name: file.name
  });
  return file;
}

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
/* 3) Generate image using reference PNGs                             */
/* ------------------------------------------------------------------ */

export async function generateSermonArt(
  prompt: string,
  apiKey: string,
  selectedRefs: ReferenceImage[] = []
): Promise<string | null> {
  // Set API key
  openai.apiKey = apiKey;

  console.time('Total image generation');
  console.time('Download reference images');
  
  // Use selected refs or default to all refs if none selected
  const refsToUse = selectedRefs.length > 0 ? selectedRefs : ReferenceImages;
  
  // Download all PNGs → File[]
  const files = await Promise.all(refsToUse.map((ref, i) => urlToFile(ref.url, i)));
  console.timeEnd('Download reference images');
  console.log(`Downloaded ${files.length} reference images`);

  console.time('OpenAI API call');
  let rsp;
  // Call images.edit
  try {
    console.log('Starting OpenAI API call...', {
      modelName: "gpt-image-1",
      promptLength: prompt.length,
      numFiles: files.length,
      fileTypes: files.map(f => f.type)
    });
    
    rsp = await openai.images.edit({
      model: "gpt-image-1",
      image: files, // Pass all files as style references
      prompt,
      size: "1536x1024",
      n: 1,
      quality: "high"
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

  // Return CDN URL if present, else convert base64 to Blob URL
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

  // Validation temporarily disabled
  console.log('Generated image (validation disabled)');
  return objectUrl;
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