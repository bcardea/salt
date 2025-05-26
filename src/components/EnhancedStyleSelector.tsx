import React, { useState, useMemo, useRef, useEffect } from 'react';
import { StylePreset } from '../services/imageGeneration';

interface EnhancedStyleSelectorProps {
  presets: StylePreset[];
  selectedStyle?: StylePreset;
  onStyleSelect: (style: StylePreset) => void;
  disabled?: boolean;
}

const EnhancedStyleSelector: React.FC<EnhancedStyleSelectorProps> = ({
  presets,
  selectedStyle,
  onStyleSelect,
  disabled = false
}) => {
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Force component to re-render when all images are loaded
  const [forceRender, setForceRender] = useState(0);

  // Preload all images when component mounts or presets change
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = presets.map((preset) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setImagesLoaded((prev) => {
              const newSet = new Set(prev);
              newSet.add(preset.id);
              return newSet;
            });
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load image for preset ${preset.id}`);
            resolve();
          };
          img.src = preset.previewUrl;
        });
      });

      await Promise.all(imagePromises);
      // Force a re-render after all images are loaded
      setForceRender(prev => prev + 1);
    };

    loadImages();
  }, [presets]);

  // Get categorized and grouped categories
  const categoryGroups = useMemo(() => {
    const allCategories = presets.flatMap(preset => preset.categories || []);
    const uniqueCategories = Array.from(new Set(allCategories));
    
    // Define category groups
    const groups = [
      {
        name: 'Style',
        categories: uniqueCategories.filter(cat => [
          'minimal', 'modern', 'vintage', 'retro', 'pop-art', 'editorial'
        ].includes(cat))
      },
      {
        name: 'Theme',
        categories: uniqueCategories.filter(cat => [
          'spiritual', 'sacred', 'worship', 'ministry', 'devotional'
        ].includes(cat))
      },
      {
        name: 'Mood',
        categories: uniqueCategories.filter(cat => [
          'bold', 'playful', 'hopeful', 'joyful', 'gritty'
        ].includes(cat))
      },
      {
        name: 'Visual',
        categories: uniqueCategories.filter(cat => [
          'illustrative', 'photoreal', 'abstract', 'tropical', 'desert', 'floral'
        ].includes(cat))
      }
    ];

    // Add remaining categories to 'Other'
    const categorizedItems = new Set(groups.flatMap(g => g.categories));
    const otherCategories = uniqueCategories.filter(cat => !categorizedItems.has(cat));
    if (otherCategories.length > 0) {
      groups.push({
        name: 'Other',
        categories: otherCategories
      });
    }

    return groups;
  }, [presets]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter presets by selected category
  const filteredPresets = useMemo(() => {
    if (selectedCategory === 'all') return presets;
    return presets.filter(preset => preset.categories?.includes(selectedCategory));
  }, [presets, selectedCategory]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>, presetId: string) => {
    const img = e.target as HTMLImageElement;
    img.style.opacity = '1';
    setImagesLoaded(prev => {
      const newSet = new Set(prev);
      newSet.add(presetId);
      return newSet;
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, presetId: string) => {
    console.error(`Failed to load image for preset ${presetId}`);
    const img = e.target as HTMLImageElement;
    img.style.opacity = '1'; // Show anyway to prevent stuck loading state
  };

  return (
    <div className="w-full space-y-6" key={forceRender}>
      {/* Category Filter Dropdown */}
      <div className="relative w-full" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-between gap-2 hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Style Filter:
            </span>
            <span className="px-2 py-0.5 bg-[#345A7C] text-white text-sm font-medium rounded-full">
              {selectedCategory === 'all' ? 'All Styles' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
            </span>
          </div>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute z-10 w-full sm:w-72 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <div className="p-2">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setIsDropdownOpen(false);
                }}
                className={`w-full px-4 py-2 text-left rounded-md text-sm font-medium ${selectedCategory === 'all'
                  ? 'bg-[#345A7C] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Styles
              </button>
            </div>

            {categoryGroups.map((group) => (
              <div key={group.name} className="border-t border-gray-100">
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                  {group.name}
                </div>
                <div className="p-2">
                  {group.categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left rounded-md text-sm font-medium ${selectedCategory === category
                        ? 'bg-[#345A7C] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Style Grid */}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => !disabled && onStyleSelect(preset)}
              onMouseEnter={() => setHoveredStyle(preset.id)}
              onMouseLeave={() => setHoveredStyle(null)}
              disabled={disabled}
              className={`relative group overflow-hidden rounded-xl transition-all duration-300 transform bg-gray-100 aspect-[4/3] ${
                selectedStyle?.id === preset.id
                  ? 'ring-4 ring-[#345A7C] scale-[1.02] shadow-xl'
                  : 'hover:scale-[1.02] hover:shadow-lg'
              } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            >
              {/* Image container with fixed aspect ratio */}
              <div className="absolute inset-0 w-full h-full">
                {/* Background placeholder - always visible */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
                
                {/* Actual image */}
                <img
                  src={preset.previewUrl}
                  alt={preset.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ 
                    opacity: imagesLoaded.has(preset.id) ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                  onLoad={(e) => handleImageLoad(e, preset.id)}
                  onError={(e) => handleImageError(e, preset.id)}
                  loading="eager"
                />
              </div>
              
              {/* Overlay gradient */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${
                hoveredStyle === preset.id || selectedStyle?.id === preset.id ? 'opacity-100' : 'opacity-80'
              }`} />
              
              {/* Selected indicator */}
              {selectedStyle?.id === preset.id && (
                <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg animate-scale-in">
                  <svg className="w-5 h-5 text-[#345A7C]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                <h4 className="text-lg font-semibold mb-1">{preset.title}</h4>
                <p className="text-sm opacity-90 line-clamp-2">{preset.description}</p>
              </div>
              
              {/* Hover effect */}
              {hoveredStyle === preset.id && selectedStyle?.id !== preset.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 animate-fade-in z-20">
                  <span className="px-4 py-2 bg-white text-gray-900 rounded-lg font-medium shadow-lg">
                    Select Style
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-gray-500">
          Images loaded: {imagesLoaded.size}/{presets.length}
        </div>
      )}
    </div>
  );
};

export default EnhancedStyleSelector;
