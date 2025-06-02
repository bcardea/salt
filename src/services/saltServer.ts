interface TypographyResponse {
  images: Array<{ url: string }>;
}

interface FinalPosterResponse {
  imageUrl: string;
}

interface AnimationResponse {
  videoUrl: string;
}

const SALT_SERVER_URL = 'https://salt-server.onrender.com';

export async function generateTypography(
  headline: string,
  subHeadline: string,
  style: 'focused' | 'trendy' | 'kids' | 'handwritten'
): Promise<string[]> {
  try {
    const response = await fetch(`${SALT_SERVER_URL}/api/generate-typography`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        headline,
        subHeadline,
        style
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Typography generation failed');
    }

    const data: TypographyResponse = await response.json();
    return data.images.map(img => img.url);
  } catch (error: any) {
    console.error('Typography generation error:', error);
    throw error;
  }
}

export async function generateFinalPoster(
  typographyUrl: string,
  imageDescription: string
): Promise<string> {
  try {
    const response = await fetch(`${SALT_SERVER_URL}/api/generate-final`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        typographyUrl,
        imageDescription
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Final poster generation failed');
    }

    const data: FinalPosterResponse = await response.json();
    return data.imageUrl;
  } catch (error: any) {
    console.error('Final poster generation error:', error);
    throw error;
  }
}

export async function animatePoster(imageUrl: string): Promise<string> {
  try {
    // Convert image URL to base64
    const imageResponse = await fetch(imageUrl);
    const blob = await imageResponse.blob();
    const base64Image = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });

    const response = await fetch(`${SALT_SERVER_URL}/api/animate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imageBase64: base64Image
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Animation generation failed');
    }

    const data: AnimationResponse = await response.json();
    return data.videoUrl;
  } catch (error: any) {
    console.error('Animation generation error:', error);
    throw error;
  }
}
