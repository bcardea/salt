import React, { useState } from 'react';
import ApiKeyInput from '../components/ApiKeyInput';
import { useApiKey } from '../context/ApiKeyContext';
import { generateSermonArtPrompt, generateSermonArt, STYLE_PRESETS, StylePreset } from '../services/imageGeneration';
import ImageDisplay from '../components/ImageDisplay';
import ReferenceImageGallery from '../components/ReferenceImageGallery';
import { ReferenceImage, ReferenceImages } from '../constants/referenceImages';

const GeneratorPage: React.FC = () => {
  const { apiKey } = useApiKey();
  const [topic, setTopic] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<StylePreset | undefined>();
  const [selectedRefs, setSelectedRefs] = useState<ReferenceImage[]>([]);
  const [prompt, setPrompt] = useState('');
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'generating-prompt' | 'generating-image' | 'complete' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleGeneratePrompt = async () => {
    if (!apiKey) {
      setError('Please enter your OpenAI API key first');
      return;
    }

    setError('');
    setStatus('generating-prompt');
    try {
      const generatedPrompt = await generateSermonArtPrompt(
        topic.toUpperCase(),
        topic,
        apiKey,
        selectedStyle
      );
      setPrompt(generatedPrompt);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setStatus('idle');
    }
  };

  const handleGenerateArt = async () => {
    if (!prompt.trim() || !apiKey) return;
    
    setError('');
    setStatus('generating-image');
    try {
      const src = await generateSermonArt(prompt, apiKey, selectedRefs);
      setImgSrc(src);
      setStatus('complete');
    } catch (e) {
      setError((e as Error).message);
      setStatus('idle');
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Create Your Sermon Artwork
          </h1>
          <p className="text-lg text-secondary-700">
            Design and refine your sermon artwork in two simple steps
          </p>
        </div>

        {!apiKey && (
          <div className="max-w-lg mx-auto mb-8">
            <ApiKeyInput />
          </div>
        )}

        <div className="card p-6 max-w-3xl mx-auto">
          {/* Step 1: Topic Input and Prompt Generation */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Step 1: Enter Your Sermon Topic</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-secondary-700 mb-1">
                  Topic / Title
                </label>
                <input
                  id="topic"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Fathers, The Great Commission..."
                  className="input-field"
                  disabled={status !== 'idle'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Choose a Style
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {STYLE_PRESETS.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style)}
                      className={`p-3 text-left rounded-md border transition-all ${status !== 'idle' ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary-500'} ${
                        selectedStyle?.id === style.id
                          ? 'border-primary-500 bg-primary-50 text-primary-900'
                          : 'border-secondary-200 bg-white'
                      }`}
                      disabled={status !== 'idle'}
                    >
                      <div className="font-medium text-sm">{style.title}</div>
                      <div className="text-xs text-secondary-600 mt-1">{style.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reference Image Gallery */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Reference Images
                </label>
                <ReferenceImageGallery
                  images={ReferenceImages}
                  selectedImages={selectedRefs}
                  onSelectionChange={setSelectedRefs}
                  disabled={status !== 'idle'}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleGeneratePrompt}
                disabled={!topic.trim() || status !== 'idle'}
                className="btn-primary"
              >
                Generate Prompt
              </button>
              {(status === 'generating-prompt' || status === 'generating-image') && (
                <div className="text-secondary-600 flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Working...
                </div>
              )}
            </div>
          </div>

          {/* Step 2: Edit Prompt and Generate Art */}
          {prompt && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Step 2: Refine Your Artwork Description</h2>
              <div className="mb-4">
                <label htmlFor="prompt" className="block text-sm font-medium text-secondary-700 mb-1">
                  Edit the prompt below to customize your artwork
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={6}
                  className="input-field font-mono text-sm"
                  disabled={status !== 'idle'}
                />
              </div>
              <button
                onClick={handleGenerateArt}
                disabled={status !== 'idle' || !prompt.trim()}
                className="btn-accent"
              >
                Generate Artwork
              </button>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {/* Image Display */}
          <div className="rounded-lg overflow-hidden border border-secondary-200">
            <ImageDisplay
              imageUrl={imgSrc || ''}
              status={status}
              onRegenerate={handleGenerateArt}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratorPage;