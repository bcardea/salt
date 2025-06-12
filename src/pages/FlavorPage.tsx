import React, { useState } from 'react';
import { Session } from '@supabase/supabase-js';
import Auth from '../components/Auth';
import StepIndicator from '../components/StepIndicator';
import SermonOutlineDisplay from '../components/SermonOutlineDisplay';
import { generateSermonAngles, generateSermonOutline } from '../services/saltServer';
import { saveTextGeneration } from '../services/database';

interface SermonAngle {
  title: string;
  coreSummary: string;
  journey: string;
}

interface FlavorPageProps {
  session: Session | null;
}

type GenerationStatus = 'idle' | 'generating-angles' | 'generating-outline' | 'complete' | 'error';

const audienceOptions = [
  'Gen-Z',
  'Young Adults',
  'Middle-aged',
  'Senior',
  'Kids',
  'General Congregation'
];

const lengthOptions = [
  '15 minutes',
  '20 minutes',
  '30 minutes',
  '45 minutes'
];

const FlavorPage: React.FC<FlavorPageProps> = ({ session }) => {
  // Form states
  const [topic, setTopic] = useState('');
  const [scripture, setScripture] = useState('');
  const [length, setLength] = useState(lengthOptions[0]);
  const [audience, setAudience] = useState(audienceOptions[0]);
  
  // Generation states
  const [angles, setAngles] = useState<SermonAngle[]>([]);
  const [selectedAngle, setSelectedAngle] = useState<SermonAngle | null>(null);
  const [outline, setOutline] = useState<string>('');
  const [outlineImage, setOutlineImage] = useState<string>('');
  
  // UI states
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateAngles = async () => {
    if (!topic || !scripture || !length || !audience) {
      setError('Please fill in all fields');
      return;
    }

    setStatus('generating-angles');
    setError('');
    setIsLoading(true);

    try {
      const generatedAngles = await generateSermonAngles(topic, scripture, length, audience);
      setAngles(generatedAngles);
      setCurrentStep(2);

      // Save the angles to the database
      await saveTextGeneration({
        type: 'flavor',
        title: `Sermon Angles: ${topic}`,
        inputs: { topic, scripture, length, audience },
        content: JSON.stringify(generatedAngles, null, 2)
      });
    } catch (err) {
      setError('Failed to generate sermon angles. Please try again.');
      setStatus('error');
    } finally {
      setIsLoading(false);
      setStatus('idle');
    }
  };

  const handleGenerateOutline = async () => {
    if (!selectedAngle) {
      setError('Please select an angle first');
      return;
    }

    setStatus('generating-outline');
    setError('');

    try {
      const response = await generateSermonOutline(
        topic,
        scripture,
        length,
        audience,
        selectedAngle
      );
      setOutline(response.outline);
      setOutlineImage(response.imageUrl);
      setCurrentStep(3);

      // Save the outline to the database
      await saveTextGeneration({
        type: 'flavor',
        title: `Sermon Outline: ${selectedAngle.title}`,
        inputs: { topic, scripture, length, audience, selectedAngle },
        content: response.outline
      });
      setStatus('complete');
    } catch (err) {
      setError('Failed to generate sermon outline. Please try again.');
      setStatus('error');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outline);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Auth />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Flavor</h1>
          <p className="text-lg text-gray-600">Transform your ideas into impactful sermons</p>
        </div>

        <StepIndicator
          currentStep={currentStep}
          steps={['Initial Details', 'Choose Angle', 'Final Outline']}
        />

        <div className="space-y-8">
          {/* Step 1: Initial Form */}
          <div className={`transition-all duration-300 ${currentStep !== 1 ? 'hidden h-0' : ''}`}>
            <div className="bg-white shadow sm:rounded-lg p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
                    Topic
                  </label>
                  <input
                    type="text"
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="e.g., The Prodigal Son"
                    autoFocus
                  />
                </div>

                <div>
                  <label htmlFor="scripture" className="block text-sm font-medium text-gray-700">
                    Scripture Reference
                  </label>
                  <input
                    type="text"
                    id="scripture"
                    value={scripture}
                    onChange={(e) => setScripture(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="e.g., Luke 15:11-32"
                  />
                </div>

                <div className="col-span-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="length" className="block text-sm font-medium text-gray-700">
                      Length
                    </label>
                    <select
                      id="length"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      {lengthOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="audience" className="block text-sm font-medium text-gray-700">
                      Target Audience
                    </label>
                    <select
                      id="audience"
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      {audienceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-2 flex justify-end">
                  <button
                    onClick={handleGenerateAngles}
                    disabled={status === 'generating-angles' || isLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {(status === 'generating-angles' || isLoading) ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : 'Generate Angles'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Angle Selection */}
          <div className={`transition-all duration-300 ${currentStep !== 2 ? 'hidden h-0' : ''}`}>
            {angles.length > 0 && (
              <div className="bg-white shadow sm:rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Angle</h2>
                <div className="space-y-4">
                  {angles.map((angle, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedAngle(angle)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedAngle === angle
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-200'
                      }`}
                    >
                      <h3 className="text-lg font-semibold text-gray-900">{angle.title}</h3>
                      <p className="text-gray-600 mt-1">{angle.coreSummary}</p>
                      <p className="text-gray-500 mt-2 text-sm italic">{angle.journey}</p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleGenerateOutline}
                    disabled={!selectedAngle || status === 'generating-outline' || isLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {(status === 'generating-outline' || isLoading) ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Generating...
                      </>
                    ) : 'Generate Outline'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Final Outline */}
          <div className={`transition-all duration-300 ${currentStep !== 3 ? 'hidden h-0' : ''}`}>
            {outline && (
              <div className="bg-white shadow sm:rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Your Sermon Outline</h2>
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Copy to Clipboard
                  </button>
                </div>

                <div className="mt-4">
                  <SermonOutlineDisplay 
                    content={outline}
                    title={selectedAngle?.title || 'Sermon Outline'}
                    imageUrl={outlineImage}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="fixed bottom-4 right-4 p-4 bg-red-50 rounded-md shadow-lg border border-red-100 max-w-md z-50">
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlavorPage;
