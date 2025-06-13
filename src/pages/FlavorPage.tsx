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
  const [loadingMessage, setLoadingMessage] = useState('');
  const [loadingIntervalId, setLoadingIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);

  const outlineLoadingMessages = [
    "Connecting with the Divine Spark...",
    "Weaving Wisdom from Your Angle...",
    "Structuring the Sacred Narrative...",
    "Infusing Scriptural Depth...",
    "Crafting Compelling Points...",
    "Polishing the Flow of Revelation...",
    "Almost Ready to Inspire!"
  ];

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

    // Clear any existing interval from previous attempts
    if (loadingIntervalId) {
      clearInterval(loadingIntervalId);
    }

    let messageIndex = 0;
    setLoadingMessage(outlineLoadingMessages[messageIndex]);

    const intervalId = setInterval(() => {
      messageIndex = (messageIndex + 1) % outlineLoadingMessages.length;
      setLoadingMessage(outlineLoadingMessages[messageIndex]);
    }, 7000); // Change message every 7 seconds
    setLoadingIntervalId(intervalId);

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
    } finally {
      if (intervalId) {
        clearInterval(intervalId);
      }
      setLoadingIntervalId(null);
      // Optionally reset loadingMessage here or let it persist until next generation
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-secondary-50/30 to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-96 h-96 bg-gradient-to-r from-secondary-400 to-[#f3a563] rounded-full filter blur-3xl animate-pulse"></div>
          </div>
          <div className="relative">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-secondary-600 tracking-wider uppercase bg-secondary-100 px-4 py-2 rounded-full">
                Sermon Creation Tool
              </span>
            </div>
            <h1 className="text-6xl font-bold mb-4 young-serif">
              <span className="gradient-text">FLAVOR</span>
            </h1>
            <div className="max-w-2xl mx-auto">
              <p className="text-2xl text-gray-700 font-light leading-relaxed">
                Transform your ideas into 
                <span className="font-semibold text-secondary-900"> impactful sermons</span>
              </p>
              <div className="mt-2 flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                  </svg>
                  Audience-focused
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  Time-conscious
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                  </svg>
                  Scripture-based
                </span>
              </div>
            </div>
          </div>
        </div>

        <StepIndicator
          currentStep={currentStep}
          steps={['Initial Details', 'Choose Angle', 'Final Outline']}
        />

        <div className="space-y-8">
          {/* Step 1: Initial Form */}
          <div className={`transition-all duration-500 ${currentStep !== 1 ? 'hidden h-0' : 'animate-fade-in'}`}>
            <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="group">
                  <label htmlFor="topic" className="block text-sm font-semibold text-gray-700 mb-2">
                    Topic
                  </label>
                  <input
                    type="text"
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="input-field group-hover:shadow-md transition-shadow duration-200"
                    placeholder="e.g., The Prodigal Son"
                    autoFocus
                  />
                </div>

                <div className="group">
                  <label htmlFor="scripture" className="block text-sm font-semibold text-gray-700 mb-2">
                    Scripture Reference
                  </label>
                  <input
                    type="text"
                    id="scripture"
                    value={scripture}
                    onChange={(e) => setScripture(e.target.value)}
                    className="input-field group-hover:shadow-md transition-shadow duration-200"
                    placeholder="e.g., Luke 15:11-32"
                  />
                </div>

                <div className="col-span-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="group">
                    <label htmlFor="length" className="block text-sm font-semibold text-gray-700 mb-2">
                      Length
                    </label>
                    <select
                      id="length"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="input-field group-hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    >
                      {lengthOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="group">
                    <label htmlFor="audience" className="block text-sm font-semibold text-gray-700 mb-2">
                      Target Audience
                    </label>
                    <select
                      id="audience"
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      className="input-field group-hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    >
                      {audienceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-span-2 flex justify-end mt-4">
                  <button
                    onClick={handleGenerateAngles}
                    disabled={status === 'generating-angles' || isLoading}
                    className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
                  >
                    {(status === 'generating-angles' || isLoading) ? (
                      <>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-wave" style={{ animationDelay: '0ms', animationDuration: '1.4s' }}></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-wave" style={{ animationDelay: '200ms', animationDuration: '1.4s' }}></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-wave" style={{ animationDelay: '400ms', animationDuration: '1.4s' }}></div>
                        </div>
                        <span>Generating Angles</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Generate Angles</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Angle Selection */}
          <div className={`transition-all duration-500 ${currentStep !== 2 ? 'hidden h-0' : 'animate-fade-in'}`}>
            {angles.length > 0 && (
              <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 young-serif">Choose Your Angle</h2>
                  <p className="text-gray-600 mt-2">Select the perspective that best resonates with your message</p>
                </div>
                <div className="space-y-4">
                  {angles.map((angle, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedAngle(angle)}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                        selectedAngle === angle
                          ? 'border-secondary-500 bg-gradient-to-r from-secondary-50 to-[#f3a563]/10 shadow-lg'
                          : 'border-gray-200 hover:border-secondary-300 hover:shadow-md bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{angle.title}</h3>
                          <p className="text-gray-700 leading-relaxed">{angle.coreSummary}</p>
                          <p className="text-gray-500 mt-3 text-sm italic flex items-center">
                            <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                            </svg>
                            {angle.journey}
                          </p>
                        </div>
                        {selectedAngle === angle && (
                          <div className="ml-4 flex-shrink-0">
                            <div className="w-6 h-6 bg-secondary-500 rounded-full flex items-center justify-center animate-scale-in">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-8">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-gray-600 hover:text-gray-900 font-medium flex items-center transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Details
                  </button>
                  <button
                    onClick={handleGenerateOutline}
                    disabled={!selectedAngle || status === 'generating-outline'}
                    className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {status === 'generating-outline' ? (
                      <>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-wave" style={{ animationDelay: '0ms', animationDuration: '1.4s' }}></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-wave" style={{ animationDelay: '200ms', animationDuration: '1.4s' }}></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-wave" style={{ animationDelay: '400ms', animationDuration: '1.4s' }}></div>
                        </div>
                        <span>{loadingMessage || 'Creating Outline...'}</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Generate Outline</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Final Outline */}
          <div className={`transition-all duration-500 ${currentStep !== 3 ? 'hidden h-0' : 'animate-fade-in'}`}>
            {outline && (
              <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 young-serif">Your Sermon Outline</h2>
                    <p className="text-gray-600 mt-2">Ready to inspire your congregation</p>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 transition-all duration-200 hover:shadow-md"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy to Clipboard
                  </button>
                </div>

                <div className="mt-6">
                  <SermonOutlineDisplay 
                    content={outline}
                    title={selectedAngle?.title || 'Sermon Outline'}
                    imageUrl={outlineImage}
                  />
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setAngles([]);
                      setSelectedAngle(null);
                      setOutline('');
                      setOutlineImage('');
                    }}
                    className="text-secondary-600 hover:text-secondary-800 font-medium flex items-center transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Another Sermon
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Error Display */}
          {error && (
            <div className="fixed bottom-4 right-4 p-4 bg-red-50 rounded-xl shadow-xl border border-red-200 max-w-md z-50 animate-fade-in">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
                <div className="ml-auto pl-3">
                  <button
                    onClick={() => setError('')}
                    className="inline-flex text-red-400 hover:text-red-500 focus:outline-none"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlavorPage;