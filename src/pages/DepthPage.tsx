import React, { useState } from 'react';
import { Session } from '@supabase/supabase-js';
import Auth from '../components/Auth';
import SermonOutlineDisplay from '../components/SermonOutlineDisplay';
import { generateDepthResearch } from '../services/saltServer';
import { saveTextGeneration } from '../services/database';

interface DepthPageProps {
  session: Session | null;
}

type GenerationStatus = 'idle' | 'generating' | 'complete' | 'error';

const DepthPage: React.FC<DepthPageProps> = ({ session }) => {
  const [researchTopic, setResearchTopic] = useState('');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!researchTopic) {
      setError('Please enter a research topic.');
      return;
    }

    setStatus('generating');
    setError('');
    setIsLoading(true);
    setOutput('');

    try {
      const generatedOutput = await generateDepthResearch(researchTopic);
      setOutput(generatedOutput);
      setStatus('complete');

      await saveTextGeneration({
        type: 'depth',
        title: `Depth Research: ${researchTopic}`,
        inputs: { research_topic: researchTopic },
        content: generatedOutput
      });
    } catch (err) {
      setError('Failed to generate research. Please try again.');
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-96 h-96 bg-gradient-to-r from-secondary-400 to-[#f3a563] rounded-full filter blur-3xl animate-pulse"></div>
          </div>
          <div className="relative">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-secondary-600 tracking-wider uppercase bg-secondary-100 px-4 py-2 rounded-full">
                Research Tool
              </span>
            </div>
            <h1 className="text-6xl font-bold mb-4 young-serif">
              <span className="gradient-text">DEPTH</span>
            </h1>
            <div className="max-w-2xl mx-auto">
              <p className="text-2xl text-gray-700 font-light leading-relaxed">
                Unlock deeper insights with
                <span className="font-semibold text-secondary-900"> comprehensive research</span>
              </p>
              <div className="mt-2 flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                  </svg>
                  Biblical context
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                  Historical insights
                </span>
                <span>•</span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"/>
                  </svg>
                  Theological depth
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Research Form */}
          <div className={`bg-white shadow-xl rounded-2xl p-8 border border-gray-100 transition-all duration-500 ${output ? 'opacity-75' : 'animate-fade-in'}`}>
            <div className="grid grid-cols-1 gap-6">
              <div className="group">
                <label htmlFor="research-topic" className="block text-sm font-semibold text-gray-700 mb-2">
                  Topic of Research
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="research-topic"
                    value={researchTopic}
                    onChange={(e) => setResearchTopic(e.target.value)}
                    className="input-field group-hover:shadow-md transition-shadow duration-200 pr-10"
                    placeholder="e.g., Historical context of the Roman Empire"
                    autoFocus
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">Enter any biblical, historical, or theological topic you'd like to explore in depth</p>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !researchTopic}
                  className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
                >
                  {isLoading ? (
                    <>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-wave" style={{ animationDelay: '0ms', animationDuration: '1.4s' }}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-wave" style={{ animationDelay: '200ms', animationDuration: '1.4s' }}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-wave" style={{ animationDelay: '400ms', animationDuration: '1.4s' }}></div>
                      </div>
                      <span>Researching</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span>Generate Research</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Research Output */}
          {status === 'complete' && output && (
            <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 animate-fade-in">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 young-serif">Your Research Output</h2>
                  <p className="text-gray-600 mt-2">Deep insights on: {researchTopic}</p>
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
                  title={`Research on: ${researchTopic}`}
                />
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => {
                    setResearchTopic('');
                    setOutput('');
                    setStatus('idle');
                  }}
                  className="text-secondary-600 hover:text-secondary-800 font-medium flex items-center transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Research Another Topic
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
                    <svg className="h-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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

export default DepthPage;