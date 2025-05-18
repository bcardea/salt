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
  categories?: string[];
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
  const typographyInstructions = "Typography: If the prompt modifier in the style reference includes typography information, prioritize using that. If it doesn't, always fall back on the following rules: Use a clean, contemporary sans-serif headline font reminiscent of Montserrat, Gotham, or Inter. If the concept benefits from contrast, pair the headline with a small, elegant hand-written/script sub-title (e.g. Great Vibes). Keep all text crisp, legible, and current; avoid dated or default fonts.";

  const systemPrompt = isFullNotes
    ? `You are an expert prompt engineer for graphic design with over 20 years of experience. Analyze the provided sermon notes to extract key themes, metaphors, and imagery. Create a visually compelling prompt that captures the sermon's core message. Focus on creating a modern, impactful design that communicates the message effectively. ${typographyInstructions}`
    : `You are an expert prompt engineer and creative director specializing in sermon artwork. You have a deep understanding of visual storytelling and how to create impactful, meaningful designs that enhance the message. Your role is to craft unique, creative prompts that align with the selected style while being original and specifically tailored to the sermon's message.`;

  console.log('=== GENERATING INITIAL PROMPT ===');
  console.log('Input:', { sermTitle, topic, stylePreset });
  console.log('System Prompt:', systemPrompt);

  const promptMessages = [
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
  ];

  console.log('Prompt Messages:', promptMessages);

  const promptChat = await openai.chat.completions.create({
    model: "gpt-4.1-2025-04-14",
    messages: promptMessages
  });

  const fullPrompt = promptChat.choices[0].message.content!.trim();
  console.log('Generated Full Prompt:', fullPrompt);

  // Generate a user-friendly summary
  console.log('=== GENERATING SUMMARY ===');
  const summaryMessages = [
    {
      role: "system",
      content: "You are an expert at explaining complex design concepts in simple terms. Create a clear, concise summary that captures the key visual elements and artistic direction in plain language."
    },
    {
      role: "user",
      content: `Summarize this image generation prompt in a single, easy-to-understand paragraph:\n\n${fullPrompt}`
    }
  ];

  console.log('Summary Messages:', summaryMessages);

  const summaryChat = await openai.chat.completions.create({
    model: "gpt-4.1-2025-04-14",
    messages: summaryMessages
  });

  const summary = summaryChat.choices[0].message.content!.trim();
  console.log('Generated Summary:', summary);

  return { fullPrompt, summary };
}

/* ------------------------------------------------------------------ */
/* 3) Convert summary back to full prompt                             */
/* ------------------------------------------------------------------ */
export async function convertSummaryToPrompt(
  summary: string,
  stylePreset?: StylePreset
): Promise<string> {
  console.log('=== CONVERTING SUMMARY TO PROMPT ===');
  console.log('Input:', { summary, stylePreset });

  const openai = getOpenAIClient();

  const messages = [
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
  ];

  console.log('Conversion Messages:', messages);

  const chat = await openai.chat.completions.create({
    model: "gpt-4.1-2025-04-14",
    messages
  });

  const convertedPrompt = chat.choices[0].message.content!.trim();
  console.log('Converted Prompt:', convertedPrompt);

  return convertedPrompt;
}

/* ------------------------------------------------------------------ */
/* 4) Generate image                                                  */
/* ------------------------------------------------------------------ */
export async function generateSermonArt(
  prompt: string,
  stylePreset?: StylePreset
): Promise<string | null> {
  console.log('=== GENERATING IMAGE ===');
  console.log('Input:', { prompt, stylePreset });

  const openai = getOpenAIClient();

  // Download reference image if style is selected
  let referenceFile: File | undefined;
  if (stylePreset) {
    try {
      referenceFile = await urlToFile(stylePreset.referenceUrl);
      console.log('Reference image downloaded successfully');
    } catch (error) {
      console.error('Error downloading reference image:', error);
      throw new Error('Failed to download reference image');
    }
  }

  // Append reference image instructions to the prompt
  const finalPrompt = stylePreset 
    ? `${prompt}\n\nNOTE: You're being given an image reference. Do not replicate the specifics of this image reference including characters, location, etc but instead pull those from the prompt itself. Use the image reference as an inspirational foundation and a guide for how to layout the image with text and design, do not copy the characters in the reference verbatim but instead use them as an example of how to incorporate the characters referenced in the prompt itself.`
    : prompt;

  console.log('Final Prompt:', finalPrompt);

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

    console.log('OpenAI Response:', rsp);

    if (!rsp?.data?.[0]) {
      throw new Error("No image data received from OpenAI");
    }

    const { url, b64_json } = rsp.data[0];
    if (url) {
      console.log('Generated image URL:', url);
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

    console.log('Generated object URL for image');
    return objectUrl;
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    throw new Error(`OpenAI API error: ${error.message || 'Unknown error'}`);
  }
}