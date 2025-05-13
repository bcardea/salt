import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6823ca4c265ab54a423ecbb6.png"
                alt="SALT Creative"
                className="h-8"
              />
              <span className="text-xl font-serif font-semibold text-secondary-900">
                SALT Creative
              </span>
            </Link>
          </div>
          
          <nav className="flex space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-secondary-900 bg-secondary-200' 
                  : 'text-secondary-700 hover:text-secondary-900 hover:bg-secondary-200'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/generator" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/generator' 
                  ? 'text-secondary-900 bg-secondary-200' 
                  : 'text-secondary-700 hover:text-secondary-900 hover:bg-secondary-200'
              }`}
            >
              Create Art
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;