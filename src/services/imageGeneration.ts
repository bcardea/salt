import { openai } from '../lib/openaiClient';
import { urlToFile } from '../utils/downloadHelper';

export interface StylePreset {
  id: string;
  title: string;
  description: string;
  previewUrl: string;
  referenceUrl: string;
}

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'cinematic',
    title: 'Cinematic',
    description: 'Dramatic lighting and composition',
    previewUrl: 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg',
    referenceUrl: 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg'
  },
  {
    id: 'minimal',
    title: 'Minimal',
    description: 'Clean and simple design',
    previewUrl: 'https://images.pexels.com/photos/2647714/pexels-photo-2647714.jpeg',
    referenceUrl: 'https://images.pexels.com/photos/2647714/pexels-photo-2647714.jpeg'
  },
  {
    id: 'abstract',
    title: 'Abstract',
    description: 'Modern artistic expression',
    previewUrl: 'https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg',
    referenceUrl: 'https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg'
  }
];

export async function generateSermonArtPrompt(
  title: string,
  description: string,
  apiKey: string,
  stylePreset: StylePreset
): Promise<string> {
  openai.apiKey = apiKey;

  const prompt = `Create a detailed prompt for generating sermon artwork with the following details:
Title: ${title}
Description: ${description}
Style: ${stylePreset.title} - ${stylePreset.description}

The prompt should focus on creating visually striking, meaningful imagery that captures the essence of the sermon while maintaining the selected style.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 500
  });

  return completion.choices[0].message.content || '';
}

export async function generateSermonArt(
  prompt: string,
  apiKey: string,
  stylePreset?: StylePreset
): Promise<string | null> {
  openai.apiKey = apiKey;

  console.time('Total image generation');
  
  let referenceFile: File | undefined;
  if (stylePreset) {
    console.time('Download reference image');
    try {
      referenceFile = await urlToFile(stylePreset.referenceUrl);
    } catch (error) {
      console.error('Error downloading reference image:', error);
      throw new Error('Failed to download reference image');
    }
    console.timeEnd('Download reference image');
  }

  const finalPrompt = stylePreset 
    ? `[CONTENT INSTRUCTIONS]
${prompt}

[STYLE REFERENCE INSTRUCTIONS]
IMPORTANT: This is a style reference only. DO NOT:
- Copy specific characters or people from the reference
- Replicate exact scenes or locations
- Use the same objects or props

INSTEAD:
- Use the reference ONLY for:
  - Overall composition approach
  - Lighting techniques
  - Color palette inspiration
  - Text placement and hierarchy
  - Visual weight distribution
  - Artistic techniques (e.g., depth of field, texture treatment)

Create a completely new image that applies these style elements to the content described above.`
    : prompt;

  console.time('OpenAI API call');
  let rsp;
  try {
    console.log('Starting OpenAI API call...', {
      modelName: "gpt-image-1",
      promptLength: finalPrompt.length,
      hasReference: !!referenceFile
    });
    
    if (referenceFile) {
      rsp = await openai.images.edit({
        model: "gpt-image-1",
        image: referenceFile,
        prompt: finalPrompt,
        size: "1536x1024",
        quality: "high",
        n: 1
      });
    } else {
      rsp = await openai.images.generate({
        model: "gpt-image-1",
        prompt: finalPrompt,
        size: "1536x1024",
        quality: "high",
        n: 1
      });
    }
    
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

  console.timeEnd('Total image generation');

  if (!rsp.data?.[0]?.url) {
    console.error('No image URL in response');
    return null;
  }

  return rsp.data[0].url;
}