
import React from 'react';
import { BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 mb-8 shadow-sm animate-scale-in">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-medium">Overall Progress</h2>
        </div>
        <span className="text-2xl font-semibold">{progress}%</span>
      </div>
      <div className="h-3 bg-secondary rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-in-out",
            progress === 100 ? "bg-green-500" : "bg-primary"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
