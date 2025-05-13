import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Paintbrush } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-primary-100 rounded-full">
                <Paintbrush className="h-6 w-6 text-primary-600" />
              </div>
              <span className="text-xl font-serif font-semibold text-secondary-900">
                Sermon Art
              </span>
            </Link>
          </div>
          
          <nav className="flex space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/' 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/generator" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/generator' 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-secondary-700 hover:text-primary-600 hover:bg-primary-50'
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