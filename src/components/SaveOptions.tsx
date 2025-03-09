
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checklist } from '@/lib/checklistData';
import { Save, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface SaveOptionsProps {
  checklist: Checklist;
  onSave: () => Promise<void>;
}

const SaveOptions: React.FC<SaveOptionsProps> = ({ checklist, onSave }) => {
  const { toast } = useToast();
  const [saveLoading, setSaveLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleSave = async () => {
    setSaveLoading(true);
    
    try {
      await onSave();
      
      toast({
        title: "Progress saved",
        description: user 
          ? "Your checklist progress has been saved to your account." 
          : "Your checklist progress has been saved locally.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error saving progress:', error);
      toast({
        title: "Save failed",
        description: "There was an error saving your progress. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaveLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center gap-2 py-4 sticky bottom-0 z-10 bg-background/80 backdrop-blur-sm border-t">
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
      
      {!user && (
        <Button 
          variant="outline" 
          onClick={() => navigate('/auth')}
          className="flex items-center gap-2"
        >
          <LogIn className="h-4 w-4" />
          <span>Sign In to Sync</span>
        </Button>
      )}
    </div>
  );
};

export default SaveOptions;
