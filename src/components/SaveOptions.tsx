
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checklist } from '@/lib/checklistData';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
    <div className="flex items-center justify-center gap-2 py-4 sticky bottom-0 z-10 bg-background/80 backdrop-blur-sm">
      <Button 
        variant="default" 
        onClick={handleSave} 
        disabled={saveLoading}
        className="flex items-center gap-2"
      >
        {saveLoading ? (
          <>
            <span className="animate-pulse">Saving...</span>
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            <span>Save Progress</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default SaveOptions;
