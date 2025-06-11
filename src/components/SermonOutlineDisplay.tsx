import React from 'react';
import ReactMarkdown from 'react-markdown';

interface SermonOutlineDisplayProps {
  content: string;
  title?: string;
}

const SermonOutlineDisplay: React.FC<SermonOutlineDisplayProps> = ({ content, title }) => {
  let processedContent = content;

  // 1. Remove the markdown code block fences if they exist
  //    Handle ```markdown\n or ```\n at the start
  if (processedContent.startsWith("```markdown\n")) {
    processedContent = processedContent.substring("```markdown\n".length);
  } else if (processedContent.startsWith("```\n")) {
    processedContent = processedContent.substring("```\n".length);
  }

  // Handle \n``` or ``` at the end
  if (processedContent.endsWith("\n```")) {
    processedContent = processedContent.substring(0, processedContent.length - "\n```".length);
  } else if (processedContent.endsWith("```")) {
    processedContent = processedContent.substring(0, processedContent.length - "```".length);
  }
  
  // Trim any leading/trailing whitespace that might be left after fence removal
  processedContent = processedContent.trim();

  // 2. Remove leading four-space indentation from each line of the actual content
  const cleanedContent = processedContent.split('\n').map(line => line.replace(/^    /, '')).join('\n');

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
