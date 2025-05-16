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
/* Convert summary to full prompt                                     */
/* ------------------------------------------------------------------ */
export async function convertSummaryToPrompt(
  summary: string,
  stylePreset?: StylePreset
): Promise<string> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-prompt`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      summary,
      stylePreset,
      mode: 'convert',
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to convert summary to prompt' }));
    throw new Error(error.message || 'Failed to convert summary to prompt');
  }

  const { fullPrompt } = await response.json();
  return fullPrompt;
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
    promptModifiers: "Create a cinematic interpretation of biblical themes using dramatic lighting, rich textures, and mean