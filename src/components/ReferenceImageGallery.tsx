import React from 'react';
import { ReferenceImage } from '../constants/referenceImages';

interface ReferenceImageGalleryProps {
  images: ReferenceImage[];
  selectedImages: ReferenceImage[];
  onSelectionChange: (images: ReferenceImage[]) => void;
  disabled?: boolean;
}

const ReferenceImageGallery: React.FC<ReferenceImageGalleryProps> = ({
  images,
  selectedImages,
  onSelectionChange,
  disabled = false
}) => {
  const toggleImage = (image: ReferenceImage) => {
    if (disabled) return;
    
    const isSelected = selectedImages.some(img => img.id === image.id);
    if (isSelected) {
      onSelectionChange(selectedImages.filter(img => img.id !== image.id));
    } else {
      onSelectionChange([...selectedImages, image]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="text-sm text-secondary-600">
        {selectedImages.length === 0 ? (
          'Select reference images to guide the style (optional)'
        ) : (
          `${selectedImages.length} image${selectedImages.length === 1 ? '' : 's'} selected`
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => {
          const isSelected = selectedImages.some(img => img.id === image.id);
          return (
            <button
              key={image.id}
              onClick={() => toggleImage(image)}
              disabled={disabled}
              className={`group relative aspect-video rounded-lg overflow-hidden transition-all ${
                disabled ? 'opacity-50 cursor-not-allowed' : 'hover:ring-2 hover:ring-primary-500'
              } ${isSelected ? 'ring-2 ring-primary-500' : ''}`}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:opacity-100 flex flex-col justify-end p-3 text-left text-white">
                <div className="font-medium text-sm">{image.title}</div>
                <div className="text-xs opacity-90">{image.description}</div>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2 bg-primary-500 text-white rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ReferenceImageGallery;
