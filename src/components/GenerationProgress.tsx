import React, { useState, useEffect, useRef } from 'react';

type GenerationStatus = 'idle' | 'generating-typography' | 'generating-poster' | 'animating' | 'complete' | 'error';

interface GenerationProgressProps {
  startTime: number;
  sermonTitle: string;
  stylePreset?: string;
  status: GenerationStatus;
}

const tips = [
  "SALT's proprietary AI is now crafting your artwork by infusing your details into our design...",
  "Although our AI is impressive, it's not perfect. Occasionally, it can make a mistake, especially when it comes to the typography...",
  "When your image is delivered, if it doesn't meet your expectations, we provide one free regeneration of your image that will not take from your credits...",
  "In order to regenerate your image, you'll simply click the regenerate button right next to the download button when viewing your image...",
  "Currently, your artwork is being generated using V1 of SALT AI...",
  "We're actively working on V2 of SALT which will include video generation, enhanced customization and more...",
  "If you have any questions or need support, send us an email at support@usesaltcreative.com...",
  "Find us on Social Media! Share a generation from SALT with our account tagged and we'll send you a pack of bonus credits..."
];

const GenerationProgress: React.FC<GenerationProgressProps> = ({
  startTime,
  sermonTitle,
  stylePreset,
  status
}) => {
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Create floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1
    }));
    setParticles(newParticles);
  }, []);

  // Progress and timers
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 - prev) * 0.02;
        return newProgress > 99 ? 99 : newProgress;
      });
    }, 500);

    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 6000);

    const timeInterval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(tipInterval);
      clearInterval(timeInterval);
    };
  }, [startTime]);

  // Canvas animation for background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;
    const stars: Array<{ x: number; y: number; size: number; speed: number; opacity: number }> = [];

    // Create stars with brand colors
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars with gold accent
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        // Mix of beige and gold stars
        const isGold = Math.random() > 0.7;
        ctx.fillStyle = isGold 
          ? `rgba(239, 217, 160, ${star.opacity})` // Gold
          : `rgba(245, 245, 220, ${star.opacity})`; // Beige
        ctx.fill();

        // Move star
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'generating-typography':
        return (
          <svg className="w-8 h-8 text-[#A1C1D7] animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
        );
      case 'generating-poster':
        return (
          <svg className="w-8 h-8 text-[#EFD9A0] animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        );
      case 'animating':
        return (
          <svg className="w-8 h-8 text-[#A1C1D7] animate-spin" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#345A7C] via-[#2a4a68] to-[#1f3a54] flex items-center justify-center z-50 overflow-hidden">
      {/* Canvas for star animation */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-50" />

      {/* Floating particles with brand colors */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.id % 3 === 0 ? '#EFD9A0' : '#F5F5DC',
            opacity: 0.3,
            animationDelay: `${particle.id * 0.1}s`,
            animationDuration: `${20 + particle.id % 10}s`
          }}
        />
      ))}

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        {/* Brand Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-[#EFD9A0]/20 blur-xl rounded-full animate-pulse"></div>
            <img 
              src="https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/683ddb5b4da9cdbece14f657.png" 
              alt="SALT Logo" 
              className="w-16 h-16 relative z-10 animate-pulse"
            />
          </div>
        </div>

        {/* Status icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-[#A1C1D7]/20 blur-xl rounded-full animate-pulse"></div>
            {getStatusIcon()}
          </div>
        </div>

        {/* Main content with brand colors */}
        <div className="mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5DC] via-[#EFD9A0] to-[#F5F5DC] animate-gradient-x">
            {status === 'idle' ? 'Initializing Creation Engine...' : 'Crafting Your Divine Artwork'}
          </h2>
          
          <div className="space-y-2">
            <p className="text-xl text-[#F5F5DC] font-medium animate-fade-in flex items-center justify-center">
              <svg className="w-5 h-5 mr-2 text-[#EFD9A0] animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              {sermonTitle}
              <svg className="w-5 h-5 ml-2 text-[#EFD9A0] animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </p>
            {stylePreset && (
              <p className="text-sm text-[#A1C1D7] uppercase tracking-wider animate-fade-in animation-delay-200">
                Style: <span className="text-[#EFD9A0] font-semibold">{stylePreset}</span>
              </p>
            )}
          </div>

          <div className="text-lg text-[#F5F5DC]/80 mt-6 font-light animate-fade-in animation-delay-400">
            {status === 'generating-typography' && (
              <span className="flex items-center justify-center">
                <span className="w-2 h-2 bg-[#A1C1D7] rounded-full mr-3 animate-pulse"></span>
                Designing elegant typography for your sacred message...
                <span className="w-2 h-2 bg-[#A1C1D7] rounded-full ml-3 animate-pulse"></span>
              </span>
            )}
            {status === 'generating-poster' && (
              <span className="flex items-center justify-center">
                <span className="w-2 h-2 bg-[#EFD9A0] rounded-full mr-3 animate-pulse"></span>
                Painting the perfect backdrop for your inspiration...
                <span className="w-2 h-2 bg-[#EFD9A0] rounded-full ml-3 animate-pulse"></span>
              </span>
            )}
            {status === 'animating' && (
              <span className="flex items-center justify-center">
                <span className="w-2 h-2 bg-[#A1C1D7] rounded-full mr-3 animate-pulse"></span>
                Breathing life into your artwork with motion...
                <span className="w-2 h-2 bg-[#A1C1D7] rounded-full ml-3 animate-pulse"></span>
              </span>
            )}
          </div>
        </div>

        {/* Enhanced Progress ring with brand colors */}
        <div className="relative w-64 h-64 mx-auto mb-12">
          {/* Outer glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#A1C1D7] to-[#EFD9A0] rounded-full blur-2xl opacity-30 animate-pulse"></div>
          
          {/* Progress ring container */}
          <div className="relative w-full h-full">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background ring */}
              <circle
                cx="128"
                cy="128"
                r="100"
                stroke="url(#gradient-bg)"
                strokeWidth="8"
                fill="none"
                className="opacity-20"
              />
              {/* Progress ring */}
              <circle
                cx="128"
                cy="128"
                r="100"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 100}`}
                strokeDashoffset={`${2 * Math.PI * 100 * (1 - progress / 100)}`}
                className="transition-all duration-700 ease-out filter drop-shadow-lg"
                strokeLinecap="round"
              />
              {/* Inner decorative ring */}
              <circle
                cx="128"
                cy="128"
                r="85"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                className="opacity-50"
                strokeDasharray="5 10"
              />
              {/* Define gradients with brand colors */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A1C1D7" />
                  <stop offset="50%" stopColor="#EFD9A0" />
                  <stop offset="100%" stopColor="#A1C1D7" />
                </linearGradient>
                <linearGradient id="gradient-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5F5DC" />
                  <stop offset="100%" stopColor="#F5F5DC" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="relative">
                <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5DC] to-[#EFD9A0] tabular-nums">
                  {Math.floor(progress)}
                </span>
                <span className="text-3xl font-light text-[#F5F5DC]/80 ml-1">%</span>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <svg className="w-4 h-4 text-[#A1C1D7]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-[#A1C1D7] font-mono">{formatTime(elapsedTime)}</span>
              </div>
            </div>
          </div>

          {/* Orbiting particles with brand colors */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-r from-[#EFD9A0] to-[#A1C1D7] rounded-full animate-orbit"
              style={{
                top: '50%',
                left: '50%',
                animationDelay: `${i * 1.5}s`,
                animationDuration: '4s'
              }}
            />
          ))}
        </div>

        {/* Enhanced loading animation with brand colors */}
        <div className="flex justify-center mb-8 space-x-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="relative">
              <div
                className="w-2 h-8 bg-gradient-to-t from-[#A1C1D7] to-[#EFD9A0] rounded-full animate-wave"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1.5s'
                }}
              />
              <div
                className="absolute inset-0 w-2 h-8 bg-gradient-to-t from-[#A1C1D7] to-[#EFD9A0] rounded-full blur-sm animate-wave"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1.5s'
                }}
              />
            </div>
          ))}
        </div>

        {/* Tips carousel with brand styling */}
        <div className="relative h-24 overflow-hidden rounded-2xl bg-[#F5F5DC]/10 backdrop-blur-sm p-6 border border-[#F5F5DC]/20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#EFD9A0]/10 to-transparent animate-shimmer"></div>
          <p className="text-[#F5F5DC]/90 leading-relaxed animate-fade-in-out text-sm md:text-base">
            <span className="inline-block mr-2 text-[#EFD9A0] animate-pulse">💡</span>
            {tips[currentTip]}
          </p>
        </div>

        {/* Enhanced time estimate with brand colors */}
        <div className="mt-8 flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-[#A1C1D7]">
            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Processing with SALT AI v1.0</span>
          </div>
          <div className="w-px h-4 bg-[#7F8C8D]"></div>
          <div className="text-sm text-[#A1C1D7]">
            ETA: <span className="text-[#EFD9A0] font-mono">{Math.max(90 - elapsedTime, 0)}s</span>
          </div>
        </div>

        {/* Progress stages indicator with brand colors */}
        <div className="mt-8 flex justify-center space-x-2">
          <div className={`h-1 w-16 rounded-full transition-colors duration-500 ${
            status === 'generating-typography' ? 'bg-[#A1C1D7]' : 'bg-[#7F8C8D]/50'
          }`}></div>
          <div className={`h-1 w-16 rounded-full transition-colors duration-500 ${
            status === 'generating-poster' ? 'bg-[#EFD9A0]' : 'bg-[#7F8C8D]/50'
          }`}></div>
          <div className={`h-1 w-16 rounded-full transition-colors duration-500 ${
            status === 'animating' ? 'bg-[#A1C1D7]' : 'bg-[#7F8C8D]/50'
          }`}></div>
        </div>
      </div>

      {/* Animated background gradients with brand colors */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#A1C1D7]/20 to-[#EFD9A0]/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-[#EFD9A0]/20 to-[#F5F5DC]/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#345A7C]/10 to-[#A1C1D7]/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>
    </div>
  );
};

export default GenerationProgress;