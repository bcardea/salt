interface TypographyResponse {
  images: Array<{ url: string }>;
}

interface FinalPosterResponse {
  imageUrl: string;
}

interface AnimationResponse {
  videoUrl: string;
}

interface BackgroundSuggestionsResponse {
  suggestions: string[];
}

interface SermonAngle {
  title: string;
  coreSummary: string;
  journey: string;
}

interface SermonOutlineResponse {
  outline: string;
  imageUrl: string;
}

interface DepthResearchResponse {
  analysis: string;
}

interface AromaContentResponse {
  draft: string;
}

export interface AromaContentParams {
  type: string;
  topic: string;
  keyPoints: string;
  tone: string;
  audience: string;
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
      credentials: 'include',
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
      credentials: 'include',
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

export async function getBackgroundSuggestions(
  headline: string,
  subHeadline: string
): Promise<string[]> {
  try {
    const response = await fetch(`${SALT_SERVER_URL}/api/suggest-backgrounds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        headline,
        subHeadline
      })
    });

    if (!response.ok) {
      let error;
      try {
        error = await response.json();
      } catch (e) {
        throw new Error('Failed to get background suggestions from server');
      }
      throw new Error(error.error || 'Background suggestions generation failed');
    }

    let data;
    try {
      data = await response.json();
    } catch (e) {
      console.error('Failed to parse JSON response:', e);
      throw new Error('Invalid response from background suggestions server');
    }
    
    console.log('Server response:', data);
    
    if (!data.suggestions || !Array.isArray(data.suggestions)) {
      console.error('Unexpected response format:', data);
      throw new Error('Invalid response format from server');
    }
    console.log('Parsed suggestions:', data.suggestions);
    return data.suggestions;
  } catch (error: any) {
    console.error('Background suggestions error:', error);
    throw error;
  }
}

export async function generateSermonAngles(
  topic: string,
  scripture: string,
  length: string,
  audience: string
): Promise<SermonAngle[]> {
  try {
    const response = await fetch(`${SALT_SERVER_URL}/api/flavor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        topic,
        scripture,
        length,
        audience
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Sermon angles generation failed');
    }

    const data = await response.json();
    console.log('Server response:', JSON.stringify(data, null, 2));
    console.log('Response type:', typeof data);
    if (data) {
      console.log('Response keys:', Object.keys(data));
      console.log('Response values:', Object.values(data));
    }

    // Check if response is an array directly
    if (Array.isArray(data)) {
      console.log('Response is direct array');
      return data;
    }

    // Check if response has angles property
    if (data && Array.isArray(data.angles)) {
      console.log('Response has angles array');
      return data.angles;
    }

    // Try to find any array in the response
    if (data && typeof data === 'object') {
      for (const key of Object.keys(data)) {
        if (Array.isArray(data[key])) {
          console.log('Found array in key:', key);
          return data[key];
        }
      }
    }

    console.error('Unexpected response format:', typeof data, data);
    throw new Error('Invalid response format from server');
  } catch (error: any) {
    console.error('Sermon angles generation error:', error);
    throw error;
  }
}

export async function generateSermonOutline(
  topic: string,
  scripture: string,
  length: string,
  audience: string,
  chosenAngle: SermonAngle
): Promise<SermonOutlineResponse> {
  try {
    const response = await fetch(`${SALT_SERVER_URL}/api/flavor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        topic,
        scripture,
        length,
        audience,
        chosenAngle
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Sermon outline generation failed');
    }

    const data: SermonOutlineResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error('Sermon outline generation error:', error);
    throw error;
  }
}

export async function generateDepthResearch(
  research_topic: string
): Promise<string> {
  try {
    const response = await fetch(`${SALT_SERVER_URL}/api/depth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ research_topic })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Depth research generation failed');
    }

    const data: DepthResearchResponse = await response.json();
    return data.analysis;
  } catch (error: any) {
    console.error('Depth research generation error:', error);
    throw error;
  }
}

export async function generateAromaContent(
  params: AromaContentParams
): Promise<string> {
  try {
    const response = await fetch(`${SALT_SERVER_URL}/api/aroma`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Aroma content generation failed');
    }

    const data: AromaContentResponse = await response.json();
    return data.draft;
  } catch (error: any) {
    console.error('Sermon outline generation error:', error);
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
      credentials: 'include',
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
