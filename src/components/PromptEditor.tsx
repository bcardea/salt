import React, { useState, useEffect } from 'react';
import { Pencil, Check, X, ChevronDown } from 'lucide-react';
import { PromptData, PromptElement } from '../types/prompt';

interface PromptEditorProps {
  value: PromptData;
  onChange: (value: PromptData) => void;
  disabled?: boolean;
}

const ElementEditor: React.FC<{
  element: PromptElement;
  onChange: (value: string) => void;
  disabled?: boolean;
}> = ({ element, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
    setIsCustom(false);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customValue.trim()) {
      onChange(customValue.trim());
      setIsOpen(false);
      setCustomValue('');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          disabled
            ? 'bg-secondary-100 text-secondary-400 cursor-not-allowed'
            : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
        }`}
      >
        {element.value}
        <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-64 bg-white rounded-lg shadow-lg border border-secondary-200">
          <div className="p-2">
            {element.suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSelect(suggestion)}
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
              <form onSubmit={handleCustomSubmit} className="p-2">
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
      )}
    </div>
  );
};

const PromptEditor: React.FC<PromptEditorProps> = ({ value, onChange, disabled = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleElementChange = (index: number, newValue: string) => {
    const newElements = [...tempValue.elements];
    newElements[index] = { ...newElements[index], value: newValue };
    
    setTempValue({
      ...tempValue,
      elements: newElements,
      summary: tempValue.summary.replace(
        new RegExp(tempValue.elements[index].value, 'g'),
        newValue
      )
    });
  };

  const handleSave = () => {
    onChange(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
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
        <div className="space-y-4">
          {tempValue.elements.map((element, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-sm font-medium text-secondary-600 capitalize w-20">
                {element.type}:
              </span>
              <ElementEditor
                element={element}
                onChange={(value) => handleElementChange(index, value)}
                disabled={!isEditing || disabled}
              />
            </div>
          ))}
          
          <div className="mt-4 pt-4 border-t border-secondary-200">
            <p className="text-secondary-700 whitespace-pre-wrap">{tempValue.summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptEditor;