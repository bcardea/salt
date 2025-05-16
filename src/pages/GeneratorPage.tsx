import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Auth from '../components/Auth';
import { generateSermonArtPrompt, generateSermonArt, convertSummaryToPrompt, STYLE_PRESETS, StylePreset } from '../services/imageGeneration';
import ImageDisplay from '../components/ImageDisplay';
import SermonForm from '../components/SermonForm';
import CreditDisplay from '../components/CreditDisplay';
import { useCredits } from '../hooks/useCredits';

const GeneratorPage: React.FC = () => {
  const [session, setSession] = useState(null);
  const [topic, setTopic] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<StylePreset | undefined>();
  const [hoveredStyle, setHoveredStyle] = useState<StylePreset | undefined>();
  const [fullPrompt, setFullPrompt] = useState('');
  const [promptSummary, setPromptSummary] = useState('');
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'generating-prompt' | 'generating-image' | 'complete' | 'error'>('idle');
  const [error, setError] = useState('');
  const [inputText, setInputText] = useState('');
  const { credits, loading: creditsLoading, error: creditsError } = useCredits();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const saveToLibrary = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.png`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('sermon-images')
        .upload(fileName, blob);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('sermon-images')
        .getPublicUrl(fileName);

      const { error: insertError } = await supabase.from('images').insert({
        user_id: session?.user.id,
        url: publicUrl,
        prompt: fullPrompt,
        topic
      });

      if (insertError) throw insertError;
    } catch (err) {
      console.error('Error saving to library:', err);
    }
  };

  const handleGeneratePrompt = async () => {
    if (!session) {
      setError('Please sign in to generate artwork');
      return;
    }

    if (!selectedStyle) {
      setError('Please select a style first');
      return;
    }

    if (!inputText.trim()) {
      setError('Please enter your sermon details');
      return;
    }

    if (!credits?.credits_remaining) {
      setError('You have no credits remaining. Please wait for your credits to reset.');
      return;
    }

    setError('');
    setStatus('generating-prompt');
    setTopic(inputText);
    
    try {
      const { fullPrompt: generatedPrompt, summary } = await generateSermonArtPrompt(
        inputText.length > 100 ? 'Sermon Artwork' : inputText.toUpperCase(),
        inputText,
        selectedStyle
      );
      setFullPrompt(generatedPrompt);
      setPromptSummary(summary);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setStatus('idle');
    }
  };

  const handleGenerateArt = async () => {
    if (!promptSummary.trim()) return;
    
    if (!session) {
      setError('Please sign in to generate artwork');
      return;
    }

    if (!credits?.credits_remaining) {
      setError('You have no credits remaining. Please wait for your credits to reset.');
      return;
    }
    
    setError('');
    setStatus('generating-image');
    try {
      // Convert the edited summary back to a full prompt
      const updatedFullPrompt = await convertSummaryToPrompt(
        promptSummary,
        selectedStyle
      );
      setFullPrompt(updatedFullPrompt);

      // Attempt to decrement credits first
      const { data: decrementResult, error: decrementError } = await supabase
        .rpc('decrement_credits', { user_id: session.user.id });

      if (decrementError || !decrementResult) {
        throw new Error('Failed to use credit. Please try again.');
      }

      const src = await generateSermonArt(updatedFullPrompt, selectedStyle);
      setImgSrc(src);
      setStatus('complete');
      if (src) {
        await saveToLibrary(src);
      }
    } catch (e) {
      setError((e as Error).message);
      setStatus('idle');
    }
  };

  if (!session) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Sign In to Create Artwork
            </h1>
            <p className="text-lg text-secondary-600">
              Create an account or sign in to start generating sermon artwork
            </p>
          </div>
          <Auth onSuccess={() => setStatus('idle')} />
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Create Your Sermon Artwork
          </h1>
          <p className="text-lg text-secondary-600">
            Design and refine your sermon artwork in three simple steps
          </p>
          <div className="mt-4">
            <CreditDisplay 
              credits={credits?.credits_remaining ?? null}
              nextReset={credits?.next_reset_at ?? null}
              isLoading={creditsLoading}
            />
          </div>
        </div>

        <div className="card p-6 max-w-3xl mx-auto">
          {/* Step 1: Enter Sermon Details */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Step 1: Enter Your Sermon Details</h2>
            <SermonForm
              onSubmit={setInputText}
              isLoading={status !== 'idle'}
              disabled={status !== 'idle'}
            />
          </div>

          {/* Step 2: Choose Style */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Step 2: Choose Your Style</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {STYLE_PRESETS.map((style) => (
                <div key={style.id} className="relative group">
                  {/* Preview Image */}
                  <div 
                    className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 opacity-0 scale-95 transition-all duration-200 pointer-events-none z-50
                      ${hoveredStyle?.id === style.id ? 'opacity-100 scale-100' : ''}`}
                  >
                    <img
                      src={style.previewUrl}
                      alt={`${style.title} preview`}
                      className="w-full h-auto rounded-lg shadow-xl"
                    />
                  </div>
                  
                  {/* Style Button */}
                  <button
                    onClick={() => setSelectedStyle(style)}
                    onMouseEnter={() => setHoveredStyle(style)}
                    onMouseLeave={() => setHoveredStyle(undefined)}
                    className={`w-full p-3 text-left rounded-md border transition-all ${
                      status !== 'idle' ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary-500'
                    } ${
                      selectedStyle?.id === style.id
                        ? 'border-primary-500 bg-primary-50 text-primary-900'
                        : 'border-secondary-200 bg-white'
                    }`}
                    disabled={status !== 'idle'}
                  >
                    <div className="font-medium text-sm">{style.title}</div>
                    <div className="text-xs text-secondary-600 mt-1">{style.description}</div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Generate Concept */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Step 3: Generate Your Concept</h2>
            <button
              onClick={handleGeneratePrompt}
              disabled={status !== 'idle' || !inputText.trim() || !selectedStyle || !credits?.credits_remaining}
              className={`btn-primary w-full flex items-center justify-center ${
                status !== 'idle' || !inputText.trim() || !selectedStyle || !credits?.credits_remaining ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {status === 'generating-prompt' ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Your Concept...
                </>
              ) : (
                'Generate Sermon Art Concept'
              )}
            </button>
          </div>

          {/* Step 4: Review and Edit Concept */}
          {promptSummary && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Step 4: Review and Customize</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Edit Design Concept (Optional)
                  </label>
                  <textarea
                    value={promptSummary}
                    onChange={(e) => setPromptSummary(e.target.value)}
                    rows={4}
                    className="input-field"
                    disabled={status !== 'idle'}
                    placeholder="Describe how you'd like to modify the concept..."
                  />
                  <p className="mt-2 text-sm text-secondary-600">
                    Feel free to modify this description to better match your vision.
                  </p>
                </div>

                <button
                  onClick={handleGenerateArt}
                  disabled={status !== 'idle' || !promptSummary.trim() || !credits?.credits_remaining}
                  className="btn-primary w-full"
                >
                  Generate Final Artwork
                </button>
              </div>
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