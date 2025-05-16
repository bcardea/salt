import { createClient } from 'npm:@supabase/supabase-js@2.39.8';
import OpenAI from 'npm:openai@4.28.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface RequestBody {
  prompt: string;
  stylePreset?: {
    id: string;
    referenceUrl: string;
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

    // Check if user has credits
    const { data: credits, error: creditsError } = await supabaseClient
      .from('user_credits')
      .select('credits_remaining')
      .eq('user_id', user.id)
      .single();

    if (creditsError || !credits || credits.credits_remaining <= 0) {
      throw new Error('No credits remaining');
    }

    // Parse request body
    const { prompt, stylePreset } = await req.json() as RequestBody;

    if (!prompt) {
      throw new Error('No prompt provided');
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });

    // Generate image
    let response;
    if (stylePreset?.referenceUrl) {
      // Download reference image
      const imageResponse = await fetch(stylePreset.referenceUrl);
      const imageBlob = await imageResponse.blob();

      // Generate image with reference
      response = await openai.images.edit({
        model: 'gpt-image-1',
        image: imageBlob,
        prompt: `${prompt}\n\nNOTE: Use this image as style reference only. Do not copy specific elements.${
          stylePreset.promptModifiers ? `\n\nStyle inspiration: ${stylePreset.promptModifiers}` : ''
        }`,
        size: '1536x1024',
        quality: 'high',
        n: 1,
      });
    } else {
      // Generate image without reference
      response = await openai.images.generate({
        model: 'gpt-image-1',
        prompt,
        size: '1536x1024',
        quality: 'high',
        n: 1,
      });
    }

    if (!response?.data?.[0]?.url) {
      throw new Error('No image generated');
    }

    // Decrement credits
    const { error: decrementError } = await supabaseClient
      .rpc('decrement_credits', { user_id: user.id });

    if (decrementError) {
      throw new Error('Failed to decrement credits');
    }

    return new Response(
      JSON.stringify({ url: response.data[0].url }),
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