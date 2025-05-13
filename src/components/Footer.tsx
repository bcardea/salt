import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sermon Art Generator</h3>
            <p className="text-secondary-200 text-sm">
              Create beautiful, custom artwork for your sermons using AI technology.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-secondary-200 hover:text-white text-sm transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/generator" className="text-secondary-200 hover:text-white text-sm transition">
                  Create Art
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-200 hover:text-white transition"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary-700 mt-8 pt-6 text-center text-secondary-300 text-sm">
          <p>&copy; {currentYear} Sermon Art Generator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;