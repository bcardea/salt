import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Palette, Share2 } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-secondary-50 to-white">
        {/* Mascot */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-20 h-20 opacity-90">
          <img 
            src="https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/66c4cab2908c2c648fb54238.svg"
            alt="SALT Creative Mascot"
            className="w-full h-full"
          />
        </div>

        {/* Main Content */}
        <div className="max-w-[1400px] mx-auto w-full">
          {/* Transformation Flow */}
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Source Content */}
            <div className="relative">
              <div className="text-center lg:text-left mb-6">
                <span className="inline-block text-lg font-medium text-secondary-600">From this...</span>
              </div>
              <div className="relative mx-auto lg:ml-0 max-w-md">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/682523349cd8fb6bde9bbb09.jpeg"
                    alt="Sermon Notes"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Transformed Content */}
            <div className="relative">
              <div className="text-center lg:text-left mb-6">
                <span className="inline-block text-lg font-medium text-secondary-600">To these...</span>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {[
                  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251c81183ce502b0921294.png",
                  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9db098801ec44508d0.png",
                  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9dc469326aedc5682b.png",
                  "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9d9cd8fb87c29ba7f0.png"
                ].map((src, index) => (
                  <div 
                    key={index}
                    className="group relative rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <img 
                      src={src}
                      alt="Transformed artwork"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-secondary-900 mb-6 tracking-tight leading-tight">
              Your Message<br />
              <span className="text-secondary-600">Deserves</span> Flavor.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-secondary-600 mb-10 max-w-2xl mx-auto">
              Create stunning, professional artwork for your sermons in minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/generator" 
                className="w-full sm:w-auto group inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-secondary-900 rounded-full hover:bg-secondary-800 transition-all shadow-lg hover:shadow-xl"
              >
                Start Creating
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="#examples" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-secondary-900 bg-white rounded-full hover:bg-secondary-50 transition-all shadow-lg hover:shadow-xl"
              >
                View Examples
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Inspiring Examples
            </h2>
            <p className="text-lg md:text-xl text-secondary-600 max-w-2xl mx-auto">
              See what's possible with our design system
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {[
              "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251c81183ce502b0921294.png",
              "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9db098801ec44508d0.png",
              "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9dc469326aedc5682b.png",
              "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9d9cd8fb87c29ba7f0.png",
              "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9c9cd8fb4b3d9ba7ed.png",
              "https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/68251a9c183ce57ad6921011.png"
            ].map((src, index) => (
              <div 
                key={index}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary-100"
              >
                <img 
                  src={src}
                  alt="Example artwork"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 via-secondary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Link
                      to="/generator"
                      className="inline-flex items-center text-white font-medium"
                    >
                      Create Similar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Create with Confidence
            </h2>
            <p className="text-lg md:text-xl text-secondary-600 max-w-2xl mx-auto">
              Transform your sermon's message into captivating visuals in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-12">
            <div className="group relative">
              <div className="aspect-square bg-white rounded-3xl p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="mb-6 p-4 bg-secondary-50 rounded-2xl">
                    <Sparkles className="h-8 w-8 text-secondary-900" />
                  </div>
                  <span className="absolute top-6 right-6 text-4xl md:text-5xl font-light text-secondary-200">01</span>
                  <h3 className="text-lg md:text-xl font-medium text-secondary-900 mb-4">Share Your Vision</h3>
                  <p className="text-sm md:text-base text-secondary-600">
                    Tell us your sermon's message, and watch as we understand your creative direction
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="aspect-square bg-white rounded-3xl p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="mb-6 p-4 bg-secondary-50 rounded-2xl">
                    <Palette className="h-8 w-8 text-secondary-900" />
                  </div>
                  <span className="absolute top-6 right-6 text-4xl md:text-5xl font-light text-secondary-200">02</span>
                  <h3 className="text-lg md:text-xl font-medium text-secondary-900 mb-4">Choose Your Style</h3>
                  <p className="text-sm md:text-base text-secondary-600">
                    Select from curated designs or customize your own unique aesthetic
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group relative sm:col-span-2 md:col-span-1">
              <div className="aspect-square bg-white rounded-3xl p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="mb-6 p-4 bg-secondary-50 rounded-2xl">
                    <Share2 className="h-8 w-8 text-secondary-900" />
                  </div>
                  <span className="absolute top-6 right-6 text-4xl md:text-5xl font-light text-secondary-200">03</span>
                  <h3 className="text-lg md:text-xl font-medium text-secondary-900 mb-4">Share Everywhere</h3>
                  <p className="text-sm md:text-base text-secondary-600">
                    Download your artwork, perfectly sized for any platform
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Perfect for Every Platform
            </h2>
            <p className="text-lg md:text-xl text-secondary-600 max-w-2xl mx-auto">
              Create once, use everywhere. Your artwork, optimized for any medium.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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