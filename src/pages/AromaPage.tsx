import React, { useState } from 'react';
import { Session } from '@supabase/supabase-js';
import Auth from '../components/Auth';
import SermonOutlineDisplay from '../components/SermonOutlineDisplay';
import { generateAromaContent } from '../services/saltServer';
import { saveTextGeneration } from '../services/database';

interface AromaPageProps {
  session: Session | null;
}

type GenerationStatus = 'idle' | 'generating' | 'complete' | 'error';

const aromaTypeOptions = [
  { value: 'social-facebook', label: 'Facebook Post' },
  { value: 'social-twitter', label: 'Twitter Post' },
  { value: 'social-instagram', label: 'Instagram Caption' },
  { value: 'email-newsletter', label: 'Email Newsletter' },
  { value: 'email-thankyou', label: 'Thank You Email' },
  { value: 'email-announcement', label: 'Announcement Email' },
  { value: 'event-description', label: 'Event Description' },
];

const AromaPage: React.FC<AromaPageProps> = ({ session }) => {
  const [type, setType] = useState(aromaTypeOptions[0].value);
  const [topic, setTopic] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [tone, setTone] = useState('');
  const [audience, setAudience] = useState('');
  
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!type || !topic || !keyPoints || !tone || !audience) {
      setError('Please fill in all fields.');
      return;
    }

    setStatus('generating');
    setError('');
    setIsLoading(true);
    setOutput('');

    try {
      const generatedOutput = await generateAromaContent({ type, topic, keyPoints, tone, audience });
      setOutput(generatedOutput);
      setStatus('complete');

      await saveTextGeneration({
        type: 'aroma',
        title: `Aroma Content: ${topic}`,
        inputs: { type, topic, keyPoints, tone, audience },
        content: generatedOutput
      });
    } catch (err) {
      setError('Failed to generate content. Please try again.');
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 space-y-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-96 h-96 bg-gradient-to-r from-secondary-400 to-[#f3a563] rounded-full filter blur-3xl animate-pulse"></div>
          </div>
          <div className="relative">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-secondary-600 tracking-wider uppercase bg-secondary-100 px-4 py-2 rounded-full">
                Outreach Content Tool
              </span>
            </div>
            <h1 className="text-6xl font-bold mb-4 young-serif">
              <span className="gradient-text">AROMA</span>
            </h1>
            <div className="max-w-2xl mx-auto">
              <p className="text-2xl text-gray-700 font-light leading-relaxed">
                Craft engaging content that
                <span className="font-semibold text-secondary-900"> spreads your message</span>
              </p>
              <div className="mt-2 flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
                  </svg>
                  Multi-platform
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                  Audience-tailored
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd"/>
                  </svg>
                  Ready to share
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Content Form */}
          <div className={`bg-white shadow-xl rounded-2xl p-8 border border-gray-100 transition-all duration-500 ${output ? 'opacity-75' : 'animate-fade-in'}`}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="group">
                <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                  Content Type
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="input-field group-hover:shadow-md transition-shadow duration-200 cursor-pointer"
                >
                  {aromaTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

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
                  placeholder="e.g., Sunday Service Recap"
                />
              </div>
              
              <div className="sm:col-span-2 group">
                <label htmlFor="key-points" className="block text-sm font-semibold text-gray-700 mb-2">
                  Key Points (one per line)
                </label>
                <textarea
                  id="key-points"
                  value={keyPoints}
                  onChange={(e) => setKeyPoints(e.target.value)}
                  rows={3}
                  className="input-field group-hover:shadow-md transition-shadow duration-200 resize-none"
                  placeholder="e.g., Main scripture was John 3:16&#10;Next week's service is at 10am"
                />
                <p className="mt-2 text-sm text-gray-500">Enter each key point on a new line for better organization</p>
              </div>

              <div className="group">
                <label htmlFor="tone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Tone
                </label>
                <input
                  type="text"
                  id="tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="input-field group-hover:shadow-md transition-shadow duration-200"
                  placeholder="e.g., Encouraging, Informative"
                />
              </div>

              <div className="group">
                <label htmlFor="audience" className="block text-sm font-semibold text-gray-700 mb-2">
                  Audience
                </label>
                <input
                  type="text"
                  id="audience"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="input-field group-hover:shadow-md transition-shadow duration-200"
                  placeholder="e.g., Church members, New visitors"
                />
              </div>

              <div className="col-span-2 flex justify-end mt-4">
                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !topic || !keyPoints || !tone || !audience}
                  className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
                >
                  {isLoading ? (
                    <>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-wave" style={{ animationDelay: '0ms', animationDuration: '1.4s' }}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-wave" style={{ animationDelay: '200ms', animationDuration: '1.4s' }}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-wave" style={{ animationDelay: '400ms', animationDuration: '1.4s' }}></div>
                      </div>
                      <span>Creating Content</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span>Generate Content</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Generated Content */}
          {status === 'complete' && output && (
            <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 animate-fade-in">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 young-serif">Your Generated Content</h2>
                  <p className="text-gray-600 mt-2">{aromaTypeOptions.find(o => o.value === type)?.label} ready to share</p>
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
                  content={output}
                  title={`${aromaTypeOptions.find(o => o.value === type)?.label}: ${topic}`}
                />
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => {
                    setTopic('');
                    setKeyPoints('');
                    setTone('');
                    setAudience('');
                    setOutput('');
                    setStatus('idle');
                  }}
                  className="text-secondary-600 hover:text-secondary-800 font-medium flex items-center transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create More Content
                </button>
              </div>
            </div>
          )}

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

export default AromaPage;