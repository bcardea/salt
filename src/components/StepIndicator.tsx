import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
  steps?: string[];
}

const defaultSteps = [
  'Enter Text',
  'Choose Typography',
  'Describe Background',
  'Final Result'
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps = 4, steps: customSteps }) => {
  const steps = (customSteps || defaultSteps.slice(0, totalSteps)).map((label, index) => ({
    number: index + 1,
    label,
  }));

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center space-x-2 md:space-x-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  currentStep >= step.number
                    ? 'bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] text-white scale-110 shadow-lg'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {currentStep > step.number ? (
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span className={`text-xs mt-2 hidden md:block ${
                currentStep >= step.number ? 'text-gray-900 font-medium' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 md:w-16 h-0.5 transition-all duration-300 ${
                currentStep > step.number ? 'bg-[#345A7C]' : 'bg-gray-300'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;