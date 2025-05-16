import { createClient } from 'npm:@supabase/supabase-js@2.39.8';
import OpenAI from 'npm:openai@4.28.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface RequestBody {
  title?: string;
  topic?: string;
  summary?: string;
  mode?: 'generate' | 'convert';
  stylePreset?: {
    id: string;
    promptModifiers: string;
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get the JWT from the Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Get the user from the JWT
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      throw new Error('Invalid user token');
    }

    // Parse request body
    const { title, topic, summary, mode = 'generate', stylePreset } = await req.json() as RequestBody;

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });

    if (mode === 'convert' && summary) {
      // Convert summary back to full prompt
      const chat = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert prompt engineer for DALL-E image generation. Convert the given design concept into a detailed, technical prompt that will produce the desired image. Include specific details about composition, lighting, style, and mood."
          },
          {
            role: "user",
            content: `Convert this design concept into a detailed DALL-E prompt:\n\n${summary}\n\n${
              stylePreset ? `Style inspiration: ${stylePreset.promptModifiers}` : ""
            }`
          }
        ]
      });

      return new Response(
        JSON.stringify({
          fullPrompt: chat.choices[0].message.content!.trim()
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (!title || !topic) {
      throw new Error('Title and topic are required for prompt generation');
    }

    const isFullNotes = topic.length > 100;
    const typographyInstructions = "Typography: Use a clean, contemporary sans-serif headline font reminiscent of Montserrat, Gotham, or Inter. If the concept benefits from contrast, pair the headline with a small, elegant hand-written/script sub-title (e.g. Great Vibes). Keep all text crisp, legible, and current; avoid dated or default fonts.";

    const systemPrompt = isFullNotes
      ? `You are an expert prompt engineer for graphic design with over 20 years of experience. Analyze the provided sermon notes to extract key themes, metaphors, and imagery. Create a visually compelling prompt that captures the sermon's core message. Focus on creating a modern, impactful design that communicates the message effectively. ${typographyInstructions}`
      : `You are an expert prompt engineer and creative director specializing in sermon artwork. You have a deep understanding of visual storytelling and how to create impactful, meaningful designs that enhance the message. Your role is to craft unique, creative prompts that align with the selected style while being original and specifically tailored to the sermon's message.`;

    // Generate the full prompt
    const promptChat = await openai.chat.completions.create({
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
                stylePreset ? `\nStyle inspiration: ${stylePreset.promptModifiers}` : ""
              }`
            : `Create an image prompt for the title "${title}" (topic: ${topic}).\n${typographyInstructions}${
                stylePreset ? `\nStyle inspiration: ${stylePreset.promptModifiers}` : ""
              }`
        }
      ]
    });

    const fullPrompt = promptChat.choices[0].message.content!.trim();

    // Generate a user-friendly summary
    const summaryChat = await openai.chat.completions.create({
      model: "gpt-4",
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

    return new Response(
      JSON.stringify({
        fullPrompt,
        summary: summaryChat.choices[0].message.content!.trim()
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});