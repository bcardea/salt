import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Paintbrush, Download, RefreshCw } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <section className="bg-gradient-to-br from-primary-50 to-secondary-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
            Sermon Art Generator
          </h1>
          <p className="text-xl md:text-2xl text-secondary-700 mb-8">
            Create beautiful, custom artwork for your sermons in seconds using AI
          </p>
          <Link 
            to="/generator" 
            className="btn-primary text-lg px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Create Sermon Art
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-secondary-900 mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 hover:shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary-100 rounded-full">
                  <Book className="h-8 w-8 text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Enter Your Sermon Topic</h3>
              <p className="text-secondary-700 text-center">
                Simply type in your sermon topic, scripture reference, or key message.
              </p>
            </div>
            
            <div className="card p-6 hover:shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary-100 rounded-full">
                  <Paintbrush className="h-8 w-8 text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">AI Creates Your Image</h3>
              <p className="text-secondary-700 text-center">
                Our AI generates a custom, high-quality image that visualizes your message.
              </p>
            </div>
            
            <div className="card p-6 hover:shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary-100 rounded-full">
                  <Download className="h-8 w-8 text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Download & Use</h3>
              <p className="text-secondary-700 text-center">
                Download your image for presentations, social media, or printed materials.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/generator" 
              className="btn-secondary text-lg px-6 py-2"
            >
              Try It Now
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-6">
            Perfect for Churches and Ministries
          </h2>
          <p className="text-lg text-secondary-700 mb-8">
            Enhance your sermon presentation with custom artwork that resonates with your congregation.
            Save time and resources while creating professional-quality visuals.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm w-full sm:w-auto">
              <p className="font-medium text-secondary-900">Sunday Services</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm w-full sm:w-auto">
              <p className="font-medium text-secondary-900">Youth Ministry</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm w-full sm:w-auto">
              <p className="font-medium text-secondary-900">Bible Studies</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm w-full sm:w-auto">
              <p className="font-medium text-secondary-900">Social Media</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm w-full sm:w-auto">
              <p className="font-medium text-secondary-900">Church Events</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;