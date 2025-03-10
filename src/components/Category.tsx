
import React, { useState, useEffect, useRef } from 'react';
import { Category as CategoryType } from '@/lib/checklistData';
import ChecklistItem from './ChecklistItem';
import { ChevronDown, ChevronUp, Trophy, ExpandIcon, ListCollapse, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

interface CategoryProps {
  category: CategoryType;
  onToggleItem: (itemId: string) => void;
  onUncheckAll: (categoryId: string) => void;
}

const Category: React.FC<CategoryProps> = ({ category, onToggleItem, onUncheckAll }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { toast } = useToast();
  const initialRenderRef = useRef(true);
  
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const expandAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Emit a custom event that child ChecklistItem components will listen for
    const event = new CustomEvent('expand-all-items', {
      detail: { categoryId: category.id }
    });
    document.dispatchEvent(event);
    
    toast({
      title: "All items expanded",
      description: `Expanded all items in ${category.title}`,
    });
  };

  const collapseAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Emit a custom event that child ChecklistItem components will listen for
    const event = new CustomEvent('collapse-all-items', {
      detail: { categoryId: category.id }
    });
    document.dispatchEvent(event);
    
    toast({
      title: "All items collapsed",
      description: `Collapsed all items in ${category.title}`,
    });
  };
  
  const handleUncheckAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUncheckAll(category.id);
  };
  
  const completedCount = category.items.filter(item => item.completed).length;
  const progress = (completedCount / category.items.length) * 100;
  const isCompleted = completedCount === category.items.length && category.items.length > 0;
  
  useEffect(() => {
    // Skip confetti on first render (page load)
    if (initialRenderRef.current) {
      initialRenderRef.current = false;
      return;
    }
    
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
      
      // Show a toast when category is completed
      toast({
        title: "Category Completed! 🎉",
        description: `You've completed all items in "${category.title}"`,
      });
    }
  }, [isCompleted, celebrated, category.title, toast]);

  // Handle keyboard navigation between items
  const handleItemKeyDown = (e: React.KeyboardEvent, currentId: string) => {
    const currentIndex = category.items.findIndex(item => item.id === currentId);
    
    // Arrow up - move to previous item
    if (e.code === 'ArrowUp' && currentIndex > 0) {
      e.preventDefault();
      const prevItem = document.querySelector(`[data-item-id="${category.items[currentIndex - 1].id}"]`) as HTMLElement;
      if (prevItem) prevItem.focus();
    }
    
    // Arrow down - move to next item
    if (e.code === 'ArrowDown' && currentIndex < category.items.length - 1) {
      e.preventDefault();
      const nextItem = document.querySelector(`[data-item-id="${category.items[currentIndex + 1].id}"]`) as HTMLElement;
      if (nextItem) nextItem.focus();
    }
  };
  
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Trophy className="h-5 w-5 text-green-500 ml-2 animate-pulse" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Category completed!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">
            {completedCount} of {category.items.length} completed
          </div>
          {!collapsed && (
            <div className="flex space-x-1">
              {completedCount > 0 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2 opacity-60 hover:opacity-100 transition-opacity" 
                        onClick={handleUncheckAll}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Uncheck all items</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2" 
                onClick={expandAll}
              >
                <ExpandIcon className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2" 
                onClick={collapseAll}
              >
                <ListCollapse className="h-4 w-4" />
              </Button>
            </div>
          )}
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
              categoryId={category.id}
              onToggle={onToggleItem}
              onKeyDown={handleItemKeyDown}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
