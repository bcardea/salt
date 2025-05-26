import React, { useState, useEffect } from 'react';

interface ConceptProgressProps {
  startTime: number;
  sermonTitle: string;
}

const conceptTips = [
  "Reading and analyzing your sermon details...",
  "Identifying key themes and metaphors...",
  "Exploring visual symbolism opportunities...",
  "Crafting a compelling visual narrative...",
  "Balancing theological accuracy with artistic appeal...",
  "Refining the concept for maximum impact...",
  "Ensuring your message comes through clearly..."
];

const conceptSteps = [
  { label: "Analysis", duration: 3000 },
  { label: "Theme Extraction", duration: 3000 },
  { label: "Visual Mapping", duration: 3000 },
  { label: "Concept Refinement", duration: 4000 }
];

const ConceptProgress: React.FC<ConceptProgressProps> = ({
  startTime,
  sermonTitle
}) => {
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let stepStartTime = Date.now();
    let currentStepIndex = 0;

    const progressInterval = setInterval(() => {
      const now = Date.now();
      const stepElapsed = now - stepStartTime;
      const currentStepDuration = conceptSteps[currentStepIndex].duration;

      if (stepElapsed >= currentStepDuration) {
        // Move to next step
        currentStepIndex++;
        stepStartTime = now;

        if (currentStepIndex >= conceptSteps.length) {
          clearInterval(progressInterval);
          setProgress(99); // Leave a little room for completion
          return;
        }

        setCurrentStep(currentStepIndex);
      }

      // Calculate progress within current step
      const stepProgress = (stepElapsed / currentStepDuration) * 100;
      const overallProgress = (currentStepIndex * 100 / conceptSteps.length) +
        (stepProgress / conceptSteps.length);

      setProgress(Math.min(overallProgress, 99));
    }, 50);

    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % conceptTips.length);
    }, 4000);

    const timeInterval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(tipInterval);
      clearInterval(timeInterval);
    };
  }, [startTime]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center mr-4">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Generating Your Concept</h3>
          <p className="text-sm text-gray-500">Creating a unique visual concept for "{sermonTitle}"</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          {conceptSteps.map((step, index) => (
            <div
              key={step.label}
              className={`text-xs font-medium ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              {step.label}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current Tip */}
      <div className="text-sm text-gray-600 flex items-center">
        <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <p className="italic">{conceptTips[currentTip]}</p>
      </div>

      {/* Elapsed Time */}
      <div className="mt-3 text-xs text-gray-400 text-right">
        Time elapsed: {elapsedTime}s
      </div>
    </div>
  );
};

export default ConceptProgress;
