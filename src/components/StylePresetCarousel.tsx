import React, { useState } from 'react';
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

  return (
    <div className="relative">
      {/* Preview Modal */}
      {hoveredStyle && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-96 opacity-100 scale-100 transition-all duration-200 z-50">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
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
        <div className="flex gap-4 py-4">
          {presets.map((style) => (
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
    </div>
  );
};

export default StylePresetCarousel;