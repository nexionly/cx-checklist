
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checklist } from '@/lib/checklistData';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SaveOptionsProps {
  checklist: Checklist;
  onSave: () => void;
}

const SaveOptions: React.FC<SaveOptionsProps> = ({ checklist, onSave }) => {
  const { toast } = useToast();
  const [saveLoading, setSaveLoading] = useState(false);
  
  const handleSave = () => {
    setSaveLoading(true);
    
    // Simulate saving process
    setTimeout(() => {
      onSave();
      setSaveLoading(false);
      
      toast({
        title: "Progress saved",
        description: "Your checklist progress has been saved successfully.",
        duration: 3000,
      });
    }, 600);
  };
  
  return (
    <div className="fixed bottom-8 left-8 z-10">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="default" 
              onClick={handleSave} 
              disabled={saveLoading}
              className="h-14 w-14 rounded-full flex items-center justify-center shadow-md hover:shadow-lg p-0"
              aria-label="Save progress"
            >
              {saveLoading ? (
                <span className="animate-pulse h-6 w-6 rounded-full bg-white"></span>
              ) : (
                <Save className="h-6 w-6" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Save Progress</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SaveOptions;
