
import { cn } from '@/lib/utils';

interface CategoryProgressProps {
  progress: number;
  isCompleted: boolean;
}

export const CategoryProgress = ({ progress, isCompleted }: CategoryProgressProps) => {
  return (
    <div className="h-2 bg-secondary rounded-full mb-4 overflow-hidden">
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
