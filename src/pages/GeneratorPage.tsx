import React, { useState, useEffect, useRef } from 'react';
import QuoteRequestForm from '../components/QuoteRequestForm';
import { Session } from '@supabase/supabase-js';
import Auth from '../components/Auth';

import { supabase } from '../lib/supabase';
import { generateTypography, generateFinalPoster, animatePoster, getBackgroundSuggestions } from '../services/saltServer';
import ImageDisplay from '../components/ImageDisplay';
import CreditDisplay from '../components/CreditDisplay';
import { useCredits } from '../hooks/useCredits';
import TypographySelector from '../components/TypographySelector';

// New component imports
import GenerationProgress from '../components/GenerationProgress';
import StepIndicator from '../components/StepIndicator';
import AnimatedSection from '../components/AnimatedSection';

interface GeneratorPageProps {
  session: Session | null;
}

type GenerationStatus = 'idle' | 'generating-typography' | 'generating-poster' | 'animating' | 'complete' | 'error';
const isGeneratingTypography = (status: GenerationStatus): boolean => status === 'generating-typography';

const GeneratorPage: React.FC<GeneratorPageProps> = ({ session }) => {
  // Form states
  const [headline, setHeadline] = useState('');
  const [subHeadline, setSubHeadline] = useState('');
  const [typographyStyle, setTypographyStyle] = useState<'focused' | 'trendy' | 'kids' | 'handwritten'>('focused');
  const [backgroundDescription, setBackgroundDescription] = useState('');
  const [backgroundSuggestions, setBackgroundSuggestions] = useState<string[]>([]);

  // Generation states
  const [typographyOptions, setTypographyOptions] = useState<string[]>([]);
  const [selectedTypography, setSelectedTypography] = useState<string | null>(null);
  const [finalPosterUrl, setFinalPosterUrl] = useState<string | null>(null);
  const [animatedVideoUrl, setAnimatedVideoUrl] = useState<string | null>(null);

  // UI states
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [error, setError] = useState('');
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [generationStartTime, setGenerationStartTime] = useState<number | null>(null);

  const { credits, loading: creditsLoading } = useCredits();

  // Add refs for scroll targets
  const typographySectionRef = useRef<HTMLDivElement>(null);
  const backgroundSectionRef = useRef<HTMLDivElement>(null);
  const resultSectionRef = useRef<HTMLDivElement>(null);

  // Update current step based on progress
  useEffect(() => {
    if (typographyOptions.length > 0) setCurrentStep(2);
    if (selectedTypography) setCurrentStep(3);
    if (finalPosterUrl) setCurrentStep(4);
  }, [typographyOptions, selectedTypography, finalPosterUrl]);

  // Scroll to sections
  useEffect(() => {
    if (typographyOptions.length > 0 && typographySectionRef.current) {
      typographySectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [typographyOptions]);

  useEffect(() => {
    if (selectedTypography && backgroundSectionRef.current) {
      backgroundSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      // Get background suggestions when typography is selected
      const fetchSuggestions = async () => {
        try {
          const suggestions = await getBackgroundSuggestions(headline, subHeadline);
          setBackgroundSuggestions(suggestions);
        } catch (error) {
          console.error('Failed to get background suggestions:', error);
        }
      };
      fetchSuggestions();
    }
  }, [selectedTypography, headline, subHeadline]);

  useEffect(() => {
    if (finalPosterUrl && resultSectionRef.current) {
      resultSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [finalPosterUrl]);

  const saveToLibrary = async (type: 'typography' | 'poster' | 'video', url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const fileName = `${type}-${Date.now()}-${Math.random().toString(36).substring(7)}.${type === 'video' ? 'mp4' : 'png'}`;

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
        prompt: `${headline} - ${subHeadline}`,
        topic: headline,
        image_type: type
      });

      if (insertError) throw insertError;
    } catch (err) {
      console.error('Error saving to library:', err);
    }
  };

  const handleGenerateTypography = async () => {
    if (!session) {
      setError('Please sign in to generate artwork');
      return;
    }

    if (!credits?.credits_remaining) {
      setError('You have no credits remaining. Please wait for your credits to reset.');
      return;
    }

    if (!headline.trim() || !subHeadline.trim()) {
      setError('Please enter both headline and sub-headline');
      return;
    }

    setError('');
    setStatus('generating-typography');
    setGenerationStartTime(Date.now());

    try {
      const options = await generateTypography(headline, subHeadline, typographyStyle);
      setTypographyOptions(options);
      setStatus('idle');
      setGenerationStartTime(null);

      // Save all typography options to library
      for (const url of options) {
        try {
          await saveToLibrary('typography', url);
          console.log('Typography saved to library:', url);
        } catch (err) {
          console.error('Failed to save typography to library:', err);
          // Don't throw error here to allow process to continue
        }
      }
    } catch (e) {
      setError((e as Error).message);
      setStatus('error');
      setGenerationStartTime(null);
    }
  };

  const handleGenerateFinalPoster = async () => {
    if (!selectedTypography || !backgroundDescription.trim()) {
      setError('Please select typography and enter background description');
      return;
    }

    if (!credits?.credits_remaining) {
      setError('You have no credits remaining. Please wait for your credits to reset.');
      return;
    }

    setError('');
    setStatus('generating-poster');
    setGenerationStartTime(Date.now());

    try {
      // Decrement credits
      const { data: decrementResult, error: decrementError } = await supabase
        .rpc('decrement_credits', { user_id: session!.user.id });

      if (decrementError || !decrementResult) {
        throw new Error('Failed to use credit. Please try again.');
      }

      const posterUrl = await generateFinalPoster(selectedTypography, backgroundDescription);
      setFinalPosterUrl(posterUrl);
      setStatus('complete');
      setGenerationStartTime(null);

      // Save poster to library
      try {
        await saveToLibrary('poster', posterUrl);
        console.log('Final poster saved to library:', posterUrl);
      } catch (err) {
        console.error('Failed to save poster to library:', err);
        // Don't throw error here to allow process to continue
      }
    } catch (e) {
      setError((e as Error).message);
      setStatus('error');
      setGenerationStartTime(null);
    }
  };

  const handleAnimatePoster = async () => {
    if (!finalPosterUrl) return;

    setError('');
    setStatus('animating');
    setGenerationStartTime(Date.now());

    try {
      const videoUrl = await animatePoster(finalPosterUrl);
      setAnimatedVideoUrl(videoUrl);
      setStatus('complete');
      setGenerationStartTime(null);

      // Save video to library
      try {
        await saveToLibrary('video', videoUrl);
        console.log('Animated video saved to library:', videoUrl);
      } catch (err) {
        console.error('Failed to save video to library:', err);
        // Don't throw error here to allow process to continue
      }
    } catch (e) {
      setError((e as Error).message);
      setStatus('error');
      setGenerationStartTime(null);
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
  if (status === 'generating-typography' || status === 'generating-poster' || status === 'animating') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <GenerationProgress
          startTime={generationStartTime!}
          sermonTitle={headline}
          stylePreset={typographyStyle}
          status={status}
        />
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
          <StepIndicator currentStep={currentStep} totalSteps={4} />
        </div>

        <div className="w-full max-w-4xl mx-auto">
          {/* Step 1: Typography Details */}
          <AnimatedSection delay={0.1}>
            <div className={`mb-8 transition-all duration-500 ${currentStep >= 1 ? 'opacity-100' : 'opacity-50'}`}>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] text-white flex items-center justify-center font-semibold mr-4">
                    1
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Enter Your Text</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-2">
                      Headline
                    </label>
                    <input
                      id="headline"
                      type="text"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      placeholder="e.g., Sunday Service"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      disabled={status !== 'idle'}
                    />
                  </div>

                  <div>
                    <label htmlFor="subheadline" className="block text-sm font-medium text-gray-700 mb-2">
                      Sub-headline
                    </label>
                    <input
                      id="subheadline"
                      type="text"
                      value={subHeadline}
                      onChange={(e) => setSubHeadline(e.target.value)}
                      placeholder="e.g., Join us at 10am"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      disabled={status !== 'idle'}
                    />
                  </div>

                  <div>
                    <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">
                      Typography Style
                    </label>
                    <select
                      id="style"
                      value={typographyStyle}
                      onChange={(e) => setTypographyStyle(e.target.value as any)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      disabled={status !== 'idle'}
                    >
                      <option value="focused">Focused</option>
                      <option value="trendy">Trendy</option>
                      <option value="kids">Kids</option>
                      <option value="handwritten">Handwritten</option>
                    </select>
                  </div>

                  <button
                    onClick={handleGenerateTypography}
                    disabled={status !== 'idle' || !headline.trim() || !subHeadline.trim() || !credits?.credits_remaining}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] hover:from-[#2A4B6A] hover:to-[#8EAFC5] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ${
                      status !== 'idle' || !headline.trim() || !subHeadline.trim() || !credits?.credits_remaining ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Generate Typography Options
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Step 2: Typography Selection */}
          {typographyOptions.length > 0 && (
            <AnimatedSection delay={0.2}>
              <div ref={typographySectionRef} className={`mb-8 transition-all duration-500 ${currentStep >= 2 ? 'opacity-100' : 'opacity-50'}`}>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] text-white flex items-center justify-center font-semibold mr-4">
                      2
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Choose Your Typography</h3>
                  </div>

                  <TypographySelector
                    options={typographyOptions}
                    selectedOption={selectedTypography}
                    onSelect={setSelectedTypography}
                    isLoading={isGeneratingTypography(status)}
                  />
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Step 3: Background Description */}
          {selectedTypography && (
            <AnimatedSection delay={0.3}>
              <div ref={backgroundSectionRef} className={`mb-8 transition-all duration-500 ${currentStep >= 3 ? 'opacity-100' : 'opacity-50'}`}>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] text-white flex items-center justify-center font-semibold mr-4">
                      3
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Describe Your Background</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="background" className="block text-sm font-medium text-gray-700 mb-2">
                        Background Description
                      </label>
                      {backgroundSuggestions.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-2">
                          {backgroundSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => setBackgroundDescription(suggestion)}
                              className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                              type="button"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                      <textarea
                        id="background"
                        value={backgroundDescription}
                        onChange={(e) => setBackgroundDescription(e.target.value)}
                        placeholder="e.g., A peaceful sunrise over mountains with soft clouds"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        disabled={status !== 'idle'}
                      />
                    </div>

                    <button
                      onClick={handleGenerateFinalPoster}
                      disabled={status !== 'idle' || !backgroundDescription.trim() || !credits?.credits_remaining}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] hover:from-[#2A4B6A] hover:to-[#8EAFC5] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ${
                        status !== 'idle' || !backgroundDescription.trim() || !credits?.credits_remaining ? 'opacity-50 cursor-not-allowed' : ''
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

          {/* Step 4: Final Result */}
          {finalPosterUrl && (
            <AnimatedSection delay={0.4}>
              <div ref={resultSectionRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] text-white flex items-center justify-center font-semibold mr-4">
                    ✓
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900">Your Sermon Artwork</h3>
                </div>

                <div className="space-y-6">
                  <ImageDisplay
                    imageUrl={finalPosterUrl}
                    status={status}
                    onRegenerate={handleGenerateFinalPoster}
                  />

                  {!animatedVideoUrl && (
                    <button
                      onClick={handleAnimatePoster}
                      disabled={status !== 'idle' && status !== 'complete'}
                      className={`w-full py-4 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ${
                        status !== 'idle' && status !== 'complete' ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Animate Your Artwork
                      </span>
                    </button>
                  )}

                  {animatedVideoUrl && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Animated Version</h4>
                      <video
                        controls
                        loop
                        className="w-full rounded-lg shadow-lg"
                        src={animatedVideoUrl}
                      >
                        Your browser does not support the video tag.
                      </video>
                      <a
                        href={animatedVideoUrl}
                        download
                        className="mt-4 inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg text-white bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] hover:from-[#2A4B6A] hover:to-[#8EAFC5] transition-all duration-300"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Video
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratorPage;