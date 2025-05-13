import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="bg-background border-b border-secondary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link to="/" className="flex items-center">
            <img 
              src="https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6823ca4c265ab54a423ecbb6.png"
              alt="SALT Creative"
              className="h-12 w-auto"
            />
          </Link>
          
          <nav className="flex space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'text-secondary-900' 
                  : 'text-secondary-600 hover:text-secondary-900'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/generator" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === '/generator' 
                  ? 'text-secondary-900' 
                  : 'text-secondary-600 hover:text-secondary-900'
              }`}
            >
              Create Art
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}