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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Aroma</h1>
          <p className="text-lg text-gray-600">Helps create outreach content for their desired messaging and platform.</p>
        </div>

        <div className="space-y-8">
          <div className="bg-white shadow sm:rounded-lg p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Content Type
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {aromaTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

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
                  placeholder="e.g., Sunday Service Recap"
                />
              </div>
              
              <div className="sm:col-span-2">
                <label htmlFor="key-points" className="block text-sm font-medium text-gray-700">
                  Key Points (one per line)
                </label>
                <textarea
                  id="key-points"
                  value={keyPoints}
                  onChange={(e) => setKeyPoints(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="e.g., Main scripture was John 3:16\nNext week's service is at 10am"
                />
              </div>

              <div>
                <label htmlFor="tone" className="block text-sm font-medium text-gray-700">
                  Tone
                </label>
                <input
                  type="text"
                  id="tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="e.g., Encouraging, Informative"
                />
              </div>

              <div>
                <label htmlFor="audience" className="block text-sm font-medium text-gray-700">
                  Audience
                </label>
                <input
                  type="text"
                  id="audience"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="e.g., Church members, New visitors"
                />
              </div>

              <div className="col-span-2 flex justify-end">
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
                  ) : 'Generate Content'}
                </button>
              </div>
            </div>
          </div>

          {status === 'complete' && output && (
            <div className="bg-white shadow sm:rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Your Generated Content</h2>
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
                  title={`${aromaTypeOptions.find(o => o.value === type)?.label}: ${topic}`}
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

export default AromaPage;
