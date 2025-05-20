import React, { useState, useCallback } from 'react';
import { BookOpen, SwitchCamera } from 'lucide-react';
import { debounce } from '../utils/debounce';

interface SermonFormProps {
  onSubmit: (data: { title: string; topic: string }) => void;
  isLoading: boolean;
  disabled?: boolean;
}

const SermonForm: React.FC<SermonFormProps> = ({ onSubmit, isLoading, disabled }) => {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [sermonNotes, setSermonNotes] = useState('');
  const [isNotesMode, setIsNotesMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  // Debounce the onSubmit callback
  const debouncedSubmit = useCallback(
    debounce((data: { title: string; topic: string }) => {
      if (data.title.trim() || data.topic.trim()) {
        setIsTyping(false);
        onSubmit(data);
      }
    }, 1000),
    [onSubmit]
  );
  
  const handleInputChange = (value: string, type: 'title' | 'topic' | 'notes') => {
    setIsTyping(true);
    
    if (type === 'notes') {
      setSermonNotes(value);
      debouncedSubmit({ title: value, topic: value });
    } else if (type === 'title') {
      setTitle(value);
      debouncedSubmit({ title: value, topic });
    } else {
      setTopic(value);
      debouncedSubmit({ title, topic: value });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTyping(false);
    
    if (isNotesMode) {
      const value = sermonNotes.trim();
      if (value) {
        onSubmit({ title: value, topic: value });
      }
    } else {
      const titleValue = title.trim();
      const topicValue = topic.trim();
      if (titleValue || topicValue) {
        onSubmit({ title: titleValue, topic: topicValue });
      }
    }
  };
  
  const handleSwitchMode = () => {
    setIsNotesMode(!isNotesMode);
    setTitle('');
    setTopic('');
    setSermonNotes('');
    onSubmit({ title: '', topic: '' });
  };
  
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-secondary-800">
            {isNotesMode ? 'Sermon Notes' : 'Sermon Details'}
          </label>
          <button
            type="button"
            onClick={handleSwitchMode}
            className="flex items-center text-sm text-secondary-600 hover:text-secondary-900 transition-colors"
          >
            <SwitchCamera className="h-4 w-4 mr-1" />
            Switch to {isNotesMode ? 'Quick Entry' : 'Full Notes'}
          </button>
        </div>
        
        {isNotesMode ? (
          <div>
            <textarea
              className="input-field font-mono text-sm min-h-[200px]"
              placeholder="Paste your full sermon notes here..."
              value={sermonNotes}
              onChange={(e) => handleInputChange(e.target.value, 'notes')}
              disabled={isLoading || disabled}
              required
            />
            <p className="mt-1 text-sm text-secondary-500 flex items-center justify-between">
              <span>Our AI will analyze your notes to create the perfect artwork concept</span>
              {isTyping && (
                <span className="text-primary-600">Processing...</span>
              )}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Sermon Title
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BookOpen className="h-5 w-5 text-secondary-400" />
                </div>
                <input
                  type="text"
                  className="input-field pl-10"
                  placeholder="e.g., The Prodigal Son"
                  value={title}
                  onChange={(e) => handleInputChange(e.target.value, 'title')}
                  disabled={isLoading || disabled}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Topic or Subtitle
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="e.g., A story of God's unconditional love and forgiveness"
                value={topic}
                onChange={(e) => handleInputChange(e.target.value, 'topic')}
                disabled={isLoading || disabled}
              />
            </div>
            
            <p className="text-sm text-secondary-500 flex items-center justify-between">
              <span>Enter your sermon title and topic to create custom artwork</span>
              {isTyping && (
                <span className="text-primary-600">Processing...</span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SermonForm;