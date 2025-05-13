import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface SermonFormProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
}

const SermonForm: React.FC<SermonFormProps> = ({ onSubmit, isLoading }) => {
  const [topic, setTopic] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic.trim());
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label 
          htmlFor="sermon-topic" 
          className="block text-sm font-medium text-secondary-800 mb-1"
        >
          Sermon Topic or Scripture
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <BookOpen className="h-5 w-5 text-secondary-400" />
          </div>
          <input
            type="text"
            id="sermon-topic"
            className="input-field pl-10"
            placeholder="e.g., The Prodigal Son, John 3:16, God's Grace..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <p className="mt-1 text-sm text-secondary-500">
          Provide details about your sermon topic, scripture reference, or key message
        </p>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className={`btn-primary w-full flex items-center justify-center ${
          isLoading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating Your Art...
          </>
        ) : (
          'Generate Sermon Art'
        )}
      </button>
    </form>
  );
};

export default SermonForm;