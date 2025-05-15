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