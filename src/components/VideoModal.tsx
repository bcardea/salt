import React from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative z-10 w-full max-w-4xl mx-4">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
          aria-label="Close video"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full"
            controls
            autoPlay
            src={videoUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};