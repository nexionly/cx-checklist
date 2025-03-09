
import { ChevronDown, ChevronUp, Trophy, ExpandIcon, ListCollapse, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CategoryHeaderProps {
  title: string;
  collapsed: boolean;
  toggleCollapse: () => void;
  isCompleted: boolean;
  completedCount: number;
  totalItems: number;
  onExpandAll: (e: React.MouseEvent) => void;
  onCollapseAll: (e: React.MouseEvent) => void;
  onUncheckAll: (e: React.MouseEvent) => void;
}

export const CategoryHeader = ({
  title,
  collapsed,
  toggleCollapse,
  isCompleted,
  completedCount,
  totalItems,
  onExpandAll,
  onCollapseAll,
  onUncheckAll
}: CategoryHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2 cursor-pointer" onClick={toggleCollapse}>
        <h2 className="text-xl font-semibold">{title}</h2>
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
          {completedCount} of {totalItems} completed
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
                      onClick={onUncheckAll}
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
              onClick={onExpandAll}
            >
              <ExpandIcon className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2" 
              onClick={onCollapseAll}
            >
              <ListCollapse className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
