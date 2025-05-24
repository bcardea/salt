import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

interface HeaderProps {
  session: Session | null;
  currentRole?: 'pastor' | 'staff';
  onRoleChange?: (role: 'pastor' | 'staff') => void;
}

const Header: React.FC<HeaderProps> = ({ session, currentRole = 'pastor', onRoleChange }) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/70 backdrop-blur-sm border-b border-[#A1C1D7]/10' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center pt-4 pb-4 sm:pb-6">
          {/* Logo */}
          <Link to="/" className="mb-4 sm:mb-6">
            <img 
              src="https://storage.googleapis.com/msgsndr/jI35EgXT0cs2YnriH7gl/media/6830d6176126fb5dc2343645.png"
              alt="SALT Creative"
              className="h-10 sm:h-12 w-auto"
            />
          </Link>
          
          {/* Navigation */}
          <div className="flex flex-col sm:flex-row items-center w-full max-w-4xl gap-4 sm:gap-0 relative">
            {/* Left side - Main nav links */}
            <div className="flex items-center gap-6 sm:gap-8 order-1">
              <Link 
                to="/" 
                className={`text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                  location.pathname === '/' 
                    ? 'text-[#345A7C] after:content-[""] after:block after:h-0.5 after:bg-[#345A7C] after:mt-0.5' 
                    : 'text-[#7F8C8D] hover:text-[#345A7C]'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/generator" 
                className={`text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                  location.pathname === '/generator'
                    ? 'text-[#345A7C] after:content-[""] after:block after:h-0.5 after:bg-[#345A7C] after:mt-0.5'
                    : 'text-[#7F8C8D] hover:text-[#345A7C]'
                }`}
              >
                Create
              </Link>
              {session && (
                <Link 
                  to="/library" 
                  className={`text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                    location.pathname === '/library'
                      ? 'text-[#345A7C] after:content-[""] after:block after:h-0.5 after:bg-[#345A7C] after:mt-0.5'
                      : 'text-[#7F8C8D] hover:text-[#345A7C]'
                  }`}
                >
                  Library
                </Link>
              )}
            </div>

            {/* Right side - Role toggle and auth */}
            <div className="flex items-center gap-6 order-2 sm:ml-auto">
              {/* Role Toggle - Only show on homepage */}
              {location.pathname === '/' && onRoleChange && (
                <div className="sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 flex items-center gap-1 rounded-full p-1 sm:p-1.5 shadow-xl border border-[#A1C1D7]/20">
                  <button
                    onClick={() => onRoleChange('pastor')}
                    className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                      currentRole === 'pastor' 
                        ? 'bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] text-white shadow-lg transform scale-105' 
                        : 'text-[#345A7C] hover:text-[#345A7C] hover:bg-white/30'
                    }`}
                  >
                    For Pastors
                  </button>
                  <button
                    onClick={() => onRoleChange('staff')}
                    className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                      currentRole === 'staff' 
                        ? 'bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] text-white shadow-lg transform scale-105' 
                        : 'text-[#345A7C] hover:text-[#345A7C] hover:bg-white/30'
                    }`}
                  >
                    For Church Staff
                  </button>
                </div>
              )}
              
              {session ? (
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full text-[#345A7C] hover:text-white bg-white/90 hover:bg-gradient-to-r hover:from-[#345A7C] hover:to-[#A1C1D7] border border-[#A1C1D7] hover:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/generator"
                  className="inline-flex items-center px-6 py-2 text-sm font-semibold rounded-full text-white bg-gradient-to-r from-[#345A7C] to-[#A1C1D7] hover:from-[#2A4B6A] hover:to-[#8EAFC5] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Get Started
                  <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;