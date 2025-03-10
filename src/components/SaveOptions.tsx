
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checklist } from '@/lib/checklistData';
import { Save, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SaveOptionsProps {
  checklist: Checklist;
  onSave: () => void;
}

const SaveOptions: React.FC<SaveOptionsProps> = ({ checklist, onSave }) => {
  const { toast } = useToast();
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const handleSave = () => {
    if (saveLoading) return;
    
    setSaveLoading(true);
    
    // Simulate saving process
    setTimeout(() => {
      onSave();
      setSaveLoading(false);
      setSaveSuccess(true);
      
      toast({
        title: "Progress saved",
        description: "Your checklist progress has been saved successfully.",
        duration: 3000,
      });
      
      // Reset success state after animation
      setTimeout(() => {
        setSaveSuccess(false);
      }, 1500);
    }, 600);
  };
  
  return (
    <div className="fixed bottom-20 left-6 z-20">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant={saveSuccess ? "secondary" : "default"}
              onClick={handleSave} 
              disabled={saveLoading}
              size="icon"
              className={`h-12 w-12 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ${saveSuccess ? 'bg-green-500 hover:bg-green-600' : ''}`}
              aria-label="Save progress"
            >
              {saveLoading ? (
                <span className="animate-pulse h-6 w-6 rounded-full bg-white/80"></span>
              ) : saveSuccess ? (
                <Check className="h-5 w-5 text-white" />
              ) : (
                <Save className="h-5 w-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Save Progress</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SaveOptions;
