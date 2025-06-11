import React from 'react';
import ReactMarkdown from 'react-markdown';

interface SermonOutlineDisplayProps {
  content: string;
  title?: string;
}

const SermonOutlineDisplay: React.FC<SermonOutlineDisplayProps> = ({ content, title }) => {
  // Remove leading four-space indentation that causes markdown to render as a code block
  const cleanedContent = content.split('\n').map(line => line.replace(/^    /, '')).join('\n');

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {title && (
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      )}
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>
          {cleanedContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default SermonOutlineDisplay;
