import React from 'react';
import ReactMarkdown from 'react-markdown';

interface SermonOutlineDisplayProps {
  content: string;
  title?: string;
}

const SermonOutlineDisplay: React.FC<SermonOutlineDisplayProps> = ({ content, title }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {title && (
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      )}
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          components={{
            h1: ({children}) => <h1 className="text-3xl font-bold mt-6 mb-4 text-gray-900">{children}</h1>,
            h2: ({children}) => <h2 className="text-2xl font-bold mt-5 mb-3 text-gray-800">{children}</h2>,
            h3: ({children}) => <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700">{children}</h3>,
            h4: ({children}) => <h4 className="text-lg font-semibold mt-3 mb-2 text-gray-700">{children}</h4>,
            h5: ({children}) => <h5 className="text-base font-semibold mt-2 mb-1 text-gray-600">{children}</h5>,
            p: ({children}) => <p className="mb-4 text-gray-600 leading-relaxed">{children}</p>,
            ul: ({children}) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
            ol: ({children}) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
            li: ({children}) => <li className="text-gray-600">{children}</li>,
            strong: ({children}) => <strong className="font-bold text-gray-800">{children}</strong>,
            em: ({children}) => <em className="italic">{children}</em>,
            blockquote: ({children}) => (
              <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-700">
                {children}
              </blockquote>
            ),
            hr: () => <hr className="my-6 border-gray-300" />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default SermonOutlineDisplay;
