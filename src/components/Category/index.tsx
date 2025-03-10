
import { Category as CategoryType } from '@/lib/checklistData';
import { CategoryHeader } from './CategoryHeader';
import { CategoryProgress } from './CategoryProgress';
import { CategoryItems } from './CategoryItems';
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import confetti from 'canvas-confetti';

interface CategoryProps {
  category: CategoryType;
  onToggleItem: (itemId: string) => void;
  onUncheckAll: (categoryId: string) => void;
}

const Category = ({ category, onToggleItem, onUncheckAll }: CategoryProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
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
      const duration = 1.5 * 1000; // 1.5 seconds duration
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

  return (
    <div className="category-container mb-8">
      <CategoryHeader 
        title={category.title}
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
        isCompleted={isCompleted}
        completedCount={completedCount}
        totalItems={category.items.length}
        onExpandAll={expandAll}
        onCollapseAll={collapseAll}
        onUncheckAll={handleUncheckAll}
      />
      
      <CategoryProgress 
        progress={progress} 
        isCompleted={isCompleted} 
      />
      
      {!collapsed && (
        <CategoryItems 
          items={category.items} 
          categoryId={category.id}
          onToggle={onToggleItem}
        />
      )}
    </div>
  );
};

export default Category;
