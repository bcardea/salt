import React, { useState, useEffect } from 'react';
import { StylePreset } from '../services/imageGeneration';

interface GenerationProgressProps {
  startTime: number;
  sermonTitle: string;
  stylePreset?: StylePreset;
}

const tips = [
  "AI is analyzing your sermon theme and creating unique visual metaphors...",
  "Incorporating theological symbolism into your artwork...",
  "Balancing composition and color theory for maximum impact...",
  "Adding final touches to ensure your message shines through...",
  "Creating artwork that will resonate with your congregation...",
  "Applying artistic principles to enhance spiritual messaging...",
  "Generating high-resolution artwork for all your needs...",
  "Finalizing details to create a truly meaningful image..."
];

const GenerationProgress: React.FC<GenerationProgressProps> = ({
  startTime,
  sermonTitle,
  stylePreset
}) => {
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 - prev) * 0.02; // Exponential slowdown
        return newProgress > 99 ? 99 : newProgress;
      });
    }, 500);

    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 6000);

    const timeInterval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(tipInterval);
      clearInterval(timeInterval);
    };
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center z-50">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Main content */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
            Creating Your Sermon Artwork
          </h2>
          <p className="text-lg text-gray-300 mb-2">
            "{sermonTitle}"
          </p>
          {stylePreset && (
            <p className="text-sm text-gray-400">
              Style: {stylePreset.name}
            </p>
          )}
        </div>

        {/* Progress ring */}
        <div className="relative w-48 h-48 mx-auto mb-12">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-700"
            />
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
              className="text-white transition-all duration-500 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white">{Math.floor(progress)}%</span>
            <span className="text-sm text-gray-400 mt-1">{formatTime(elapsedTime)}</span>
          </div>
        </div>

        {/* Loading dots animation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-white rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="h-16">
          <p className="text-gray-300 animate-fade-in-out italic">
            {tips[currentTip]}
          </p>
        </div>

        {/* Time estimate */}
        <div className="mt-8 text-sm text-gray-500">
          Estimated time remaining: {Math.max(90 - elapsedTime, 0)} seconds
        </div>
      </div>

      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#345A7C] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#A1C1D7] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>
    </div>
  );
};

export default GenerationProgress;