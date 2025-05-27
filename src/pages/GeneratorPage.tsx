import React, { useState, useEffect, useRef } from 'react';
import QuoteRequestForm from '../components/QuoteRequestForm';
import { Session } from '@supabase/supabase-js';
import Auth from '../components/Auth';

import { supabase } from '../lib/supabase';
import { generateSermonArtPrompt, generateSermonArt, convertSummaryToPrompt, StylePreset } from '../services/imageGeneration';
import { analyzeSermonInput } from '../lib/openaiClient';
import { STYLE_PRESETS } from '../constants/stylePresets';
import ImageDisplay from '../components/ImageDisplay';
import SermonForm from '../components/SermonForm';
import CreditDisplay from '../components/CreditDisplay';
import PromptEditor from '../components/PromptEditor';
import { useCredits } from '../hooks/useCredits';

// New component imports
import EnhancedStyleSelector from '../components/EnhancedStyleSelector';
import GenerationProgress from '../components/GenerationProgress';
import ConceptProgress from '../components/ConceptProgress';
import StepIndicator from '../components/StepIndicator';
import AnimatedSection from '../components/AnimatedSection';

interface GeneratorPageProps {
  session: Session | null;
}

const GeneratorPage: React.FC<GeneratorPageProps> = ({ session }) => {
  const [rawInput, setRawInput] = useState('');
  const [sermon_title, setSermonTitle] = useState('');
  const [sermon_topic, setSermonTopic] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<StylePreset | undefined>();
  const [fullPrompt, setFullPrompt] = useState('');
  const [promptSummary, setPromptSummary] = useState('');
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'generating-prompt' | 'generating-image' | 'complete' | 'error'>('idle');
  const [error, setError] = useState('');
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [generationStartTime, setGenerationStartTime] = useState<number | null>(null);
  const [freeRegenerationUsed, setFreeRegenerationUsed] = useState(false); // Added state for free regeneration
  const { credits, loading: creditsLoading } = useCredits();

  // Add refs for scroll targets
  const conceptSectionRef = useRef<HTMLDivElement>(null);
  const resultSectionRef = useRef<HTMLDivElement>(null);

  // Update current step based on progress
  useEffect(() => {
    if (sermon_topic) setCurrentStep(2);
    if (selectedStyle) setCurrentStep(3);
    if (promptSummary) setCurrentStep(4);
    if (status === 'generating-image') setCurrentStep(5);
    if (imgSrc) setCurrentStep(5);
  }, [sermon_topic, selectedStyle, promptSummary, status, imgSrc]);

  // Scroll to concept section when style is selected
  useEffect(() => {
    if (selectedStyle && conceptSectionRef.current) {
      conceptSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedStyle]);

  // Scroll to result section when image is generated
  useEffect(() => {
    if (imgSrc && resultSectionRef.current) {
      resultSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [imgSrc]);

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
        topic: sermon_topic
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

    if (!sermon_topic.trim()) {
      setError('Please enter your sermon details');
      return;
    }

    if (!credits?.credits_remaining) {
      setError('You have no credits remaining. Please wait for your credits to reset.');
      return;
    }

    setError('');
    setStatus('generating-prompt');
    setGenerationStartTime(Date.now());
    
    try {
      const { fullPrompt: generatedPrompt, summary } = await generateSermonArtPrompt(
        sermon_title,
        sermon_topic,
        selectedStyle
      );
      setFullPrompt(generatedPrompt);
      setPromptSummary(summary);
      setFreeRegenerationUsed(false); // Reset free regeneration for new concept

      // After concept is generated, scroll to the concept section
      setTimeout(() => {
        const conceptSection = document.querySelector('#concept-section');
        if (conceptSection) {
          conceptSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setStatus('idle');
      setGenerationStartTime(null);
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
    setGenerationStartTime(Date.now());
    
    try {
      const updatedFullPrompt = await convertSummaryToPrompt(
        promptSummary,
        sermon_title,
        sermon_topic,
        selectedStyle
      );
      setFullPrompt(updatedFullPrompt);

      if (freeRegenerationUsed) {
        // If free regeneration has been used, decrement credits
        const { data: decrementResult, error: decrementError } = await supabase
          .rpc('decrement_credits', { user_id: session.user.id });

        if (decrementError || !decrementResult) {
          throw new Error('Failed to use credit. Please try again.');
        }
      } else {
        // This is the first (free) generation/regeneration for this concept
        setFreeRegenerationUsed(true);
      }

      const src = await generateSermonArt(updatedFullPrompt, selectedStyle);
      setImgSrc(src);
      setStatus('complete');
      setGenerationStartTime(null);
      if (src) {
        await saveToLibrary(src);
      }
    } catch (e) {
      setError((e as Error).message);
      setStatus('idle');
      setGenerationStartTime(null);
    }
  };

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = async (value: string) => {
    setRawInput(value);
    setIsAnalyzing(true);
    
    try {
      const analysis = await analyzeSermonInput(value);
      setSermonTitle(analysis.title);
      setSermonTopic(analysis.topic);
    } catch (e) {
      console.error('Error analyzing input:', e);
      setSermonTitle(value);
      setSermonTopic(value);
    } finally {
      // Add a small delay before showing styles to ensure smooth transition
      setTimeout(() => setIsAnalyzing(false), 300);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center pt-36 md:pt-40 pb-16 px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">Flexible Annual Pricing Built for Every Church</h2>
            
            <p className="text-base md:text-xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto">
              At SALT Creative, we believe every pastor deserves beautiful, impactful sermon art—regardless of church size or budget. 
              Our annual licensing is tailored specifically to your church's congregation size, allowing us to offer significantly 
              reduced pricing for smaller, newer churches.
            </p>

            <div className="bg-white p-6 md:p-12 rounded-xl shadow-lg mb-12 md:mb-16 transition-all duration-300 hover:shadow-xl">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">Ready to Get Started?</h3>
              <p className="text-sm md:text-base text-gray-600 mb-8 md:mb-10 max-w-2xl mx-auto">
                Click below to get your personalized quote for an annual license.
                <br className="hidden md:block" />
                <span className="block mt-2 md:mt-3">
                  Are you a startup or brand-new church? Apply today for discounted—or even sponsored—membership through our SALT Sponsorship Initiative.
                </span>
              </p>

              <button
                onClick={() => setIsQuoteFormOpen(true)}
                className="inline-flex items-center justify-center px-6 md:px-10 py-3 md:py-5 text-base md:text-lg font-semibold rounded-full text-white bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] hover:from-[#2A4B6A] hover:to-[#8EAFC5] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
              >
                Get Your Quote
              </button>
            </div>

            <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-gray-200">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Already have an account?</h3>
              <Auth />
            </div>
          </div>
        </AnimatedSection>

        <QuoteRequestForm
          isOpen={isQuoteFormOpen}
          onClose={() => setIsQuoteFormOpen(false)}
        />
      </div>
    );
  }

  // Show full-screen loading states
  if (status === 'generating-image' || status === 'generating-prompt') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        {status === 'generating-prompt' ? (
          <ConceptProgress
            startTime={generationStartTime || Date.now()}
            sermonTitle={rawInput.split('\n')[0] || 'your sermon'}
          />
        ) : (
          <GenerationProgress
            startTime={generationStartTime!}
            sermonTitle={sermon_title}
            stylePreset={selectedStyle}
          />
        )}
      </div>
    );
  }

  // Main generator page content
  return (
    <div className="min-h-screen pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-secondary-900 mb-4">
              Create Your Sermon Artwork
            </h1>
            <p className="text-lg md:text-xl text-secondary-600 max-w-2xl mx-auto">
              Design beautiful, impactful visuals for your sermon in minutes
            </p>
            <div className="mt-6">
              <CreditDisplay 
                credits={credits?.credits_remaining ?? null}
                nextReset={credits?.next_reset_at ?? null}
                isLoading={creditsLoading}
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Step Indicator */}
        <div className="mb-12">
          <StepIndicator currentStep={currentStep} />
        </div>

        <div className="w-full max-w-4xl mx-auto">
          {/* Step 1: Sermon Details */}
          <AnimatedSection delay={0.1}>
            <div className={`mb-8 transition-all duration-500 ${currentStep >= 1 ? 'opacity-100' : 'opacity-50'}`}>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] text-white flex items-center justify-center font-semibold mr-4">
                    1
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Enter Your Sermon Details</h3>
                </div>
                <SermonForm
                  onSubmit={handleInputChange}
                  isLoading={status !== 'idle'}
                  disabled={status !== 'idle'}
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Step 2: Style Selection */}
          {(sermon_topic || isAnalyzing) && (
            // <AnimatedSection delay={0.2}>
              <div className={`w-full mb-8`}>
                <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] text-white flex items-center justify-center font-semibold mr-4">
                      2
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Choose Your Visual Style</h3>
                  </div>
                  <div className={`w-full opacity-100`}>
                    <EnhancedStyleSelector
                      presets={STYLE_PRESETS}
                      selectedStyle={selectedStyle}
                      onStyleSelect={setSelectedStyle}
                      disabled={status !== 'idle' || isAnalyzing}
                    />
                  </div>
                </div>
              </div>
            // </AnimatedSection>
          )}

          {/* Step 3: Generate Concept */}
          {selectedStyle && sermon_topic && (
            <AnimatedSection delay={0.3}>
              <div ref={conceptSectionRef} className={`mb-8 transition-all duration-500 ${currentStep >= 3 ? 'opacity-100' : 'opacity-50'}`}>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] text-white flex items-center justify-center font-semibold mr-4">
                      3
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Generate Your Concept</h3>
                  </div>
                  <button
                    onClick={handleGeneratePrompt}
                    disabled={status !== 'idle' || !sermon_topic.trim() || !selectedStyle || !credits?.credits_remaining}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] hover:from-[#2A4B6A] hover:to-[#8EAFC5] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ${
                      status !== 'idle' || !sermon_topic.trim() || !selectedStyle || !credits?.credits_remaining ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {status !== 'idle' ? 'Creating Your Concept...' : 'Generate Sermon Art Concept'}
                  </button>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Step 4: Review and Customize */}
          {promptSummary && (
            <AnimatedSection delay={0.4}>
              <div id="concept-section" className={`mb-8 transition-all duration-500 ${currentStep >= 4 ? 'opacity-100' : 'opacity-50'}`}>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] text-white flex items-center justify-center font-semibold mr-4">
                      4
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Review and Customize</h3>
                  </div>
                  <div className="space-y-6">
                    <PromptEditor
                      value={promptSummary}
                      onChange={setPromptSummary}
                      disabled={status !== 'idle'}
                    />

                    <button
                      onClick={handleGenerateArt}
                      disabled={status !== 'idle' || !promptSummary.trim() || !credits?.credits_remaining}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] hover:from-[#2A4B6A] hover:to-[#8EAFC5] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ${
                        status !== 'idle' || !promptSummary.trim() || !credits?.credits_remaining ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Generate Final Artwork
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Error Display */}
          {error && (
            <AnimatedSection>
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center">
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </AnimatedSection>
          )}

          {/* Generated Image Display */}
          {imgSrc && (
            <AnimatedSection delay={0.5}>
              <div ref={resultSectionRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] text-white flex items-center justify-center font-semibold mr-4">
                    ✓
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Your Sermon Artwork</h3>
                </div>
                <ImageDisplay
                  imageUrl={imgSrc}
                  status={status}
                  onRegenerate={handleGenerateArt}
                />
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratorPage;