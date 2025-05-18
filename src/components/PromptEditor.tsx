import React, { useState, useEffect } from 'react';
import { Pencil, Check, X, ChevronDown } from 'lucide-react';
import { PromptData, PromptElement } from '../types/prompt';

interface PromptEditorProps {
  value: PromptData;
  onChange: (value: PromptData) => void;
  disabled?: boolean;
}

interface PopoverProps {
  element: PromptElement;
  onChange: (value: string) => void;
  onClose: () => void;
}

const Popover: React.FC<PopoverProps> = ({ element, onChange, onClose }) => {
  const [customValue, setCustomValue] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  return (
    <div className="absolute z-50 mt-2 w-64 bg-white rounded-lg shadow-lg border border-secondary-200">
      <div className="p-2">
        {element.suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => {
              onChange(suggestion);
              onClose();
            }}
            className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-secondary-50 transition-colors"
          >
            {suggestion}
          </button>
        ))}
        
        {!isCustom ? (
          <button
            onClick={() => setIsCustom(true)}
            className="w-full text-left px-3 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
          >
            Custom Value...
          </button>
        ) : (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (customValue.trim()) {
                onChange(customValue.trim());
                onClose();
              }
            }} 
            className="p-2"
          >
            <input
              type="text"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              placeholder="Enter custom value..."
              className="w-full px-3 py-2 text-sm border border-secondary-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              autoFocus
            />
          </form>
        )}
      </div>
    </div>
  );
};

const PromptEditor: React.FC<PromptEditorProps> = ({ value, onChange, disabled = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [activeElement, setActiveElement] = useState<number | null>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleElementChange = (index: number, newValue: string) => {
    const newElements = [...tempValue.elements];
    const oldValue = newElements[index].value;
    newElements[index] = { ...newElements[index], value: newValue };
    
    // Update the summary text, replacing the old value with the new one
    const newSummary = tempValue.summary.replace(
      new RegExp(`{${oldValue}}`, 'g'),
      `{${newValue}}`
    );
    
    setTempValue({
      ...tempValue,
      elements: newElements,
      summary: newSummary
    });
  };

  const handleSave = () => {
    onChange(tempValue);
    setIsEditing(false);
    setActiveElement(null);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
    setActiveElement(null);
  };

  const renderInteractiveSummary = () => {
    const parts = tempValue.summary.split(/({[^}]+})/g);
    return parts.map((part, index) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        const value = part.slice(1, -1);
        const elementIndex = tempValue.elements.findIndex(e => e.value === value);
        if (elementIndex === -1) return part;

        return (
          <span key={index} className="relative inline-block">
            <button
              onClick={() => !disabled && isEditing && setActiveElement(elementIndex)}
              className={`inline-flex items-center px-2 py-0.5 rounded text-sm transition-colors ${
                disabled || !isEditing
                  ? 'bg-secondary-100 text-secondary-700'
                  : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600'
              }`}
              disabled={disabled || !isEditing}
            >
              {value}
              {isEditing && !disabled && (
                <ChevronDown className="ml-1 w-3 h-3" />
              )}
            </button>
            {activeElement === elementIndex && (
              <Popover
                element={tempValue.elements[elementIndex]}
                onChange={(newValue) => handleElementChange(elementIndex, newValue)}
                onClose={() => setActiveElement(null)}
              />
            )}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-secondary-200 overflow-hidden">
      <div className="p-4 bg-secondary-50 border-b border-secondary-200">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-secondary-700">Design Concept</h3>
          {!disabled && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center text-secondary-600 hover:text-secondary-900 transition-colors"
            >
              <Pencil className="w-4 h-4 mr-2" />
              <span className="text-sm">Edit Concept</span>
            </button>
          )}
          {isEditing && (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSave}
                className="text-green-600 hover:text-green-700 transition-colors"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="text-red-600 hover:text-red-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <p className="text-secondary-700 leading-relaxed">
          {renderInteractiveSummary()}
        </p>
      </div>
    </div>
  );
};

export default PromptEditor;