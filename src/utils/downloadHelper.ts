/**
 * Downloads an image from a URL
 * @param url The URL of the image to download
 * @param filename The filename to save the image as
 */
export const downloadImage = async (url: string, filename: string): Promise<void> => {
  try {
    // Fetch the image
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch image');
    
    // Get the blob
    const blob = await response.blob();
    
    // Create object URL
    const objectUrl = URL.createObjectURL(blob);
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    
    // Append to the document
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error('Error downloading image:', error);
    throw new Error('Failed to download image');
  }
};

/**
 * Converts a URL to a File object
 * @param url The URL to convert to a File
 * @returns A Promise that resolves to a File object
 */
export const urlToFile = async (url: string): Promise<File> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch image');
    
    const blob = await response.blob();
    return new File([blob], 'reference.jpg', { type: blob.type });
  } catch (error) {
    console.error('Error converting URL to File:', error);
    throw new Error('Failed to convert URL to File');
  }
};