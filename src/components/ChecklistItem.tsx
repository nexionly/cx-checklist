
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ChecklistItem as ChecklistItemType } from '@/lib/checklistData';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ChecklistItemProps {
  item: ChecklistItemType;
  index: number;
  onToggle: (id: string) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ item, index, onToggle }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleCheckboxChange = () => {
    onToggle(item.id);
  };

  return (
    <div 
      className="checklist-item rounded-lg bg-white shadow-sm border border-gray-100 overflow-hidden mb-3 transition-all duration-300" 
      style={{ '--item-index': index } as React.CSSProperties}
    >
      <div 
        className={cn(
          "flex items-start p-4 cursor-pointer",
          item.completed ? "bg-secondary/50" : "bg-white"
        )}
        onClick={toggleExpand}
      >
        <div className="flex-shrink-0 pt-0.5 pr-3" onClick={(e) => e.stopPropagation()}>
          <Checkbox 
            checked={item.completed} 
            onCheckedChange={handleCheckboxChange}
            className="h-5 w-5"
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between">
            <h3 className={cn(
              "text-base font-medium transition-all duration-300",
              item.completed ? "text-muted-foreground line-through" : "text-foreground"
            )}>
              {item.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className={cn(
                "tag",
                item.priority === 'HIGH' ? "tag-high" : 
                item.priority === 'MEDIUM' ? "tag-medium" : "tag-low"
              )}>
                {item.priority}
              </span>
              {expanded ? 
                <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              }
            </div>
          </div>
        </div>
      </div>
      {expanded && (
        <div className="px-4 pb-4 pt-0 ml-8 animate-fade-in">
          <div className="mt-2 space-y-3 text-sm">
            <div>
              <h4 className="font-medium text-foreground">Action:</h4>
              <p className="text-muted-foreground mt-1">{item.action}</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground">Why:</h4>
              <p className="text-muted-foreground mt-1">{item.reason}</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground">Expert Insight:</h4>
              <p className="text-muted-foreground mt-1">{item.insight}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChecklistItem;
