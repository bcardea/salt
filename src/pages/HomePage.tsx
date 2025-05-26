import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, ChevronLeft, ChevronRight, Sparkles, Clock, Users, Palette, Zap, Star, ArrowUpRight } from 'lucide-react';
import VideoModal from '../components/VideoModal';
import './embla.css';

type Role = 'pastor' | 'staff';

interface ProblemPoint {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface Feature {
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface RoleCopy {
  heroTitle: string;
  heroSubtitle: string;
  problemTitle: string;
  problemPoints: ProblemPoint[];
  solutionTitle: string;
  solutionDescription: string;
  testimonial: Testimonial;
}

interface HomePageProps {
  currentRole: Role;
  onOpenVideo: () => void;
}

const pastorGalleryImages = [
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22d083852cb5168da6.jpeg",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22e5ca6c4b88f32b74.jpeg",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22954010514b79671c.jpeg",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22d083855a19168da7.jpeg",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22a6cf15956b66dbe5.jpeg",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682937dfd0838545fb16a768.jpeg",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22954010311279671e.jpeg",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682930d3d083856dad16a0d9.jpeg",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682bb92bf08c4628785c8f5e.jpeg",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682934d49540100fc9797e22.jpeg",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682930d3a6cf15371566f04d.jpeg",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9dc469326aedc5682b.png",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6827cf2d89ba40f48fa404e8.jpeg",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68320d6043ed4d79caf3b4c6.png",
];

const staffGalleryImages = [
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22e5ca6c6882f32b73.jpeg",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68291f22a6cf15107266dbe2.jpeg",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68262b3687ff6450da9e721e.jpeg",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68262b36a32ad3085a164bf6.jpeg",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68262b369ce13305523fb0b0.jpeg",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68262b36b6b7cd59b6d72c72.jpeg",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682bbf7619f31d05a0c540f3.jpeg",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68320d60cc104cf80de7b60e.png",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68320d6043ed4d0cbcf3b4c8.png",
  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68320d60b49f1985858605a6.png",
];

const copyData = {
  pastor: {
    heroTitle: "Stunning Sermon Art in Seconds",
    heroSubtitle: "Last-minute sermon change? No problem. Create beautiful graphics instantly—even on Saturday night.",
    problemTitle: "We Know Your Challenges",
    problemPoints: [
      { icon: Clock, title: "Time is Precious", description: "Hours lost trying to design visuals from scratch" },
      { icon: Palette, title: "Design is Hard", description: "Creating professional graphics without design skills" },
      { icon: Users, title: "Resources are Limited", description: "Budgets too tight for designers or agencies" },
      { icon: Sparkles, title: "Ministry Comes First", description: "Creative tasks pulling you away from people" },
    ],
    solutionTitle: "Your 24/7 Design Assistant",
    solutionDescription: "SALT Creative transforms your ideas into beautiful visuals instantly. Built specifically for ministries like yours – easy to use, powerful, and designed to save you time.",
    testimonial: {
      quote: "When used intentionally, sermon slides can serve your people and reinforce important truths... If the statistics are accurate, there are more visual learners in our congregations (65 percent) than there are auditory ones (30 percent). So I must ask, how are you communicating God’s Word to that 65 percent?",
      author: "Anonymous Pastor",
      role: "Quote from Logo's Blog"
    }
  },
  staff: {
    heroTitle: "Empower Your Church Communications",
    heroSubtitle: "Professional graphics for your entire team, no design expertise needed.",
    problemTitle: "We Understand Your Workflow",
    problemPoints: [
      { icon: Clock, title: "Juggling Tasks", description: "Design work on top of vital responsibilities" },
      { icon: Palette, title: "Brand Consistency", description: "Maintaining unified visuals across ministries" },
      { icon: Users, title: "Limited Resources", description: "No budget for dedicated design staff" },
      { icon: Sparkles, title: "Core Mission", description: "Creative demands diverting focus from ministry" },
    ],
    solutionTitle: "Design Power for Your Team",
    solutionDescription: "SALT Creative integrates seamlessly into your workflow. Generate beautiful visuals for any ministry need instantly – intuitive, efficient, and built for busy church teams.",
    testimonial: {
      quote: "Small churches often struggle with technology adoption because there’s no one on staff whose primary role is technology. Learning new systems can feel overwhelming...",
      author: "Tony Morgan",
      role: "Church Leadership Consultant and Author"
    }
  }
} as const;

const HomePage: React.FC<HomePageProps> = ({ currentRole, onOpenVideo }) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState<string[]>(pastorGalleryImages);

  const copy = copyData[currentRole];

  useEffect(() => {
    setCurrentImages(currentRole === 'pastor' ? pastorGalleryImages : staffGalleryImages);
  }, [currentRole]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % currentImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentImages.length]);

  const handleCloseVideo = () => setIsVideoModalOpen(false);

  return (
    <div className="min-h-screen pt-64 sm:pt-64 pt-80">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F5F5DC] via-white to-[#A1C1D7]/20 -mt-64 sm:-mt-64 -mt-80 pb-20 sm:pb-24 lg:pb-28 xl:pb-32">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#345A7C] to-[#A1C1D7] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-[#A1C1D7] to-[#EFD9A0] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#345A7C] to-[#A1C1D7] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='gray' stroke-width='0.5' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`
            }}
          ></div>
        </div>

        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 sm:pt-40 pt-52">
            {/* 2-minute badge */}
            <div className="mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EFD9A0]/30 to-[#F5F5DC] border border-[#EFD9A0] rounded-full px-4 py-2">
                <Zap className="w-4 h-4 text-[#345A7C]" />
                <span className="text-sm font-semibold text-[#345A7C]">Create stunning visuals in under 2 minutes</span>
                <Sparkles className="w-4 h-4 text-[#345A7C]" />
              </div>
            </div>

            {/* Hero Content */}
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Text */}
              <div className="space-y-8 lg:pr-8">

                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    {copy.heroTitle}
                  </h1>
                  <p className="mt-6 text-xl lg:text-2xl text-gray-600 leading-relaxed">
                    {copy.heroSubtitle}
                  </p>
                </div>

                {/* Value proposition */}
                <div className="bg-gradient-to-r from-[#A1C1D7]/20 to-[#F5F5DC] rounded-2xl p-6 border border-[#A1C1D7]/30">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#345A7C] to-[#A1C1D7] rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#345A7C] mb-1">From Idea to Impact in Minutes</h3>
                      <p className="text-[#7F8C8D]">Just tell us what you want to say. Our AI handles the design, you handle the ministry.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/generator" 
                    className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full text-white bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] hover:from-[#2A4B6A] hover:to-[#8EAFC5] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
                  >
                    Start Creating Today!
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button 
                    onClick={onOpenVideo}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full text-[#345A7C] bg-white border-2 border-[#A1C1D7] hover:border-[#345A7C] hover:bg-[#F5F5DC]/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Watch 2-min Demo
                  </button>
                </div>

                {/* Trust badges */}
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex -space-x-3">
                    {[
                      'https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6832102f1dff7a784571fb64.png',
                      'https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6832102fb49f1949da860a41.png',
                      'https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6832102f1dff7a074371fb63.png',
                      'https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/683210300eaa6e2ee84dad16.png',
                      'https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6832102f0eaa6e01834dad15.png',
                    ].map((src, i) => (
                      <img 
                        key={i} 
                        src={src}
                        alt={`Church leader ${i + 1}`}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-gray-900">Created for Churches </p>
                    <p className="text-sm text-gray-600">Who Have No Creative Team On Staff.</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Gallery */}
              <div className="relative lg:pl-8">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] rounded-3xl blur-2xl opacity-20"></div>
                  
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-gray-200/50">
                    {/* Simple carousel */}
                    <div className="relative aspect-[4/3]">
                      {currentImages.map((src, index) => (
                        <img 
                          key={index}
                          src={src} 
                          alt={`Ministry visual example ${index + 1}`} 
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                            index === selectedIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      ))}
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    
                    {/* Gallery controls */}
                    <div className="absolute bottom-6 right-6 flex gap-3">
                      <button
                        onClick={() => setSelectedIndex((selectedIndex - 1 + currentImages.length) % currentImages.length)}
                        className="p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-110"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                      </button>
                      <button
                        onClick={() => setSelectedIndex((selectedIndex + 1) % currentImages.length)}
                        className="p-3 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-110"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-700" />
                      </button>
                    </div>

                    {/* Progress dots */}
                    <div className="absolute bottom-6 left-6 flex gap-2">
                      {currentImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedIndex(index)}
                          className={`transition-all duration-300 ${
                            index === selectedIndex 
                              ? 'w-8 h-2 bg-white rounded-full' 
                              : 'w-2 h-2 bg-white/50 rounded-full hover:bg-white/70'
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Floating badges */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#EFD9A0] to-[#F5F5DC] px-4 py-2 rounded-full shadow-lg transform rotate-3">
                    <span className="text-sm font-bold text-[#345A7C]">Check out these real examples made with SALT!</span>
                  </div>
                  
                  <div className="absolute bottom-4 sm:-bottom-6 left-4 sm:-left-6 bg-white rounded-xl shadow-xl p-3 sm:p-4 border border-gray-100 max-w-[200px] sm:max-w-none">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#345A7C] to-[#A1C1D7] rounded-lg flex items-center justify-center text-white">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-gray-900">AI-Powered</p>
                        <p className="text-[10px] sm:text-xs text-gray-600 leading-tight">Sermon Art created in seconds!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white -mt-12 lg:-mt-8 xl:-mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-heading font-bold text-gray-900">{copy.problemTitle}</h3>
            <p className="mt-4 text-xl text-gray-600">Let us handle the design while you focus on your calling</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {copy.problemPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div key={index} className="group hover:scale-105 transition-transform duration-300">
                  <div className="bg-white rounded-2xl p-8 h-full shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#A1C1D7] to-[#F5F5DC] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-[#345A7C]" />
                    </div>
                    <h4 className="font-bold text-lg text-gray-900 mb-3">{point.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{point.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">AI-Powered Design Assistant</span>
          </div>
          <h3 className="text-4xl lg:text-5xl font-heading font-bold mb-6">{copy.solutionTitle}</h3>
          <p className="text-xl lg:text-2xl leading-relaxed opacity-90">{copy.solutionDescription}</p>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex justify-center mb-6">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl text-gray-900 font-medium mb-8 leading-relaxed">
              "{copy.testimonial.quote}"
            </blockquote>
            <div>
              <p className="font-bold text-xl text-gray-900">{copy.testimonial.author}</p>
              <p className="text-gray-600 mt-1">{copy.testimonial.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EFD9A0]/30 to-[#F5F5DC] border border-[#EFD9A0] rounded-full px-6 py-3 mb-8">
            <CheckCircle className="w-5 h-5 text-[#345A7C]" />
            <span className="text-sm font-bold text-[#345A7C]">Free Onboarding & Training Included!</span>
          </div>
          
          <h3 className="text-5xl font-heading font-bold text-gray-900 mb-6 leading-tight">
            Ready to Transform Your<br />Ministry Communications?
          </h3>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Join the hundreds of churches who need beautiful visuals with SALT Creative.<br />
            Your first design is just 2 minutes away.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/generator" 
              className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-full text-white bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] hover:from-[#2A4B6A] hover:to-[#8EAFC5] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Create Your First Visual
              <ArrowUpRight className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
            <button 
              onClick={onOpenVideo}
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-full text-[#345A7C] bg-white border-2 border-[#A1C1D7] hover:border-[#345A7C] hover:bg-[#F5F5DC]/50 transition-all duration-300 shadow-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <VideoModal onClose={handleCloseVideo} />
      )}
    </div>
  );
};

export default HomePage;
