import React from 'react';
import { CreditCard } from 'lucide-react';

interface CreditDisplayProps {
  credits: number | null;
  nextReset: string | null;
  isLoading?: boolean;
}

const CreditDisplay: React.FC<CreditDisplayProps> = ({ credits, nextReset, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 animate-pulse">
        <div className="w-4 h-4 bg-secondary-200 rounded-full"></div>
        <div className="h-4 w-24 bg-secondary-200 rounded"></div>
      </div>
    );
  }

  if (credits === null) {
    return null;
  }

  const formatNextReset = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <CreditCard className="w-4 h-4 text-secondary-600" />
      <span className="text-sm text-secondary-900">
        {credits} credit{credits !== 1 ? 's' : ''} remaining
      </span>
      {nextReset && (
        <span className="text-xs text-secondary-500">
          (resets {formatNextReset(nextReset)})
        </span>
      )}
    </div>
  );
};

export default CreditDisplay;