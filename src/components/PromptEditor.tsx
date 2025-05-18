import React, { useState, useEffect, useRef } from 'react';
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
  position: { top: number; left: number };
}

const Popover: React.FC<PopoverProps> = ({ element, onChange, onClose, position }) => {
  const [customValue, setCustomValue] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Adjust position if popover would go off screen
    if (popoverRef.current) {
      const rect = popoverRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      let adjustedTop = position.top;
      let adjustedLeft = position.left;

      // Check vertical overflow
      if (rect.bottom > viewportHeight) {
        adjustedTop = position.top - rect.height - 30; // Position above the element
      }

      // Check horizontal overflow
      if (rect.right > viewportWidth) {
        adjustedLeft = viewportWidth - rect.width - 20;
      }

      popoverRef.current.style.top = `${adjustedTop}px`;
      popoverRef.current.style.left = `${adjustedLeft}px`;
    }
  }, [position]);

  return (
    <div 
      ref={popoverRef}
      className="fixed z-50 w-64 bg-white rounded-lg shadow-lg border border-secondary-200"
      style={{ top: position.top, left: position.left }}
    >
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
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleElementClick = (index: number, event: React.MouseEvent) => {
    if (disabled || !isEditing) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      top: rect.bottom + window.scrollY + 5,
      left: rect.left + window.scrollX
    });
    setActiveElement(index);
  };

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

        const element = tempValue.elements[elementIndex];
        const gradientClasses = {
          subject: 'from-blue-500 to-purple-500',
          setting: 'from-green-500 to-teal-500',
          style: 'from-orange-500 to-red-500',
          mood: 'from-pink-500 to-rose-500'
        }[element.type];

        return (
          <span key={index} className="relative inline-block">
            <button
              onClick={(e) => handleElementClick(elementIndex, e)}
              className={`inline-flex items-center px-2 py-0.5 rounded text-sm transition-colors ${
                disabled || !isEditing
                  ? 'bg-secondary-100 text-secondary-700'
                  : `bg-gradient-to-r ${gradientClasses} text-white hover:opacity-90`
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
                position={popoverPosition}
              />
            )}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-secondary-200 overflow-visible">
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