import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SALT Creative</h3>
            <p className="text-secondary-200 text-sm">
              Create beautiful, custom artwork for your sermons using AI technology.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-200 hover:text-white text-sm transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/generator" className="text-secondary-200 hover:text-white text-sm transition">
                  Create Art
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-secondary-200 hover:text-white text-sm transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-secondary-200 hover:text-white text-sm transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-secondary-200 text-sm">
              Questions? Reach out to our support team at{' '}
              <a 
                href="mailto:salt-support@usebeanstalk.com"
                className="text-white hover:text-secondary-200 transition-colors"
              >
                support@usesaltcreative.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-secondary-700 mt-8 pt-6 text-center text-secondary-300 text-sm">
          <p>&copy; 2025 SALT Creative. Owned and managed by Beanstalk Management LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;