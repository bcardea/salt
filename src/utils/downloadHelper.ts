/**
 * Downloads an image from a URL
 * @param url The URL of the image to download
 * @param filename The filename to save the image as
 */
export const downloadImage = (url: string, filename: string): void => {
  // Create a temporary anchor element
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  // Append to the document
  document.body.appendChild(link);
  
  // Trigger download
  link.click();
  
  // Clean up
  document.body.removeChild(link);
};