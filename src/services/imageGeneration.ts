import OpenAI from "openai";
import * as fs from "fs";  // for reading reference images
import * as path from "path";

// Initialize OpenAI API (assumes OPENAI_API_KEY is set in env)
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true 
});

// Define the structure for style presets
interface StylePreset {
  id: string;
  name: string;
  // A brief description or set of modifiers defining the style (for prompt context)
  stylePrompt: string;
  // Path to the reference image file for this style
  refImagePath: string;
  // List of possible typography instruction variants for this style
  typography: string[];
}

// Style presets array – add new presets here to support more styles
export const STYLE_PRESETS: StylePreset[] = [
  {
    id: "photoreal",
    name: "Photorealistic",
    stylePrompt: "a cinematic, photorealistic style with realistic lighting and emotional tone. (The reference image features a young man at sunset, but use this only for mood/lighting inspiration – do **not** copy the same person or scene.) This style should feel like a real-life scene captured on camera.",
    refImagePath: path.join(__dirname, "assets/styles/photoreal.png"),  // update path as needed
    typography: [
      "the title in a bold modern sans-serif font and the subtitle in a clear cursive script",
      "clean, large sans-serif text for the title, with a smaller italic serif for the subtitle",
      "the title in a crisp sans-serif typeface and the subtitle in an elegant handwritten-style font"
    ]
  },
  {
    id: "minimal",
    name: "Minimal Modern",
    stylePrompt: "a minimalist, modern graphic style with clean lines and ample whitespace. (The reference image is mostly abstract with simple shapes and neutral colors – **do not** add detailed scenery or characters.) Emphasize simplicity and an uncluttered design.",
    refImagePath: path.join(__dirname, "assets/styles/minimalmodern.png"),
    typography: [
      "a simple, bold sans-serif font for the title and a lighter sans-serif for the subtitle",
      "modern minimal text: uppercase sans-serif title and a thin lowercase subtitle",
      "clean typography with a neutral sans-serif font for both title and subtitle"
    ]
  },
  {
    id: "retro80s",
    name: "80's Retro",
    stylePrompt: "a vibrant 1980s retro synthwave style with neon colors, sunset gradients, and palm trees. (The reference image shows a neon sun and palm silhouette – use this for color and vibe inspiration, **not** to duplicate the exact scene.) Create a nostalgic, energetic atmosphere true to 80s aesthetics.",
    refImagePath: path.join(__dirname, "assets/styles/80s.png"),
    typography: [
      "chrome 3D lettering for the title with a neon glow, and a cursive neon-style font for the subtitle",
      "retro arcade-style bold font for the title and a hot pink script for the subtitle",
      "the title in a metallic 80s display font, with the subtitle in a neon cursive beneath it"
    ]
  },
  {
    id: "cinematic",
    name: "Cinematic Drama",
    stylePrompt: "an epic, cinematic style with dramatic lighting and rich detail. (The reference image has a crown in dusty light – an **inspiration for mood** only, not to reuse the same crown prop.) Use deep shadows and a grand atmosphere to convey drama and significance.",
    refImagePath: path.join(__dirname, "assets/styles/cinematic.png"),
    typography: [
      "a classic movie-poster look: title in an elegant serif (like Trajan) and subtitle in a subtle italic serif",
      "the title in a dramatic serif typeface, with the subtitle in smaller capital letters underneath",
      "cinematic text styling with a bold serif title and the subtitle in an understated, light serif font"
    ]
  },
  {
    id: "youthCollage",
    name: "Youth Collage",
    stylePrompt: "a youthful collage/art journal style with torn paper, textured overlays, and mixed media. (The reference image includes a face with torn paper and flowers – take **style inspiration** from that layering effect, not the specific face.) Incorporate grunge textures or floral elements to give an artisanal collage feel.",
    refImagePath: path.join(__dirname, "assets/styles/youthcollage.png"),
    typography: [
      "the title in bold sans-serif on ripped paper scraps and the subtitle in a handwritten or brush script below",
      "a gritty collage text style: title stamped or stenciled, with the subtitle in a casual script",
      "typography that looks cut-out: a heavy block font for title and a playful handwritten font for subtitle"
    ]
  },
  {
    id: "vintagePrint",
    name: "Vintage Print",
    stylePrompt: "a vintage print poster style with halftone shading and retro colors. (The reference image shows a silhouetted figure and an old print texture – use it as **style** guide, not to reuse the same figure.) Capture a nostalgic, printed look with coarse dots and limited color palette.",
    refImagePath: path.join(__dirname, "assets/styles/vintageprint.png"),
    typography: [
      "the title in a bold retro sans-serif and the subtitle in an italic script, like a vintage poster",
      "text with a distressed print effect: a thick old-style sans-serif for the title and a cursive font for subtitle",
      "vintage typography: title in all-caps sans-serif and subtitle in a smaller, italicized serif font"
    ]
  }
];

/** Helper: find a style preset by id or name (case-insensitive). Throws if not found. */
function getStylePreset(styleIdOrName: string): StylePreset {
  const match = STYLE_PRESETS.find(p => 
    p.id.toLowerCase() === styleIdOrName.toLowerCase() || 
    p.name.toLowerCase() === styleIdOrName.toLowerCase()
  );
  if (!match) {
    throw new Error(`Style preset "${styleIdOrName}" not found.`);
  }
  return match;
}

/**
 * Generates a descriptive image prompt for a sermon artwork using GPT-4.1.
 * @param title    The sermon title text (will appear on the image).
 * @param subtitle The sermon subtitle or tagline text (optional, can be empty).
 * @param notes    Additional sermon notes or description for context (can be empty).
 * @param styleKey The style preset identifier or name to guide art style.
 * @return A promise resolving to a creative prompt string for the image model.
 */
export async function generateSermonArtPrompt(
  title: string, 
  subtitle: string, 
  notes: string, 
  styleKey: string
): Promise<string> {
  const style = getStylePreset(styleKey);
  console.log(`[generateSermonArtPrompt] Generating prompt for style="${style.name}", title="${title}"`);

  // Randomly pick a typography instruction from the style's suggestions
  const typographyInstruction = style.typography[
    Math.floor(Math.random() * style.typography.length)
  ];

  // Optionally introduce a random focus for variety (character, symbol, or scene) to reduce repetition
  const focusOptions = [
    `focus on a person as the main subject who embodies the message`,            // human subject focus
    `feature a symbolic object or prop that represents the theme`,               // object/symbol focus
    `depict a background scene or environment that conveys the atmosphere`       // scene/landscape focus
  ];
  const randomFocus = focusOptions[Math.floor(Math.random() * focusOptions.length)];

  // Construct the system and user messages for the chat completion
  const systemMessage = 
    "You are a creative assistant that generates detailed image prompts for an AI image model. " +
    "Your goal is to describe a compelling artwork for a church sermon series, given the sermon title, subtitle, notes, and a target style. " +
    "The prompt should stay true to the sermon topic and be imaginative. " +
    "Always include the exact title and subtitle text in the prompt, with instructions for clear, legible typography. " +
    "Make sure the style guidelines are followed, but do not duplicate the reference image's exact composition or any specific person from it. " +
    "Avoid repetitive visuals between prompts. Use varied compositions (sometimes a person, sometimes a symbol or scene) to illustrate the theme. " +
    "Write the prompt in one paragraph, present tense, and in an encouraging tone.";
  
  // Include all relevant info for the prompt generation
  let userMessage = `Title: "${title}"`;
  if (subtitle && subtitle.trim().length > 0) {
    userMessage += `\nSubtitle: "${subtitle}"`;
  }
  if (notes && notes.trim().length > 0) {
    userMessage += `\nNotes: ${notes}`;
  }
  userMessage += `\nStyle: ${style.name} – ${style.stylePrompt}\n`;
  userMessage += `Focus: ${randomFocus}.\n`;
  userMessage += `Requirement: The image should include the title and subtitle text with ${typographyInstruction}.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-0613",  // using GPT-4.1 (adjust model name if needed)
      temperature: 0.8,
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage }
      ]
    });
    const promptText = completion.choices[0]?.message?.content?.trim();
    if (!promptText) {
      throw new Error("Empty prompt generated by GPT");
    }
    console.log(`[generateSermonArtPrompt] Prompt generated (${promptText.length} chars).`);
    return promptText;
  } catch (error: any) {
    console.error("Error generating sermon art prompt:", error);
    throw new Error(`Failed to generate prompt: ${error.message || error}`);
  }
}

/**
 * Generates the sermon artwork image using the gpt-image-1 model, given a prompt and style.
 * @param prompt   The prompt string describing the desired image (typically from generateSermonArtPrompt, possibly edited by user).
 * @param styleKey The style preset identifier or name (to select reference image and modifiers).
 * @return A promise resolving to the URL of the generated image.
 */
export async function generateSermonArt(prompt: string, styleKey: string): Promise<string> {
  const style = getStylePreset(styleKey);
  console.log(`[generateSermonArt] Generating image for style="${style.name}" with prompt length=${prompt.length}`);

  // Load the style reference image from disk
  let imageData: Buffer;
  try {
    imageData = await fs.promises.readFile(style.refImagePath);
  } catch (err: any) {
    console.error(`Error loading reference image "${style.refImagePath}":`, err);
    throw new Error(`Reference image not found for style "${style.name}".`);
  }

  try {
    // Call the OpenAI image edit endpoint with the reference image
    const imageResponse = await openai.images.edit({
      image: imageData,
      prompt: prompt,
      n: 1,
      size: "1536x1024",    // landscape aspect for wide artwork (3:2 ratio)
      quality: "high",      // request high quality generation
      response_format: "url"// get URL to the generated image
      // (No mask provided – the model will use the reference image for style inspiration and generate new content based on the prompt)
    });
    const imageUrl = imageResponse.data[0]?.url;
    if (!imageUrl) {
      throw new Error("No image URL returned by OpenAI API");
    }
    console.log(`[generateSermonArt] Image generated. URL: ${imageUrl}`);
    return imageUrl;
  } catch (error: any) {
    console.error("Error generating sermon art image:", error);
    throw new Error(`Failed to generate image: ${error.message || error}`);
  }
}