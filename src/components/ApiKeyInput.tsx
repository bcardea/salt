import React, { useState } from 'react';
import { Key, Eye, EyeOff } from 'lucide-react';
import { useApiKey } from '../context/ApiKeyContext';

const ApiKeyInput: React.FC = () => {
  const { apiKey, setApiKey } = useApiKey();
  const [showKey, setShowKey] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setApiKey(inputValue.trim());
    }
  };
  
  const toggleShowKey = () => {
    setShowKey(!showKey);
  };
  
  const handleReset = () => {
    setApiKey('');
    setInputValue('');
  };
  
  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Key className="w-5 h-5 mr-2 text-secondary-700" />
        OpenAI API Key
      </h2>
      
      {!apiKey ? (
        <>
          <p className="text-secondary-700 mb-4">
            Please enter your OpenAI API key to use the image generation feature.
            Your key is stored locally in your browser and never sent to our servers.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <input
                type={showKey ? 'text' : 'password'}
                className="input-field pr-10"
                placeholder="sk-..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={toggleShowKey}
              >
                {showKey ? (
                  <EyeOff className="h-5 w-5 text-secondary-400" />
                ) : (
                  <Eye className="h-5 w-5 text-secondary-400" />
                )}
              </button>
            </div>
            
            <button type="submit" className="btn-primary w-full">
              Save API Key
            </button>
          </form>
          
          <p className="mt-3 text-xs text-secondary-500">
            Don't have an API key? <a 
              href="https://platform.openai.com/api-keys" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700"
            >
              Get one from OpenAI
            </a>
          </p>
        </>
      ) : (
        <div>
          <p className="text-green-600 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            API Key is set
          </p>
          
          <div className="flex items-center space-x-2">
            <input
              type="password"
              className="input-field"
              value="••••••••••••••••••••••••••••••"
              disabled
            />
            
            <button 
              className="btn-secondary"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeyInput;