import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
            YOUR MESSAGE DESERVES FLAVOR.
          </h1>
          <p className="text-xl md:text-2xl text-secondary-600 mb-12">
           CREATE BEAUTIFUL ART FOR YOUR SERMON IN JUST A COUPLE MINUTES.
          </p>
          <Link 
            to="/generator" 
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-secondary-900 rounded-full hover:bg-secondary-800 transition-colors"
          >
            Start Creating
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-secondary-900 mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group">
              <div className="aspect-square bg-white rounded-2xl p-8 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <span className="text-5xl font-light text-secondary-300 mb-6">01</span>
                  <h3 className="text-xl font-medium text-secondary-900 mb-4">Enter Your Topic</h3>
                  <p className="text-secondary-600">
                    Share your message or theme, and let our AI understand your vision
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="aspect-square bg-white rounded-2xl p-8 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <span className="text-5xl font-light text-secondary-300 mb-6">02</span>
                  <h3 className="text-xl font-medium text-secondary-900 mb-4">Choose Your Style</h3>
                  <p className="text-secondary-600">
                    Select from curated styles or customize your own unique look
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="aspect-square bg-white rounded-2xl p-8 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <span className="text-5xl font-light text-secondary-300 mb-6">03</span>
                  <h3 className="text-xl font-medium text-secondary-900 mb-4">Download & Share</h3>
                  <p className="text-secondary-600">
                    Get your professionally crafted artwork ready for any platform
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-8">
            Perfect for Every Platform
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Social Media', 'Presentations', 'Print Materials', 'Digital Displays'].map((use) => (
              <div key={use} className="bg-background p-4 rounded-xl">
                <p className="font-medium text-secondary-900">{use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;