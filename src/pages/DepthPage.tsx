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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Depth</h1>
          <p className="text-lg text-gray-600">Provides research on a given topic for a sermon.</p>
        </div>

        <div className="space-y-8">
          <div className="bg-white shadow sm:rounded-lg p-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="research-topic" className="block text-sm font-medium text-gray-700">
                  Topic of Research
                </label>
                <input
                  type="text"
                  id="research-topic"
                  value={researchTopic}
                  onChange={(e) => setResearchTopic(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="e.g., Historical context of the Roman Empire"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : 'Generate Research'}
                </button>
              </div>
            </div>
          </div>

          {status === 'complete' && output && (
            <div className="bg-white shadow sm:rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Your Research Output</h2>
                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Copy to Clipboard
                </button>
              </div>
              <div className="mt-4">
                <SermonOutlineDisplay 
                  content={output}
                  title={`Research on: ${researchTopic}`}
                />
              </div>
            </div>
          )}

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

export default DepthPage;
