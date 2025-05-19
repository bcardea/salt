import React, { useState, useCallback } from 'react';
import { BookOpen, SwitchCamera } from 'lucide-react';
import { debounce } from '../utils/debounce';

interface SermonFormProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

const SermonForm: React.FC<SermonFormProps> = ({ onSubmit, isLoading, disabled }) => {
  const [topic, setTopic] = useState('');
  const [sermonNotes, setSermonNotes] = useState('');
  const [isNotesMode, setIsNotesMode] = useState(false);
  
  // Debounce the onSubmit callback
  const debouncedSubmit = useCallback(
    debounce((value: string) => {
      if (value.trim()) {
        onSubmit(value.trim());
      }
    }, 500),
    [onSubmit]
  );
  
  const handleInputChange = (value: string) => {
    if (isNotesMode) {
      setSermonNotes(value);
    } else {
      setTopic(value);
    }
    debouncedSubmit(value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = isNotesMode ? sermonNotes.trim() : topic.trim();
    if (value) {
      onSubmit(value);
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <label 
            className="block text-sm font-medium text-secondary-800"
          >
            {isNotesMode ? 'Sermon Notes' : 'Sermon Topic or Scripture'}
          </label>
          <button
            type="button"
            onClick={() => {
              setIsNotesMode(!isNotesMode);
              setTopic('');
              setSermonNotes('');
              onSubmit(''); // Clear the parent's input value
            }}
            className="flex items-center text-sm text-secondary-600 hover:text-secondary-900 transition-colors"
          >
            <SwitchCamera className="h-4 w-4 mr-1" />
            Switch to {isNotesMode ? 'Quick Topic' : 'Full Notes'}
          </button>
        </div>
        
        {isNotesMode ? (
          <div>
            <textarea
              className="input-field font-mono text-sm min-h-[200px]"
              placeholder="Paste your full sermon notes here..."
              value={sermonNotes}
              onChange={(e) => handleInputChange(e.target.value)}
              disabled={isLoading || disabled}
              required
            />
            <p className="mt-1 text-sm text-secondary-500">
              Our AI will analyze your notes to create the perfect artwork concept
            </p>
          </div>
        ) : (
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BookOpen className="h-5 w-5 text-secondary-400" />
              </div>
              <input
                type="text"
                className="input-field pl-10"
                placeholder="e.g., The Prodigal Son, John 3:16, God's Grace..."
                value={topic}
                onChange={(e) => handleInputChange(e.target.value)}
                disabled={isLoading || disabled}
                required
              />
            </div>
            <p className="mt-1 text-sm text-secondary-500">
              Provide details about your sermon topic, scripture reference, or key message
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SermonForm;