import React from 'react';
import { Download, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { downloadImage } from '../utils/downloadHelper';

interface ImageDisplayProps {
  imageUrl: string;
  status: 'idle' | 'generating-prompt' | 'generating-image' | 'complete' | 'error';
  onRegenerate: () => void;
}

const LoadingState: React.FC<{ step: 'prompt' | 'image' }> = ({ step }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="w-16 h-16 mb-4 relative">
        <div className="absolute inset-0 rounded-full bg-primary-100 animate-pulse"></div>
        {step === 'prompt' ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0-11V3"></path>
            </svg>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-primary-600" />
          </div>
        )}
      </div>
      <h3 className="text-xl font-semibold text-secondary-900 mb-2">
        {step === 'prompt' ? 'Creating Concept' : 'Generating Image'}
      </h3>
      <p className="text-secondary-600 text-center">
        {step === 'prompt' 
          ? 'Our AI is crafting the perfect concept for your sermon...' 
          : 'Creating your custom sermon artwork...'}
      </p>
      <div className="mt-4 w-full max-w-xs bg-secondary-100 rounded-full h-2.5 overflow-hidden">
        <div className="bg-primary-500 h-2.5 rounded-full animate-pulse-slow" style={{ width: '70%' }}></div>
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
  const handleDownload = () => {
    if (imageUrl) {
      downloadImage(imageUrl, 'sermon-artwork.png');
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