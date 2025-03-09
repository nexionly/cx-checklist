
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  height?: string;
  isCompleted?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  height = 'h-2', 
  isCompleted = false,
  className
}) => {
  return (
    <div className={cn(`bg-secondary rounded-full overflow-hidden ${height}`, className)}>
      <div 
        className={cn(
          "h-full rounded-full transition-all duration-500 ease-in-out",
          isCompleted ? "bg-green-500" : "bg-primary"
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
