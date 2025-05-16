import React, { useState, useEffect } from 'react';
import { Pencil, Check, X } from 'lucide-react';

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const PromptEditor: React.FC<PromptEditorProps> = ({ value, onChange, disabled = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

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
              className="text-secondary-600 hover:text-secondary-900 transition-colors"
            >
              <Pencil className="w-4 h-4" />
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
        {isEditing ? (
          <textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="w-full min-h-[120px] p-3 border border-secondary-200 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            placeholder="Describe how you'd like to modify the concept..."
          />
        ) : (
          <p className="text-secondary-700 whitespace-pre-wrap">{value}</p>
        )}
      </div>
      {isEditing && (
        <div className="px-4 py-3 bg-secondary-50 border-t border-secondary-200">
          <p className="text-xs text-secondary-600">
            Edit the design concept to better match your vision. Click the checkmark to save your changes.
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptEditor;