import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, ChevronLeft, ChevronRight, Sparkles, Clock, Users, Palette, Zap, Star, ArrowUpRight, X, Brain, Search, MessageSquare, Flame } from 'lucide-react';
import './embla.css';

type Role = 'pastor' | 'staff';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  time: string;
  gradient: string;
}

interface ProblemPoint {
  icon: React.ComponentType<{ className?: string }>;
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

const features: Feature[] = [
  {
    icon: Palette,
    title: "SALT Art",
    subtitle: "Stunning Sermon Graphics",
    description: "Transform your sermon ideas into beautiful visuals instantly. No design skills needed.",
    time: "< 2 minutes",
    gradient: "from-[#345A7C] to-[#A1C1D7]"
  },
  {
    icon: Brain,
    title: "Flavor",
    subtitle: "Fresh Sermon Angles",
    description: "Beat creative blocks with multiple sermon angles and full outlines in 90 seconds.",
    time: "90 seconds",
    gradient: "from-[#A1C1D7] to-[#EFD9A0]"
  },
  {
    icon: Search,
    title: "Depth",
    subtitle: "Instant Research",
    description: "Get comprehensive biblical and theological research documents in minutes.",
    time: "< 5 minutes",
    gradient: "from-[#EFD9A0] to-[#F5F5DC]"
  },
  {
    icon: MessageSquare,
    title: "Aroma",
    subtitle: "Multi-Channel Content",
    description: "Create optimized content for social media, newsletters, and more in seconds.",
    time: "< 30 seconds",
    gradient: "from-[#F5F5DC] to-[#345A7C]"
  }
];

const copyData = {
  pastor: {
    heroTitle: "Everything You Need for Sunday, Ready in Minutes",
    heroSubtitle: "From sermon graphics to research, outlines to social posts—SALT is your complete ministry toolkit that saves hours every week.",
    problemTitle: "We Know Your Biggest Challenges",
    problemPoints: [
      { icon: Clock, title: "Time Management Crisis", description: "Drowning in admin tasks, emails, and content creation" },
      { icon: Brain, title: "Creative Blocks", description: "Constant pressure for fresh, relevant sermon content" },
      { icon: Users, title: "Community Engagement", description: "Struggling to connect with modern audiences" },
      { icon: Flame, title: "Burnout Risk", description: "Overwhelming workload threatening your well-being" },
    ],
    solutionTitle: "Your Complete Sunday Preparation Suite",
    solutionDescription: "SALT transforms hours of work into minutes. Create stunning graphics, overcome creative blocks, conduct deep research, and engage your community—all in one powerful platform designed specifically for pastors.",
    testimonial: {
      quote: "When used intentionally, sermon slides can serve your people and reinforce important truths... If the statistics are accurate, there are more visual learners in our congregations (65 percent) than there are auditory ones (30 percent). So I must ask, how are you communicating God's Word to that 65 percent?",
      author: "Anonymous Pastor",
      role: "Quote from Logo's Blog"
    }
  },
  staff: {
    heroTitle: "Your Church's Complete Creative Suite",
    heroSubtitle: "Professional graphics, engaging content, and powerful tools—everything your team needs to communicate effectively, no expertise required.",
    problemTitle: "We Understand Your Workflow",
    problemPoints: [
      { icon: Clock, title: "Juggling Tasks", description: "Design work on top of vital responsibilities" },
      { icon: Palette, title: "Brand Consistency", description: "Maintaining unified visuals across ministries" },
      { icon: Users, title: "Limited Resources", description: "No budget for dedicated design staff" },
      { icon: Sparkles, title: "Core Mission", description: "Creative demands diverting focus from ministry" },
    ],
    solutionTitle: "Empower Your Entire Team",
    solutionDescription: "SALT Creative integrates seamlessly into your workflow. Generate beautiful visuals, create engaging content, and maintain consistent branding across all ministries—intuitive, efficient, and built for busy church teams.",
    testimonial: {
      quote: "Small churches often struggle with technology adoption because there's no one on staff whose primary role is technology. Learning new systems can feel overwhelming...",
      author: "Tony Morgan",
      role: "Church Leadership Consultant and Author"
    }
  }
} as const;

const HomePage: React.FC<HomePageProps> = ({ currentRole }) => {
  const [isSupademoModalOpen, setIsSupademoModalOpen] = useState(false);
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
                <span className="text-sm font-semibold text-[#345A7C]">Complete Sunday prep in under 10 minutes</span>
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

                {/* Feature pills */}
                <div className="flex flex-wrap gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 shadow-sm">
                      <feature.icon className="w-4 h-4 text-[#345A7C]" />
                      <span className="text-sm font-medium text-gray-700">{feature.title}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/generator" 
                    className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full text-white bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] hover:from-[#2A4B6A] hover:to-[#8EAFC5] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
                  >
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button 
                    onClick={() => setIsSupademoModalOpen(true)}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-full text-[#345A7C] bg-white border-2 border-[#A1C1D7] hover:border-[#345A7C] hover:bg-[#F5F5DC]/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    See It In Action
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
                    <p className="text-sm font-semibold text-gray-900">Trusted by 500+ Churches</p>
                    <p className="text-sm text-gray-600">Saving hours every week</p>
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
                    <span className="text-sm font-bold text-[#345A7C]">Real examples made with SALT!</span>
                  </div>
                  
                  <div className="absolute bottom-4 sm:-bottom-6 left-4 sm:-left-6 bg-white rounded-xl shadow-xl p-3 sm:p-4 border border-gray-100 max-w-[200px] sm:max-w-none">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#345A7C] to-[#A1C1D7] rounded-lg flex items-center justify-center text-white">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-gray-900">4 Powerful Tools</p>
                        <p className="text-[10px] sm:text-xs text-gray-600 leading-tight">Everything for Sunday prep!</p>
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
            <p className="mt-4 text-xl text-gray-600">Based on research from thousands of pastors worldwide</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {copy.problemPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <div key={index} className="group hover:scale-105 transition-transform duration-300">
                  <div className="bg-white rounded-2xl p-8 h-full shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-red-600" />
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

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EFD9A0]/30 to-[#F5F5DC] border border-[#EFD9A0] rounded-full px-6 py-3 mb-6">
              <Sparkles className="w-5 h-5 text-[#345A7C]" />
              <span className="font-semibold text-[#345A7C]">The Complete Ministry Toolkit</span>
            </div>
            <h3 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">One Platform. Four Powerful Tools.</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Everything you need to prepare for Sunday and engage your community throughout the week.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-xl"
                     style={{ background: `linear-gradient(to right, ${feature.gradient.split(' ')[1]}, ${feature.gradient.split(' ')[3]})` }}></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-transparent">
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-lg font-medium text-[#345A7C] mb-3">{feature.subtitle}</p>
                      <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#345A7C]">
                        <Clock className="w-4 h-4" />
                        <span>Ready in {feature.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
            <Flame className="w-5 h-5" />
            <span className="font-semibold">Reclaim Your Time & Passion</span>
          </div>
          <h3 className="text-4xl lg:text-5xl font-heading font-bold mb-6">{copy.solutionTitle}</h3>
          <p className="text-xl lg:text-2xl leading-relaxed opacity-90 mb-12">{copy.solutionDescription}</p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-4xl font-bold mb-2">10min</div>
              <div className="text-sm opacity-80">Complete Sunday Prep</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4 Tools</div>
              <div className="text-sm opacity-80">In One Platform</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm opacity-80">Churches Served</div>
            </div>
          </div>
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
            <span className="text-sm font-bold text-[#345A7C]">No Credit Card Required • Free Onboarding</span>
          </div>
          
          <h3 className="text-5xl font-heading font-bold text-gray-900 mb-6 leading-tight">
            Ready to Transform Your<br />Ministry Workflow?
          </h3>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Join hundreds of pastors who are saving hours every week.<br />
            Your complete Sunday preparation is just minutes away.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/generator" 
              className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-full text-white bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] hover:from-[#2A4B6A] hover:to-[#8EAFC5] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Start Your Free Trial
              <ArrowUpRight className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
            <button 
              onClick={() => setIsSupademoModalOpen(true)}
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-full text-[#345A7C] bg-white border-2 border-[#A1C1D7] hover:border-[#345A7C] hover:bg-[#F5F5DC]/50 transition-all duration-300 shadow-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch 2-Min Demo
            </button>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isSupademoModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-75 p-4" onClick={() => setIsSupademoModalOpen(false)}>
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl mx-auto" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsSupademoModalOpen(false)}
              className="absolute -top-2 -right-2 text-gray-700 bg-white hover:text-black rounded-full p-1.5 z-20 shadow-md border border-gray-200"
              aria-label="Close demo"
            >
              <X className="w-5 h-5" />
            </button>
            <div style={{ position: 'relative', boxSizing: 'content-box', width: '100%', aspectRatio: '1.7929864253393666', maxHeight: 'calc(90vh - 32px)', overflow: 'hidden', borderRadius: '0.5rem' }}>
              <iframe
                src="https://app.supademo.com/embed/cmbfev6ye3x7psn1rzrp92jim?embed_v=2"
                loading="lazy"
                title="Usesaltcreative Demo"
                allow="clipboard-write"
                frameBorder="0"
                allowFullScreen
                style={{ display: 'block', width: '100%', height: '100%' }}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;