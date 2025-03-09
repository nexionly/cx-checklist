
import React, { useState } from 'react';
import { Category as CategoryType } from '@/lib/checklistData';
import ChecklistItem from './ChecklistItem';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CategoryProps {
  category: CategoryType;
  onToggleItem: (itemId: string) => void;
}

const Category: React.FC<CategoryProps> = ({ category, onToggleItem }) => {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  
  const completedCount = category.items.filter(item => item.completed).length;
  const progress = (completedCount / category.items.length) * 100;
  
  return (
    <div className="category-container mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 cursor-pointer" onClick={toggleCollapse}>
          <h2 className="text-xl font-semibold">{category.title}</h2>
          {collapsed ? 
            <ChevronDown className="h-5 w-5 text-muted-foreground" /> : 
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          }
        </div>
        <div className="text-sm text-muted-foreground">
          {completedCount} of {category.items.length} completed
        </div>
      </div>
      
      <div className="h-2 bg-secondary rounded-full mb-4 overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-500 ease-in-out" 
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
