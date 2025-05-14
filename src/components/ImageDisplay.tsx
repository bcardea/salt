import React, { useState, useEffect } from 'react';
import { Download, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { downloadImage } from '../utils/downloadHelper';

interface ImageDisplayProps {
  imageUrl: string;
  status: 'idle' | 'generating-prompt' | 'generating-image' | 'complete' | 'error';
  onRegenerate: () => void;
}

const loadingMessages = [
  "Cooking up your design...",
  "Mixing the perfect colors...",
  "Adding that special touch...",
  "Making it pixel perfect...",
  "Almost there...",
  "Putting on the finishing touches..."
];

const LoadingState: React.FC<{ step: 'prompt' | 'image' }> = ({ step }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (step === 'image') {
      const interval = setInterval(() => {
        setMessageIndex((current) => (current + 1) % loadingMessages.length);
      }, 4000); // Change message every 4 seconds

      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="w-16 h-16 mb-4 relative">
        <div className="absolute inset-0 rounded-full bg-primary-100 animate-pulse"></div>
        {step === 'prompt' ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-8 h-8 text-primary-600 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-primary-600 animate-pulse" />
          </div>
        )}
      </div>
      <h3 className="text-xl font-semibold text-secondary-900 mb-2">
        {step === 'prompt' ? 'Creating Concept' : loadingMessages[messageIndex]}
      </h3>
      <p className="text-secondary-600 text-center">
        {step === 'prompt' 
          ? 'Our AI is crafting the perfect concept for your sermon...' 
          : 'This usually takes about 90 seconds...'}
      </p>
      <div className="mt-6 w-full max-w-xs">
        <div className="w-full bg-secondary-100 rounded-full h-2">
          <div 
            className="bg-primary-500 h-2 rounded-full transition-all duration-1000 ease-in-out"
            style={{ 
              width: step === 'prompt' ? '30%' : `${((messageIndex + 1) / loadingMessages.length) * 100}%`
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-secondary-50">
      <div className="rounded-full bg-secondary-100 p-4 mb-4">
        <ImageIcon className="h-10 w-10 text-secondary-400" />
      </div>
      <h3 className="text-xl font-semibold text-secondary-700 mb-2">No Image Generated Yet</h3>
      <p className="text-secondary-500 text-center">
        Enter your sermon details to generate a custom image
      </p>
    </div>
  );
};

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, status, onRegenerate }) => {
  const handleDownload = async () => {
    if (imageUrl) {
      try {
        await downloadImage(imageUrl, 'sermon-artwork.png');
      } catch (error) {
        console.error('Failed to download image:', error);
      }
    }
  };

  // Render loading states
  if (status === 'generating-prompt') {
    return <LoadingState step="prompt" />;
  }
  
  if (status === 'generating-image') {
    return <LoadingState step="image" />;
  }
  
  // Render empty state when no image
  if (status === 'idle' || !imageUrl) {
    return <EmptyState />;
  }
  
  // Render the image with actions
  return (
    <div className="relative">
      <div className="aspect-w-16 aspect-h-9 w-full">
        <img 
          src={imageUrl} 
          alt="Generated sermon artwork" 
          className="w-full h-full object-cover animate-fade-in"
          width="100%"
          height="auto"
        />
      </div>
      
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex justify-end space-x-2">
          <button 
            onClick={onRegenerate}
            className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            aria-label="Regenerate image"
          >
            <RefreshCw className="h-5 w-5 text-secondary-800" />
          </button>
          
          <button 
            onClick={handleDownload}
            className="p-2 bg-primary-600 rounded-full hover:bg-primary-700 transition-colors"
            aria-label="Download image"
          >
            <Download className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;