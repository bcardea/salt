import React, { useState, useMemo } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StylePreset } from '../constants/stylePresets';

interface StylePresetCarouselProps {
  presets: StylePreset[];
  selectedStyle?: StylePreset;
  onStyleSelect: (style: StylePreset) => void;
  disabled?: boolean;
}

const StylePresetCarousel: React.FC<StylePresetCarouselProps> = ({
  presets,
  selectedStyle,
  onStyleSelect,
  disabled = false
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const [hoveredStyle, setHoveredStyle] = useState<StylePreset | undefined>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Extract unique categories from presets
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    presets.forEach(preset => {
      preset.categories?.forEach(category => uniqueCategories.add(category));
    });
    return ['all', ...Array.from(uniqueCategories)];
  }, [presets]);

  // Filter presets based on selected category
  const filteredPresets = useMemo(() => {
    if (selectedCategory === 'all') return presets;
    return presets.filter(preset => 
      preset.categories?.includes(selectedCategory)
    );
  }, [presets, selectedCategory]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const onSelect = () => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  };

  React.useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  React.useEffect(() => {
    emblaApi?.reInit();
  }, [filteredPresets, emblaApi]);

  return (
    <div className="relative">
      {/* Category Filter */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            disabled={disabled}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${selectedCategory === category
                ? 'bg-secondary-900 text-white'
                : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
              }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev || disabled}
        className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 p-2 rounded-full bg-white shadow-md text-secondary-600 hover:text-secondary-900 transition-colors ${
          !canScrollPrev || disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={scrollNext}
        disabled={!canScrollNext || disabled}
        className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 p-2 rounded-full bg-white shadow-md text-secondary-600 hover:text-secondary-900 transition-colors ${
          !canScrollNext || disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {filteredPresets.map((style) => (
            <div
              key={style.id}
              className="flex-none w-64"
            >
              <button
                onClick={() => onStyleSelect(style)}
                onMouseEnter={() => setHoveredStyle(style)}
                onMouseLeave={() => setHoveredStyle(undefined)}
                className={`w-full h-full p-4 rounded-lg border transition-all ${
                  disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary-500'
                } ${
                  selectedStyle?.id === style.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-secondary-200 bg-white'
                }`}
                disabled={disabled}
              >
                <div className="aspect-video mb-4 overflow-hidden rounded-md">
                  <img
                    src={style.previewUrl}
                    alt={style.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-secondary-900">{style.title}</h3>
                  <p className="text-sm text-secondary-600 mt-1">{style.description}</p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {hoveredStyle && (
        <div 
          className="absolute left-0 right-0 z-50 flex justify-center pointer-events-none mt-4"
        >
          <div className="bg-white rounded-lg shadow-xl overflow-hidden w-[400px]">
            <img
              src={hoveredStyle.previewUrl}
              alt={`${hoveredStyle.title} preview`}
              className="w-full h-auto"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{hoveredStyle.title}</h3>
              <p className="text-sm text-secondary-600">{hoveredStyle.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StylePresetCarousel;