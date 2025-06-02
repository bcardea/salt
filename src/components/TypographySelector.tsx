import React from 'react';
import { motion } from 'framer-motion';

interface TypographySelectorProps {
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
  isLoading?: boolean;
}

const TypographySelector: React.FC<TypographySelectorProps> = ({
  options,
  selectedOption,
  onSelect,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="aspect-video bg-secondary-100 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((url, index) => (
        <motion.button
          key={url}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(url)}
          className={`relative aspect-video rounded-lg overflow-hidden ${
            selectedOption === url
              ? 'ring-2 ring-primary-500'
              : 'hover:ring-2 hover:ring-primary-200'
          }`}
        >
          <img
            src={url}
            alt={`Typography Option ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {selectedOption === url && (
            <div className="absolute top-2 right-2 bg-primary-500 text-white rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </motion.button>
      ))}
    </div>
  );
};

export default TypographySelector;
