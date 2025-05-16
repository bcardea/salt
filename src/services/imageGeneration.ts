import axios from "axios";
import { getOpenAIClient } from "../lib/openaiClient";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
export type StylePreset = {
  id: string;
  title: string;
  description: string;
  promptModifiers: string;
  previewUrl: string;
  referenceUrl: string;
};

/* ------------------------------------------------------------------ */
/* 1) Utility: fetch URL → File                                       */
/* ------------------------------------------------------------------ */
async function urlToFile(url: string): Promise<File> {
  const res = await axios.get<ArrayBuffer>(url, { responseType: "arraybuffer" });
  const type = res.headers["content-type"] ?? "image/png";
  const blob = new Blob([res.data], { type });
  const file = new File([blob], `reference.png`, { type });
  return file;
}

/* ------------------------------------------------------------------ */
/* 2) Generate prompt text                                            */
/* ------------------------------------------------------------------ */
export async function generateSermonArtPrompt(
  sermTitle: string,
  topic: string,
  stylePreset?: StylePreset
): Promise<{ fullPrompt: string; summary: string }> {
  const openai = getOpenAIClient();

  const isFullNotes = topic.length > 100;
  const typographyInstructions = "Typography: Use a clean, contemporary sans-serif headline font reminiscent of Montserrat, Gotham, or Inter. If the concept benefits from contrast, pair the headline with a small, elegant hand-written/script sub-title (e.g. Great Vibes). Keep all text crisp, legible, and current; avoid dated or default fonts.";

  const systemPrompt = isFullNotes
    ? `You are an expert prompt engineer for graphic design with over 20 years of experience. Analyze the provided sermon notes to extract key themes, metaphors, and imagery. Create a visually compelling prompt that captures the sermon's core message. Focus on creating a modern, impactful design that communicates the message effectively. ${typographyInstructions}`
    : `You are an expert prompt engineer and creative director specializing in sermon artwork. You have a deep understanding of visual storytelling and how to create impactful, meaningful designs that enhance the message. Your role is to craft unique, creative prompts that align with the selected style while being original and specifically tailored to the sermon's message.`;

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
          ? `Create an image prompt based on these sermon notes:\n\n${topic}\n\nCreate a fresh 1536×1024 landscape sermon graphic that captures the core message.\n${typographyInstructions}${
              stylePreset ? `\nStyle inspiration: ${stylePreset.promptModifiers}` : ""
            }`
          : `Create an image prompt for the title "${sermTitle}" (topic: ${topic}).\n${typographyInstructions}${
              stylePreset ? `\nStyle inspiration: ${stylePreset.promptModifiers}` : ""
            }`
      }
    ]
  });

  const fullPrompt = promptChat.choices[0].message.content!.trim();

  // Generate a user-friendly summary
  const summaryChat = await openai.chat.completions.create({
    model: "gpt-4.1-2025-04-14",
    messages: [
      {
        role: "system",
        content: "You are an expert at explaining complex design concepts in simple terms. Create a clear, concise summary that captures the key visual elements and artistic direction in plain language."
      },
      {
        role: "user",
        content: `Summarize this image generation prompt in a single, easy-to-understand paragraph:\n\n${fullPrompt}`
      }
    ]
  });

  return {
    fullPrompt,
    summary: summaryChat.choices[0].message.content!.trim()
  };
}

/* ------------------------------------------------------------------ */
/* 3) Convert summary back to full prompt                             */
/* ------------------------------------------------------------------ */
export async function convertSummaryToPrompt(
  summary: string,
  stylePreset?: StylePreset
): Promise<string> {
  const openai = getOpenAIClient();

  const chat = await openai.chat.completions.create({
    model: "gpt-4.1-2025-04-14",
    messages: [
      {
        role: "system",
        content: "You are an expert prompt engineer for gpt-image-1 image generation. Convert the given design concept into a detailed, technical prompt that will produce the desired image. Include specific details about composition, lighting, style, and mood."
      },
      {
        role: "user",
        content: `Convert this design concept into a detailed gpt-image-1 prompt:\n\n${summary}\n\n${
          stylePreset ? `Style inspiration: ${stylePreset.promptModifiers}` : ""
        }`
      }
    ]
  });

  return chat.choices[0].message.content!.trim();
}

/* ------------------------------------------------------------------ */
/* 4) Generate image                                                  */
/* ------------------------------------------------------------------ */
export async function generateSermonArt(
  prompt: string,
  stylePreset?: StylePreset
): Promise<string | null> {
  const openai = getOpenAIClient();

  // Download reference image if style is selected
  let referenceFile: File | undefined;
  if (stylePreset) {
    try {
      referenceFile = await urlToFile(stylePreset.referenceUrl);
    } catch (error) {
      console.error('Error downloading reference image:', error);
      throw new Error('Failed to download reference image');
    }
  }

  // Append reference image instructions to the prompt
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

    // Convert base64 to Blob URL for better performance
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

/* ------------------------------------------------------------------ */
/* Style presets                                                      */
/* ------------------------------------------------------------------ */
export const STYLE_PRESETS: StylePreset[] = [
  {
    id: "desert-vintage",
    title: "Desert Vintage Poster",
    description: "Cinematic desert scene with vintage poster aesthetics",
    promptModifiers: `Hyper detailed, filmic, photorealistic shot on Sony a7iii: Create a hyper detailed filmic image using the following json prompt: {
      "scene": "vast, windswept desert under a hazy beige-grey sky, rendered in warm sepia tones with a subtle vintage paper grain overlay",
      "image_dimensions": "1536×1024",
      "aspect_ratio": "3:2 landscape",
      "composition": "rule-of-thirds: horizon line and crest of main dune sit on lower third; text block occupies central third; ample negative space in upper right sky",
      "color_palette": {
        "sky": "#d9d2bd",
        "dune_highlights": "#c89a64",
        "dune_shadows": "#7d4e2d",
        "distant_rocks": "#8c6f54",
        "title_text": "#f5f1e6",
        "accent_text": "#ff4b1d",
        "subtitle_text": "#d7d4cb",
        "starburst": "#7a5c42"
      },
      "lighting": "soft late-afternoon sunlight diffused by airborne dust; gentle warm highlights, long muted shadows behind every foreground figure",
      "mood": "solemn yet hopeful, adventurous faith in uncharted territory",
      "texture": [
        "fine film grain across entire frame (40–50% opacity)",
        "subtle mottled paper-fiber texture especially visible in sky gradients"
      ],
      "background": {
        "elements": [
          "softly blurred mesas / sandstone cliffs on left horizon, partially obscured by atmospheric haze",
          "rolling dunes sweeping rightward with natural ripples and ridges",
          "distant faint rock outcrops on far right horizon, barely visible through dust"
        ],
        "depth_of_field": "sharp mid-ground on main subjects, increasingly soft toward distant background"
      },
      "subjects": [
        {
          "type": "adult female",
          "description": "wearing ankle-length black robe and muted blue head-scarf, left hand clasped with companion",
          "pose": "walking away from viewer, slight forward lean",
          "position": "left foreground, just right of first vertical third"
        },
        {
          "type": "adult male",
          "description": "tunic and dark trousers, dusty blue head-wrap, right arm extended to hold partner's hand",
          "pose": "striding forward beside female",
          "position": "just right of female, lower left quadrant"
        },
        {
          "type": "camel with rider",
          "description": "tall, tan-brown camel carrying a robed rider (dark garments, faint red accent at shoulder)",
          "pose": "walking in step with the people",
          "position": "dead center bottom-middle, camel legs casting elongated shadows"
        },
        {
          "type": "child",
          "description": "small figure in dark brown robe, white head-scarf, following camel",
          "pose": "walking briskly, slight turn toward camel",
          "position": "right of camel, center-bottom"
        }
      ],
      "graphic_elements": [
        {
          "type": "radial_lines",
          "description": "hand-drawn starburst of ~40 irregular rays, imperfect line weight for vintage feel",
          "color": "#7a5c42",
          "position": "centered behind main title block, rays extending roughly one text-height above and around"
        }
      ],
      "typography": {
        "hierarchy": [
          {
            "text": "{sermon_title}",
            "font": "classic transitional serif (e.g., Baskerville)",
            "weight": "regular",
            "size": "medium",
            "color": "#5c4027",
            "letter_spacing": "normal",
            "case": "title",
            "position": "immediately below starburst apex, centered"
          }
        ],
        "subtitle": {
          "text": "{sermon_topic}",
          "font": "condensed geometric sans-serif (e.g., Futura Condensed Extra Bold), all caps",
          "weight": "medium",
          "size": "small",
          "color": "#d7d4cb",
          "letter_spacing": "150",
          "position": "just below title, right-aligned to end of title"
        }
      },
      "style": "cinematic, vintage poster aesthetic with modern font pairing; warm filmic color grade, subtle split-toning in shadows and highlights",
      "post_processing": [
        "light sepia color grade",
        "slight vignette (10% darkening at corners)",
        "film-burn dust specks randomly distributed",
        "very soft Gaussian bloom around bright text to integrate with background"
      ]
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6827ba33dbfc243b8dfdee35.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6827ba33dbfc243b8dfdee35.jpeg"
  },
  {
    id: "ink-clouds",
    title: "Colorful Ink Clouds",
    description: "Dynamic ink clouds with modern typography",
    promptModifiers: `{
      "scene": "high-speed macro photography of acrylic ink clouds diffusing in clear water, captured against a soft light-grey studio backdrop",
      "image_dimensions": "1920×1080",
      "aspect_ratio": "16:9 landscape",
      "composition": "central focus; ink mass takes up the middle two vertical thirds and spreads horizontally from left edge to two-thirds right; negative space in far left/right edges and upper corners keeps composition balanced; text is horizontally and vertically centered over the densest ink area",
      "color_palette": {
        "background": "#d8dcd8",
        "ink_teal": "#0fa3a5",
        "ink_deep_teal": "#045d66",
        "ink_olive": "#698a37",
        "ink_burnt_orange": "#934a1c",
        "star_white": "#f6f6f6",
        "text_white": "#ffffff"
      },
      "lighting": "even diffused soft-box lighting from both upper left and upper right, eliminating harsh shadows; slight top highlight on ink plumes; background illuminated evenly to a pale neutral grey",
      "mood": "curious, introspective, modern",
      "texture": [
        "smooth bokeh in background due to shallow depth-of-field",
        "fine suspended micro-bubbles visible inside the ink (10–15% opacity)",
        "very subtle grain overlay (film-like, 8% opacity) for cohesion"
      ],
      "background": {
        "elements": [
          "clean glass tank wall faintly visible as horizontal line along top fifth (blurred)",
          "gradual vignette darkening toward extreme corners (5% strength)"
        ],
        "depth_of_field": "sharpest focus on forward ink folds and front edge of white star; gradual blur toward rear edges of ink cloud and background glass"
      },
      "subjects": [
        {
          "type": "ink_cloud_teal",
          "description": "billowing, cauliflower-like plumes of vibrant teal and cyan hues with occasional darker turquoise veins",
          "position": "left-center, extending to just right of image center"
        },
        {
          "type": "ink_cloud_olive",
          "description": "overlapping olive-green ink with hints of yellow-green, merging with burnt orange wisps near the top",
          "position": "right-center, blending into teal toward middle"
        },
        {
          "type": "ink_cloud_burnt_orange",
          "description": "narrow streaks of warm burnt orange emerging from the top-center of olive cloud, providing warm contrast",
          "position": "top-center"
        },
        {
          "type": "geometric_object",
          "description": "matte-white acrylic three-pointed downward star/chevron (two long isosceles triangles joined at 90°), edges slightly rough from laser cut, faint water droplets on surface",
          "position": "lower-center beneath ink clouds, pointing down toward bottom edge; front edge in crisp focus, rear edge slightly blurred"
        }
      ],
      "graphic_elements": [],
      "typography": {
        "main_title": {
          "text": "{sermon_title}",
          "font": "condensed modern sans-serif with high verticality (similar to 'Oswald Light' with stylised open counters in A and R)",
          "weight": "semi-bold",
          "size": "extra-large (spanning ~55% image width)",
          "color": "#ffffff",
          "letter_spacing": "200",
          "case": "uppercase",
          "alignment": "center",
          "position": "center, slightly below vertical midpoint of frame"
        }
      },
      "style": "cinematic macro-ink photography with minimalist typography overlay; emphasis on color contrast between cool teal/cyan and warm olive/orange; clean futuristic vibe",
      "post_processing": [
        "10% gaussian blur applied to entire frame then masked out from central ink mass and star to create subtle depth",
        "overall contrast boosted by +12 to deepen shadows within ink folds",
        "slight clarity increase (+15) on star edges to keep geometric object crisp",
        "gentle desaturation of background by −20 to keep focus on ink colors",
        "linear white text layer with drop opacity 100%, no shadow or effects"
      ]
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6827bbef80f93eb0fcaef0c3.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6827bbef80f93eb0fcaef0c3.jpeg"
  },
  {
    id: "bw-double-exposure",
    title: "BW Double Exposure",
    description: "High-contrast monochrome double-exposure artwork",
    promptModifiers: `{
      "scene": "high-contrast monochrome double-exposure artwork: a young woman's left-facing profile blended with a mist-covered mountain landscape, set on a distressed white concrete background",
      "image_dimensions": "1920×960",
      "aspect_ratio": "2:1 landscape",
      "composition": {
        "grid": "rule-of-thirds; face occupies the entire left vertical third, text spans the central third, right third remains largely negative space",
        "flow": "viewer eye enters at woman's nose tip, follows river valley inward toward center, then across headline to right edge"
      },
      "color_palette": {
        "paper_white": "#f1f1f1",
        "pale_gray": "#d9d9d9",
        "mid_gray": "#9b9b9b",
        "charcoal_gray": "#3a3a3a",
        "near_black": "#151515"
      },
      "lighting": "even studio lighting flattened to grayscale; shadows within facial features kept soft; landscape retains natural light gradients but compressed for high contrast",
      "mood": "introspective, cerebral, modern-minimalist with a raw gritty texture",
      "textures": [
        "heavy concrete / plaster wall texture across entire canvas (50% opacity overlay)",
        "vertical dry-brush streaks descending from top right to mid-right, 15% opacity",
        "random black dust specks and white paint flecks (2-4 px) scattered sparsely (~0.5% coverage)",
        "fine film grain noise layered uniformly (20% opacity)"
      ],
      "background": {
        "base_color": "paper_white",
        "distress": "subtle charcoal smudges and hand-rubbed graphite shading radiating from center-right outward",
        "vignette": "extremely light inward vignette (-6 exposure at corners)"
      },
      "subjects": [
        {
          "type": "female_profile_silhouette",
          "description": "side profile of a young woman with relaxed, meditative expression; eyelids closed, lips gently pressed; neck and hair strands taper toward bottom edge",
          "position": "left third, nose almost touching left border",
          "opacity_mask": "100% inside mountain exposure, fades to 0% beyond silhouette edge"
        },
        {
          "type": "mountain_valley",
          "description": "rocky alpine valley viewed from above, steep slopes on each side, winding river / trail snaking from lower center up toward distant cloud bank",
          "blend_mode": "screen + hard light combo for deep blacks and bright whites",
          "position": "conforms to entire head silhouette, river path aligned with woman's neck-to-jaw line"
        },
        {
          "type": "cloud_bank",
          "description": "low-hanging misty clouds partially obscuring mountain peaks, fine soft-edge transition into scalp region",
          "opacity": "70%",
          "position": "upper cranial region within silhouette"
        }
      ],
      "graphic_elements": [],
      "typography": {
        "headline": {
          "text": "{sermon_title}",
          "split_render": [
            {
              "segment": "{sermon_title_first_half}",
              "font": "extended geometric sans-serif (similar to 'Bebas Neue', uppercase)",
              "weight": "bold",
              "color": "#cfd1d3",
              "texture_mask": "concrete texture clipping mask to introduce speckled erosion",
              "letter_spacing": "215",
              "opacity": "90%"
            },
            {
              "segment": "{sermon_title_second_half}",
              "font": "same family, bold weight",
              "color": "#1d1f22",
              "texture_mask": "same concrete mask but inverted to keep darker fills mostly solid",
              "letter_spacing": "215",
              "opacity": "100%"
            }
          ],
          "size": "ultra-large (cap height ≈ 18% of canvas height)",
          "alignment": "horizontal centerline, starts slightly right of facial silhouette and ends ~160 px from right edge",
          "baseline_shift": "first half baseline perfectly aligned to second half baseline"
        }
      },
      "style": "high-key B&W double-exposure poster; brutalist typography meets ethereal nature imagery; tactile, weathered paper aesthetic",
      "post_processing": [
        "convert composite to monochrome, apply red-filter B&W preset to darken sky, brighten skin",
        "curves adjustment: raise whites, deepen shadows to pure #151515 blacks",
        "add concrete JPEG texture overlay, set to multiply at 50% opacity then masked off around headline to keep characters legible",
        "apply brushed graphite texture layer, angled 20° from vertical, soft light 35% opacity on right half only",
        "apply high-pass sharpen (radius 1.2 px, soft-light blend) limited to mountain details for crispness",
        "final noise layer: monochrome, 3% opacity, film grain size 400 dpi"
      ]
    }`,
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6827bcc3c519288e6a28f831.jpeg",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6827bcc3c519288e6a28f831.jpeg"
  },
  {
    id: "photoreal",
    title: "Photographic",
    description: "Professional portrait style with cinematic lighting & subtle environmental storytelling",
    promptModifiers: "Create a Photo-realistic filmic style image. Consider a cinematic portrait approach with thoughtful environmental storytelling. Use professional lighting techniques, selective focus, and sophisticated color grading to create depth and emotion. The environment should subtly reinforce the sermon's theme without overshadowing the subject. Make sure it's photorealsitic and has the characterstics of an actual photograph",
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9d9cd8fb87c29ba7f0.png",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9d9cd8fb87c29ba7f0.png"
  },
  {
    id: "minimalist",
    title: "Modern Minimal",
    description: "Clean, editorial layout with purposeful negative space",
    promptModifiers: "Draw inspiration from modern editorial design. Use purposeful negative space, strong typographic hierarchy, and a restrained color palette. Consider geometric elements, clean lines, or abstract shapes that complement the message. The design should feel sophisticated and intentional.",
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9c183ce57ad6921011.png",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9c183ce57ad6921011.png"
  },
  {
    id: "retro80s",
    title: "Retro 80s",
    description: "Synthwave-inspired design with bold energy",
    promptModifiers: "Channel retro-futuristic aesthetics with bold color gradients, dynamic lighting, and geometric elements. Consider how to incorporate synthwave elements while maintaining relevance to the sermon's message. The design should feel energetic and nostalgic without being cliché.",
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9db098801ec44508d0.png",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9db098801ec44508d0.png"
  },
  {
    id: "biblical",
    title: "Cinematic",
    description: "Epic, dramatic artwork inspired by ancient narratives",
    promptModifiers: "Create a cinematic interpretation of biblical themes using dramatic lighting, rich textures, and meaningful symbolism. Consider architectural elements, natural phenomena, or historical artifacts that resonate with the message. The composition should feel timeless and profound, avoiding literal interpretations in favor of powerful visual metaphors.",
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251c81183ce502b0921294.png",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251c81183ce502b0921294.png"
  },
  {
    id: "youth",
    title: "Youthful Collage",
    description: "Modern grunge collage full of energy and layers",
    promptModifiers: "Create a dynamic collage composition with multiple overlapping elements, torn paper textures, and layered design elements. Include: 1) A base layer with grungy textures or distressed patterns 2) Multiple overlapping geometric shapes or torn paper elements 3) Typography treated as graphic elements with parts intentionally overlapping or breaking the frame 4) Subtle shadow effects to create depth between layers 5) Small decorative elements like paint splatters, tape, or paper clips scattered thoughtfully. The overall composition should feel energetic and intentionally layered, with clear visual hierarchy despite the complexity.",
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9dc469326aedc5682b.png",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9dc469326aedc5682b.png"
  },
  {
    id: "vintage",
    title: "Vintage Print",
    description: "Classic aesthetic with authentic print textures",
    promptModifiers: "Draw from classic print design with authentic textures, traditional typography, and careful attention to detail. Consider how printing artifacts and techniques can add character without overwhelming the design. The result should feel crafted and timeless.",
    previewUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9c9cd8fb4b3d9ba7ed.png",
    referenceUrl: "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9c9cd8fb4b3d9ba7ed.png"
  }
];