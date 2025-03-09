
import React from 'react';
import { useChecklist } from '@/contexts/ChecklistContext';
import { useAuth } from '@/contexts/AuthContext';
import { Check, Cloud, CloudOff, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

const SyncStatus = () => {
  const { lastSynced, reloadChecklist, saveChecklist } = useChecklist();
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="flex items-center text-xs text-muted-foreground">
        <CloudOff className="h-3 w-3 mr-1" />
        <span>Offline mode</span>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-2">
      {lastSynced ? (
        <div className="flex items-center text-xs text-muted-foreground">
          <Check className="h-3 w-3 text-green-500 mr-1" />
          <span>Synced {formatDistanceToNow(lastSynced, { addSuffix: true })}</span>
        </div>
      ) : (
        <div className="flex items-center text-xs text-muted-foreground">
          <Cloud className="h-3 w-3 mr-1" />
          <span>Not synced yet</span>
        </div>
      )}
      
      <div className="flex gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6" 
          onClick={() => reloadChecklist()}
          title="Reload from cloud"
        >
          <RotateCcw className="h-3 w-3" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6" 
          onClick={() => saveChecklist()}
          title="Save to cloud"
        >
          <Cloud className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default SyncStatus;
