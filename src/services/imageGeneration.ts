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

  console.group('=== PROMPT GENERATION PROCESS ===');
  console.log('Step 1: Initial Parameters');
  console.log({
    sermTitle,
    topic,
    stylePreset: stylePreset ? {
      id: stylePreset.id,
      title: stylePreset.title,
      promptModifiers: stylePreset.promptModifiers
    } : 'none'
  });

  const isFullNotes = topic.length > 100;
  const typographyInstructions = "Typography: If the prompt modifier in the style reference includes typography information, prioritize using that. If it doesn't, always fall back on the following rules: Use a clean, contemporary sans-serif headline font reminiscent of Montserrat, Gotham, or Inter. If the concept benefits from contrast, pair the headline with a small, elegant hand-written/script sub-title (e.g. Great Vibes). Keep all text crisp, legible, and current; avoid dated or default fonts.";

  const systemPrompt = isFullNotes
    ? `You are an expert prompt engineer for graphic design with over 20 years of experience. Analyze the provided sermon notes to extract key themes, metaphors, and imagery. Create a visually compelling prompt that captures the sermon's core message. Focus on creating a modern, impactful design that communicates the message effectively. ${typographyInstructions}`
    : `You are an expert prompt engineer and creative director specializing in sermon artwork. You have a deep understanding of visual storytelling and how to create impactful, meaningful designs that enhance the message. Your role is to craft unique, creative prompts that align with the selected style while being original and specifically tailored to the sermon's message.`;

  console.log('Step 2: System Configuration');
  console.log({
    isFullNotes,
    systemPrompt
  });

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

  console.log('Step 3: Prompt Generation Request');
  console.log(JSON.stringify(promptMessages, null, 2));

  const promptChat = await openai.chat.completions.create({
    model: "gpt-4.1-2025-04-14",
    messages: promptMessages
  });

  const fullPrompt = promptChat.choices[0].message.content!.trim();
  console.log('Step 4: Generated Full Prompt');
  console.log(fullPrompt);

  // Generate a user-friendly summary
  console.log('Step 5: Summary Generation');
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

  console.log('Summary Request:');
  console.log(JSON.stringify(summaryMessages, null, 2));

  const summaryChat = await openai.chat.completions.create({
    model: "gpt-4.1-2025-04-14",
    messages: summaryMessages
  });

  const summary = summaryChat.choices[0].message.content!.trim();
  console.log('Generated Summary:');
  console.log(summary);

  console.groupEnd();
  return { fullPrompt, summary };
}

/* ------------------------------------------------------------------ */
/* 3) Convert summary back to full prompt                             */
/* ------------------------------------------------------------------ */
export async function convertSummaryToPrompt(
  summary: string,
  stylePreset?: StylePreset
): Promise<string> {
  console.group('=== SUMMARY TO PROMPT CONVERSION ===');
  console.log('Step 1: Input Parameters');
  console.log({
    summary,
    stylePreset: stylePreset ? {
      id: stylePreset.id,
      title: stylePreset.title,
      promptModifiers: stylePreset.promptModifiers
    } : 'none'
  });

  const openai = getOpenAIClient();

  const messages = [
    {
      role: "system",
      content: "You are an expert prompt engineer for gpt-image-1 image generation. Convert the given design concept into a detailed, technical prompt that will produce the desired image. Include specific details about composition, lighting, style, and mood. IMPORTANT: Preserve any specific text content (titles, subtitles) from the original summary."
    },
    {
      role: "user",
      content: `Convert this design concept into a detailed gpt-image-1 prompt:\n\n${summary}\n\n${
        stylePreset ? `Style inspiration: ${stylePreset.promptModifiers}` : ""
      }`
    }
  ];

  console.log('Step 2: Conversion Request');
  console.log(JSON.stringify(messages, null, 2));

  const chat = await openai.chat.completions.create({
    model: "gpt-4.1-2025-04-14",
    messages
  });

  const convertedPrompt = chat.choices[0].message.content!.trim();
  console.log('Step 3: Converted Prompt');
  console.log(convertedPrompt);

  console.groupEnd();
  return convertedPrompt;
}

/* ------------------------------------------------------------------ */
/* 4) Generate image                                                  */
/* ------------------------------------------------------------------ */
export async function generateSermonArt(
  prompt: string,
  stylePreset?: StylePreset
): Promise<string | null> {
  console.group('=== IMAGE GENERATION ===');
  console.log('Step 1: Input Parameters');
  console.log({
    prompt,
    stylePreset: stylePreset ? {
      id: stylePreset.id,
      title: stylePreset.title
    } : 'none'
  });

  const openai = getOpenAIClient();

  // Download reference image if style is selected
  let referenceFile: File | undefined;
  if (stylePreset) {
    try {
      referenceFile = await urlToFile(stylePreset.referenceUrl);
      console.log('Step 2: Reference Image Downloaded');
    } catch (error) {
      console.error('Error downloading reference image:', error);
      throw new Error('Failed to download reference image');
    }
  }

  // Append reference image instructions to the prompt
  const finalPrompt = stylePreset 
    ? `${prompt}\n\nNOTE: You're being given an image reference. Do not replicate the specifics of this image reference including characters, location, etc but instead pull those from the prompt itself. Use the image reference as an inspirational foundation and a guide for how to layout the image with text and design, do not copy the characters in the reference verbatim but instead use them as an example of how to incorporate the characters referenced in the prompt itself.`
    : prompt;

  console.log('Step 3: Final Prompt');
  console.log(finalPrompt);

  try {
    console.log('Step 4: Sending Request to OpenAI');
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

    console.log('Step 5: OpenAI Response');
    console.log(JSON.stringify(rsp, null, 2));

    if (!rsp?.data?.[0]) {
      throw new Error("No image data received from OpenAI");
    }

    const { url, b64_json } = rsp.data[0];
    if (url) {
      console.log('Step 6: Generated Image URL');
      console.log(url);
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

    console.log('Step 6: Generated Object URL');
    console.groupEnd();
    return objectUrl;
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    console.groupEnd();
    throw new Error(`OpenAI API error: ${error.message || 'Unknown error'}`);
  }
}