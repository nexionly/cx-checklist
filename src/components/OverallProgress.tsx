
import React from 'react';
import { BarChart2 } from 'lucide-react';
import ProgressBar from './ProgressBar';

interface OverallProgressProps {
  progress: number;
}

const OverallProgress: React.FC<OverallProgressProps> = ({ progress }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 mb-8 shadow-sm animate-scale-in">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-medium">Overall Progress</h2>
        </div>
        <span className="text-2xl font-semibold">{progress}%</span>
      </div>
      <ProgressBar progress={progress} isCompleted={progress === 100} />
    </div>
  );
};

export default OverallProgress;
