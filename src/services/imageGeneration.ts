// Previous imports remain the same...

export async function generateSermonArt(
  prompt: string,
  apiKey: string,
  stylePreset?: StylePreset
): Promise<string | null> {
  // Set API key
  openai.apiKey = apiKey;

  console.time('Total image generation');
  
  // Download reference image if style is selected
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

  // Create a more structured prompt that clearly separates content from style guidance
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

  // Rest of the function remains the same...
}