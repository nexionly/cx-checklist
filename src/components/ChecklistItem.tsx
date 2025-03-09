
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ChecklistItem as ChecklistItemType } from '@/lib/checklistData';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, Zap, HelpCircle, BookOpen } from 'lucide-react';

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
            <div>
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
          <div className="mt-2 space-y-4">
            <div className="bg-[#F2FCE2] p-3 rounded-lg border border-green-100">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-green-600" />
                <h4 className="font-medium text-green-700">Action:</h4>
              </div>
              <p className="text-sm text-green-800">{item.action}</p>
            </div>
            
            <div className="bg-[#FEF7CD] p-3 rounded-lg border border-yellow-100">
              <div className="flex items-center gap-2 mb-1">
                <HelpCircle className="h-4 w-4 text-yellow-600" />
                <h4 className="font-medium text-yellow-700">Why:</h4>
              </div>
              <p className="text-sm text-yellow-800">{item.reason}</p>
            </div>
            
            <div className="bg-[#E5DEFF] p-3 rounded-lg border border-purple-100">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="h-4 w-4 text-purple-600" />
                <h4 className="font-medium text-purple-700">Expert Insight:</h4>
              </div>
              <p className="text-sm text-purple-800">{item.insight}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChecklistItem;
