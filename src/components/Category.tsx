import React, { useState, useEffect } from 'react';
import { Category as CategoryType } from '@/lib/checklistData';
import ChecklistItem from './ChecklistItem';
import { ChevronDown, ChevronUp, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';

interface CategoryProps {
  category: CategoryType;
  onToggleItem: (itemId: string) => void;
}

const Category: React.FC<CategoryProps> = ({ category, onToggleItem }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  
  const completedCount = category.items.filter(item => item.completed).length;
  const progress = (completedCount / category.items.length) * 100;
  const isCompleted = completedCount === category.items.length && category.items.length > 0;
  
  useEffect(() => {
    // Trigger confetti when a category is fully completed and hasn't been celebrated yet
    if (isCompleted && !celebrated) {
      const duration = 1.5 * 1000; // Reduced to half the time (from 3 seconds to 1.5 seconds)
      const end = Date.now() + duration;
      
      const colors = ['#F2FCE2', '#33C3F0', '#9b87f5', '#0EA5E9'];
      
      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0.3, y: 0.5 },
          colors: colors,
          zIndex: 1000,
        });
        
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 0.7, y: 0.5 },
          colors: colors,
          zIndex: 1000,
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
      
      setCelebrated(true);
    }
  }, [isCompleted, celebrated]);
  
  return (
    <div className="category-container mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 cursor-pointer" onClick={toggleCollapse}>
          <h2 className="text-xl font-semibold">{category.title}</h2>
          {collapsed ? 
            <ChevronDown className="h-5 w-5 text-muted-foreground" /> : 
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          }
          {isCompleted && (
            <Trophy className="h-5 w-5 text-green-500 ml-2 animate-pulse" />
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          {completedCount} of {category.items.length} completed
        </div>
      </div>
      
      <div className="h-2 bg-secondary rounded-full mb-4 overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-in-out",
            isCompleted ? "bg-green-500" : "bg-primary"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {!collapsed && (
        <div className="space-y-1">
          {category.items.map((item, index) => (
            <ChecklistItem 
              key={item.id} 
              item={item} 
              index={index}
              onToggle={onToggleItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
