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
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

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
  const [hoveredSuggestion, setHoveredSuggestion] = useState<number | null>(null);

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

  const fetchBackgroundSuggestions = async () => {
    setIsLoadingSuggestions(true);
    try {
      const suggestions = await getBackgroundSuggestions(headline, subHeadline);
      setBackgroundSuggestions(suggestions);
    } catch (error: any) {
      console.error('Failed to get background suggestions:', error);
      
      const fallbackSuggestions = [
        'A peaceful church sanctuary with soft natural light streaming through stained glass windows',
        'An abstract background with gentle waves of light and soft, muted colors',
        'A modern minimalist design with clean lines and subtle gradients',
        'A nature-inspired scene with soft bokeh effects and warm lighting',
        'An elegant architectural detail with dramatic lighting and shadows'
      ];
      setBackgroundSuggestions(fallbackSuggestions);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  useEffect(() => {
    if (selectedTypography && backgroundSectionRef.current) {
      backgroundSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedTypography]);

  useEffect(() => {
    if (finalPosterUrl && resultSectionRef.current) {
      resultSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [finalPosterUrl]);

  const saveToLibrary = async (type: 'typography' | 'poster' | 'video', url: string) => {
    try {
      let finalUrl = url;
      
      // For ideogram.ai URLs, fetch directly (no proxy needed as they're already accessible)
      if (url.includes('ideogram.ai')) {
        console.log('Fetching ideogram image directly:', url);
      }

      const response = await fetch(finalUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }

      const blob = await response.blob();
      // For ideogram images, they're always PNGs
      const ext = type === 'video' ? 'mp4' : 'png';
      
      // Create a new blob with explicit type
      const typedBlob = new Blob([blob], { 
        type: type === 'video' ? 'video/mp4' : 'image/png'
      });

      const fileName = `${type}-${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
      console.log('Saving file:', fileName, 'Type:', typedBlob.type);

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('sermon-images')
        .upload(fileName, typedBlob, {
          contentType: typedBlob.type,
          cacheControl: '3600'
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      console.log('Upload successful:', uploadData);

      const { data: { publicUrl } } = supabase.storage
        .from('sermon-images')
        .getPublicUrl(fileName);

      if (!session?.user.id) {
        throw new Error('User ID is required');
      }

      const imageData = {
        user_id: session.user.id,
        url: publicUrl,
        prompt: `${headline} - ${subHeadline}`,
        topic: headline
      };
      
      const { error: insertError } = await supabase.from('images').insert(imageData);

      if (insertError) {
        console.error('Supabase insert error details:', insertError);
        throw insertError;
      }

      console.log('Successfully saved to library:', publicUrl);
      return publicUrl;
    } catch (err) {
      console.error('Error saving to library:', err);
      throw err; // Re-throw to handle in the calling function
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
      // Generate typography and fetch background suggestions in parallel
      const [options] = await Promise.all([
        generateTypography(headline, subHeadline, typographyStyle),
        fetchBackgroundSuggestions()
      ]);

      if (!options || options.length === 0) {
        throw new Error('No typography options were generated');
      }

      // Show the typography options immediately
      setTypographyOptions(options);
      setStatus('idle');

      // Save the images to the library in the background
      options.forEach(async (url) => {
        try {
          await saveToLibrary('typography', url);
        } catch (err) {
          console.error('Failed to save typography to library:', err);
          // Don't show error to user since the images are still visible
        }
      });
    } catch (e) {
      console.error('Typography generation error:', e);
      setError((e as Error).message);
      setStatus('error');
    } finally {
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
      const { data: decrementResult, error: decrementError } = await supabase
        .rpc('decrement_credits', { user_id: session!.user.id });

      if (decrementError || !decrementResult) {
        throw new Error('Failed to use credit. Please try again.');
      }

      const posterUrl = await generateFinalPoster(selectedTypography, backgroundDescription);
      setFinalPosterUrl(posterUrl);
      setStatus('complete');
      setGenerationStartTime(null);

      try {
        await saveToLibrary('poster', posterUrl);
      } catch (err) {
        console.error('Failed to save poster to library:', err);
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

      try {
        await saveToLibrary('video', videoUrl);
      } catch (err) {
        console.error('Failed to save video to library:', err);
      }
    } catch (e) {
      setError((e as Error).message);
      setStatus('error');
      setGenerationStartTime(null);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col justify-center pt-36 md:pt-40 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <AnimatedSection>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8 bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] bg-clip-text text-transparent animate-fade-in">
                Flexible Annual Pricing Built for Every Church
              </h2>

              <p className="text-base md:text-xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-200">
                At SALT Creative, we believe every pastor deserves beautiful, impactful sermon art—regardless of church size or budget. 
                Our annual licensing is tailored specifically to your church's congregation size, allowing us to offer significantly 
                reduced pricing for smaller, newer churches.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl mb-12 md:mb-16 transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] border border-gray-100 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="mb-6">
                  <svg className="w-16 h-16 mx-auto text-[#345A7C] animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Ready to Get Started?</h3>
                <p className="text-sm md:text-base text-gray-600 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
                  Click below to get your personalized quote for an annual license.
                  <br className="hidden md:block" />
                  <span className="block mt-2 md:mt-3 font-medium text-[#345A7C]">
                    Are you a startup or brand-new church? Apply today for discounted—or even sponsored—membership through our SALT Sponsorship Initiative.
                  </span>
                </p>

                <button
                  onClick={() => setIsQuoteFormOpen(true)}
                  className="group inline-flex items-center justify-center px-8 md:px-12 py-4 md:py-5 text-base md:text-lg font-bold rounded-full text-white bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] hover:from-[#2A4B6A] hover:to-[#8EAFC5] transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0 relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  <span className="relative flex items-center">
                    Get Your Quote
                    <svg className="ml-3 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-gray-200 animate-fade-in animation-delay-400">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 md:mb-6">Already have an account?</h3>
              <div className="transform hover:scale-[1.02] transition-transform duration-300">
                <Auth />
              </div>
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
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
    <div className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-gray-50 via-white to-blue-50 w-full relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-gradient-to-br from-yellow-100/20 to-orange-100/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
              <span className="bg-gradient-to-r from-[#345A7C] via-[#6B9BD1] to-[#A1C1D7] bg-clip-text text-transparent">
                Create Your Sermon Artwork
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in animation-delay-200 leading-relaxed">
              Design beautiful, impactful visuals for your sermon in minutes
            </p>
            <div className="mt-6 animate-fade-in animation-delay-400">
              <CreditDisplay 
                credits={credits?.credits_remaining ?? null}
                nextReset={credits?.next_reset_at ?? null}
                isLoading={creditsLoading}
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Enhanced Step Indicator */}
        <div className="mb-12 animate-fade-in animation-delay-600">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-gray-100">
            <StepIndicator currentStep={currentStep} totalSteps={4} />
          </div>
        </div>

        <div className="w-full max-w-4xl mx-auto">
          {/* Step 1: Typography Details */}
          <AnimatedSection delay={0.1}>
            <div className={`mb-8 transition-all duration-700 ${currentStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] relative overflow-hidden group">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#345A7C] to-[#A1C1D7] text-white flex items-center justify-center font-bold text-lg shadow-lg transform group-hover:rotate-6 transition-transform duration-500">
                      1
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 ml-4">Enter Your Text</h3>
                    <div className="ml-auto">
                      <svg className="w-6 h-6 text-gray-400 group-hover:text-[#345A7C] transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="transform transition-all duration-300 hover:scale-[1.01]">
                      <label htmlFor="headline" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-[#345A7C]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414z" />
                        </svg>
                        Headline
                      </label>
                      <div className="relative group">
                        <input
                          id="headline"
                          type="text"
                          value={headline}
                          onChange={(e) => setHeadline(e.target.value)}
                          placeholder="e.g., Sunday Service"
                          className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#345A7C]/20 focus:border-[#345A7C] transition-all duration-300 text-lg font-medium placeholder-gray-400 hover:border-gray-300"
                          disabled={status !== 'idle'}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                          <svg className="w-5 h-5 text-[#345A7C]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="transform transition-all duration-300 hover:scale-[1.01]">
                      <label htmlFor="subheadline" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-[#345A7C]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 4a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 012-2h12z" />
                        </svg>
                        Sub-headline
                      </label>
                      <div className="relative group">
                        <input
                          id="subheadline"
                          type="text"
                          value={subHeadline}
                          onChange={(e) => setSubHeadline(e.target.value)}
                          placeholder="e.g., Join us at 10am"
                          className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#345A7C]/20 focus:border-[#345A7C] transition-all duration-300 text-lg font-medium placeholder-gray-400 hover:border-gray-300"
                          disabled={status !== 'idle'}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                          <svg className="w-5 h-5 text-[#345A7C]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="transform transition-all duration-300 hover:scale-[1.01]">
                      <label htmlFor="style" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-[#345A7C]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                        </svg>
                        Typography Style
                      </label>
                      <div className="relative">
                        <select
                          id="style"
                          value={typographyStyle}
                          onChange={(e) => setTypographyStyle(e.target.value as any)}
                          className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#345A7C]/20 focus:border-[#345A7C] transition-all duration-300 text-lg font-medium appearance-none cursor-pointer hover:border-gray-300"
                          disabled={status !== 'idle'}
                        >
                          <option value="focused">Focused</option>
                          <option value="trendy">Trendy</option>
                          <option value="kids">Kids</option>
                          <option value="handwritten">Handwritten</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleGenerateTypography}
                      disabled={status !== 'idle' || !headline.trim() || !subHeadline.trim() || !credits?.credits_remaining}
                      className={`group w-full py-5 px-8 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] hover:from-[#2A4B6A] hover:to-[#8EAFC5] transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl relative overflow-hidden ${
                        status !== 'idle' || !headline.trim() || !subHeadline.trim() || !credits?.credits_remaining ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                      <span className="relative flex items-center justify-center">
                        <svg className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Generate Typography Options
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Step 2: Typography Selection */}
          {typographyOptions.length > 0 && (
            <AnimatedSection delay={0.2}>
              <div ref={typographySectionRef} className={`mb-8 transition-all duration-700 ${currentStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#345A7C] to-[#A1C1D7] text-white flex items-center justify-center font-bold text-lg shadow-lg transform group-hover:rotate-6 transition-transform duration-500">
                        2
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 ml-4">Choose Your Typography</h3>
                      <div className="ml-auto animate-pulse">
                        <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>

                    <TypographySelector
                      options={typographyOptions}
                      selectedOption={selectedTypography}
                      onSelect={setSelectedTypography}
                      isLoading={isGeneratingTypography(status)}
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Step 3: Background Description */}
          {selectedTypography && (
            <AnimatedSection delay={0.3}>
              <div ref={backgroundSectionRef} className={`mb-8 transition-all duration-700 ${currentStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#345A7C] to-[#A1C1D7] text-white flex items-center justify-center font-bold text-lg shadow-lg transform group-hover:rotate-6 transition-transform duration-500">
                        3
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 ml-4">Describe Your Background</h3>
                      <div className="ml-auto">
                        <svg className="w-6 h-6 text-green-500 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label htmlFor="background" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-[#345A7C]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                          Background Description
                        </label>
                        
                        {isLoadingSuggestions ? (
                          <div className="mb-4 flex gap-3">
                            <div className="animate-pulse flex space-x-3">
                              {[1, 2, 3].map((i) => (
                                <div key={i} className="h-10 w-36 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
                              ))}
                            </div>
                          </div>
                        ) : backgroundSuggestions.length > 0 && (
                          <div className="mb-4 flex flex-wrap gap-2">
                            <p className="text-xs text-gray-500 w-full mb-2 font-medium">Quick suggestions:</p>
                            {backgroundSuggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => setBackgroundDescription(suggestion)}
                                onMouseEnter={() => setHoveredSuggestion(index)}
                                onMouseLeave={() => setHoveredSuggestion(null)}
                                className={`px-4 py-2 text-sm bg-gradient-to-r from-gray-100 to-gray-200 hover:from-[#345A7C] hover:to-[#A1C1D7] hover:text-white rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md ${
                                  hoveredSuggestion === index ? 'ring-2 ring-[#345A7C]/30' : ''
                                }`}
                                type="button"
                              >
                                <span className="flex items-center">
                                  <svg className={`w-3 h-3 mr-1 transition-transform duration-300 ${hoveredSuggestion === index ? 'rotate-12' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  {suggestion}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                        
                        <div className="relative group">
                          <textarea
                            id="background"
                            value={backgroundDescription}
                            onChange={(e) => setBackgroundDescription(e.target.value)}
                            placeholder="e.g., A peaceful sunrise over mountains with soft clouds"
                            rows={4}
                            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#345A7C]/20 focus:border-[#345A7C] transition-all duration-300 text-lg font-medium placeholder-gray-400 resize-none hover:border-gray-300"
                            disabled={status !== 'idle'}
                          />
                          <div className="absolute bottom-3 right-3 text-xs text-gray-400 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                            {backgroundDescription.length} characters
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleGenerateFinalPoster}
                        disabled={status !== 'idle' || !backgroundDescription.trim() || !credits?.credits_remaining}
                        className={`group w-full py-5 px-8 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] hover:from-[#2A4B6A] hover:to-[#8EAFC5] transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl relative overflow-hidden ${
                          status !== 'idle' || !backgroundDescription.trim() || !credits?.credits_remaining ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                        <span className="relative flex items-center justify-center">
                          <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Generate Final Artwork
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Error Display */}
          {error && (
            <AnimatedSection>
              <div className="mb-6 p-5 bg-red-50 border-2 border-red-200 text-red-700 rounded-2xl flex items-center animate-shake shadow-lg">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Error</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Step 4: Final Result */}
          {finalPosterUrl && (
            <AnimatedSection delay={0.4}>
              <div ref={resultSectionRef} className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 transition-all duration-500 hover:shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-lg transform group-hover:rotate-6 transition-transform duration-500 animate-bounce">
                      ✓
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 ml-4">Your Sermon Artwork</h3>
                    <div className="ml-auto flex space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse animation-delay-200"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse animation-delay-400"></div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="transform transition-all duration-500 hover:scale-[1.02]">
                      <ImageDisplay
                        imageUrl={finalPosterUrl}
                        status={status}
                        onRegenerate={handleGenerateFinalPoster}
                      />
                    </div>

                    {!animatedVideoUrl && (
                      <button
                        onClick={handleAnimatePoster}
                        disabled={status !== 'idle' && status !== 'complete'}
                        className={`group w-full py-5 px-8 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl relative overflow-hidden ${
                          status !== 'idle' && status !== 'complete' ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                        <span className="relative flex items-center justify-center">
                          <svg className="w-6 h-6 mr-3 group-hover:rotate-180 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Animate Your Artwork
                          <span className="ml-2 text-sm opacity-75">(Beta)</span>
                        </span>
                      </button>
                    )}

                    {animatedVideoUrl && (
                      <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                        <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                          <svg className="w-6 h-6 mr-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                          </svg>
                          Animated Version
                        </h4>
                        <div className="relative rounded-xl overflow-hidden shadow-2xl group">
                          <video
                            controls
                            loop
                            autoPlay
                            muted
                            className="w-full rounded-xl"
                            src={animatedVideoUrl}
                          >
                            Your browser does not support the video tag.
                          </video>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                        <div className="mt-6 flex flex-col sm:flex-row gap-4">
                          <a
                            href={animatedVideoUrl}
                            download
                            className="group flex-1 inline-flex items-center justify-center px-6 py-4 text-base font-bold rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                          >
                            <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download Video
                          </a>
                          <button
                            onClick={() => {
                              // Share functionality
                              if (navigator.share) {
                                navigator.share({
                                  title: 'Check out my sermon artwork!',
                                  text: `${headline} - ${subHeadline}`,
                                  url: animatedVideoUrl
                                });
                              }
                            }}
                            className="group flex-1 inline-flex items-center justify-center px-6 py-4 text-base font-bold rounded-xl text-purple-700 bg-purple-100 hover:bg-purple-200 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9 9 0 10-13.432 0m13.432 0A9 9 0 0112 21m3-3a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Share
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Success celebration */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl text-center">
                      <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Artwork Created Successfully!</h4>
                      <p className="text-gray-600">Your sermon artwork has been saved to your library.</p>
                      <button
                        onClick={() => window.location.href = '/library'}
                        className="mt-4 inline-flex items-center text-green-600 hover:text-green-700 font-semibold transition-colors duration-300"
                      >
                        View in Library
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
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