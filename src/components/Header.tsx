import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

interface HeaderProps {
  session: Session | null;
}

const Header: React.FC<HeaderProps> = ({ session }) => {
  const location = useLocation();
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  
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
          
          <nav className="flex items-center space-x-6">
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
            {session && (
              <Link 
                to="/library" 
                className={`text-sm font-medium transition-colors ${
                  location.pathname === '/library' 
                    ? 'text-secondary-900' 
                    : 'text-secondary-600 hover:text-secondary-900'
                }`}
              >
                Library
              </Link>
            )}
            {session && (
              <button
                onClick={handleLogout}
                className="flex items-center text-sm font-medium text-secondary-600 hover:text-secondary-900 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header