import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Palette, Share2 } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section with Dynamic Background */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-100 to-background"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full">
            <span className="text-secondary-600 font-medium">AI-Powered Sermon Art</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-secondary-900 mb-8 tracking-tight">
            Your Message<br />
            <span className="text-secondary-600">Deserves</span> Flavor.
          </h1>
          <p className="text-xl md:text-2xl text-secondary-600 mb-12 max-w-2xl mx-auto">
            Create stunning, professional artwork for your sermons in minutes with our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/generator" 
              className="group inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-secondary-900 rounded-full hover:bg-secondary-800 transition-all"
            >
              Start Creating
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="#how-it-works" 
              className="inline-flex items-center px-8 py-4 text-lg font-medium text-secondary-900 bg-white rounded-full hover:bg-secondary-50 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              Create with Confidence
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Transform your sermon's message into captivating visuals in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group relative">
              <div className="aspect-square bg-white rounded-3xl p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="mb-6 p-4 bg-secondary-50 rounded-2xl">
                    <Sparkles className="h-8 w-8 text-secondary-900" />
                  </div>
                  <span className="absolute top-6 right-6 text-5xl font-light text-secondary-200">01</span>
                  <h3 className="text-xl font-medium text-secondary-900 mb-4">Share Your Vision</h3>
                  <p className="text-secondary-600">
                    Tell us your sermon's message, and watch as AI understands your creative direction
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="aspect-square bg-white rounded-3xl p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="mb-6 p-4 bg-secondary-50 rounded-2xl">
                    <Palette className="h-8 w-8 text-secondary-900" />
                  </div>
                  <span className="absolute top-6 right-6 text-5xl font-light text-secondary-200">02</span>
                  <h3 className="text-xl font-medium text-secondary-900 mb-4">Choose Your Style</h3>
                  <p className="text-secondary-600">
                    Select from curated designs or customize your own unique aesthetic
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="aspect-square bg-white rounded-3xl p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="mb-6 p-4 bg-secondary-50 rounded-2xl">
                    <Share2 className="h-8 w-8 text-secondary-900" />
                  </div>
                  <span className="absolute top-6 right-6 text-5xl font-light text-secondary-200">03</span>
                  <h3 className="text-xl font-medium text-secondary-900 mb-4">Share Everywhere</h3>
                  <p className="text-secondary-600">
                    Download your artwork, perfectly sized for any platform
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              Perfect for Every Platform
            </h2>
            <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
              Create once, use everywhere. Your artwork, optimized for any medium.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Social Media', desc: 'Instagram, Facebook, Twitter' },
              { name: 'Presentations', desc: 'Slides, Projections, Screens' },
              { name: 'Print Materials', desc: 'Bulletins, Posters, Flyers' },
              { name: 'Digital Displays', desc: 'Websites, Apps, Displays' }
            ].map((platform) => (
              <div key={platform.name} className="group bg-background rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
                <h3 className="text-lg font-medium text-secondary-900 mb-2">{platform.name}</h3>
                <p className="text-sm text-secondary-600">{platform.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;