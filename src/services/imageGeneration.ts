import axios from "axios";
import { getOpenAIClient } from "../lib/openaiClient";
import { supabase } from "../lib/supabase";

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
/* Generate prompt text                                               */
/* ------------------------------------------------------------------ */
export async function generateSermonArtPrompt(
  sermTitle: string,
  topic: string,
  stylePreset?: StylePreset
): Promise<{ fullPrompt: string; summary: string }> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-prompt`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: sermTitle,
      topic,
      stylePreset,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to generate prompt');
  }

  return response.json();
}

/* ------------------------------------------------------------------ */
/* Generate image                                                     */
/* ------------------------------------------------------------------ */
export async function generateSermonArt(
  prompt: string,
  stylePreset?: StylePreset
): Promise<string | null> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-image`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      stylePreset,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to generate image');
  }

  const { url } = await response.json();
  return url;
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