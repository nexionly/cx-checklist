
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { initialChecklist, Checklist } from '@/lib/checklistData';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Json } from '@/integrations/supabase/types';

type ChecklistContextType = {
  checklist: Checklist | null;
  loading: boolean;
  error: string | null;
  saveChecklist: () => Promise<void>;
  handleToggleItem: (itemId: string) => void;
  handleUncheckAll: (categoryId: string) => void;
  reloadChecklist: () => Promise<void>;
  lastSynced: Date | null;
};

const ChecklistContext = createContext<ChecklistContextType | undefined>(undefined);

export function ChecklistProvider({ children }: { children: React.ReactNode }) {
  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchUserChecklist = async () => {
    if (!user) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('checklist_progress')
        .select('checklist_data')
        .eq('user_id', user.id)
        .single();

      if (error) {
        if (error.code !== 'PGRST116') { // Not found error
          console.error('Error fetching checklist:', error);
          setError('Failed to load your checklist data.');
          return null;
        }
        // If no data exists yet, return null (will create new)
        return null;
      }

      // Cast to Checklist after validation
      const checklistData = data.checklist_data as Json;
      if (
        checklistData && 
        typeof checklistData === 'object' && 
        'title' in checklistData && 
        'categories' in checklistData
      ) {
        // First cast to unknown then to Checklist to avoid direct type conversion error
        return checklistData as unknown as Checklist;
      }
      return null;
    } catch (err) {
      console.error('Exception fetching checklist:', err);
      setError('An unexpected error occurred while loading your checklist.');
      return null;
    }
  };

  const loadChecklist = async () => {
    setLoading(true);
    setError(null);

    try {
      // First try to get from Supabase if user is logged in
      if (user) {
        const remoteChecklist = await fetchUserChecklist();
        
        if (remoteChecklist) {
          setChecklist(remoteChecklist);
          setLastSynced(new Date());
          localStorage.setItem('cx-checklist', JSON.stringify(remoteChecklist));
          setLoading(false);
          return;
        }
      }
      
      // Fall back to localStorage if no user or no remote data
      const savedChecklist = localStorage.getItem('cx-checklist');
      if (savedChecklist) {
        try {
          const parsedChecklist = JSON.parse(savedChecklist);
          setChecklist(parsedChecklist);
          
          // If user is logged in but no remote data exists, save local data to remote
          if (user) {
            await saveChecklistToSupabase(parsedChecklist);
            setLastSynced(new Date());
          }
        } catch (e) {
          console.error('Error parsing saved checklist', e);
          setChecklist(initialChecklist);
        }
      } else {
        setChecklist(initialChecklist);
        
        // If user is logged in, save initial checklist to remote
        if (user) {
          await saveChecklistToSupabase(initialChecklist);
          setLastSynced(new Date());
        }
      }
    } catch (err) {
      console.error('Error in loadChecklist:', err);
      setError('Failed to load your checklist. Please try refreshing the page.');
      
      // Last resort - use initial checklist
      setChecklist(initialChecklist);
    } finally {
      setLoading(false);
    }
  };

  const saveChecklistToSupabase = async (checklistData: Checklist) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('checklist_progress')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      // Cast Checklist to Json type for Supabase
      const checklistDataJson = checklistData as unknown as Json;

      if (data?.id) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('checklist_progress')
          .update({ 
            checklist_data: checklistDataJson,
            last_updated: new Date().toISOString()
          })
          .eq('id', data.id);

        if (updateError) throw updateError;
      } else {
        // Insert new record
        const { error: insertError } = await supabase
          .from('checklist_progress')
          .insert([{
            user_id: user.id,
            checklist_data: checklistDataJson
          }]);

        if (insertError) throw insertError;
      }

      setLastSynced(new Date());
    } catch (err) {
      console.error('Error saving to Supabase:', err);
      toast({
        title: "Sync failed",
        description: "Failed to save your progress to the cloud. Your changes are saved locally.",
        variant: "destructive",
      });
    }
  };

  const saveChecklist = async () => {
    if (!checklist) return;
    
    localStorage.setItem('cx-checklist', JSON.stringify(checklist));
    
    if (user) {
      await saveChecklistToSupabase(checklist);
      toast({
        title: "Progress saved",
        description: "Your checklist progress has been saved successfully.",
      });
    }
  };

  const handleToggleItem = (itemId: string) => {
    if (!checklist) return;

    const updatedChecklist = {
      ...checklist,
      categories: checklist.categories.map(category => ({
        ...category,
        items: category.items.map(item => 
          item.id === itemId 
            ? { ...item, completed: !item.completed } 
            : item
        )
      }))
    };

    setChecklist(updatedChecklist);
    localStorage.setItem('cx-checklist', JSON.stringify(updatedChecklist));
  };
  
  const handleUncheckAll = (categoryId: string) => {
    if (!checklist) return;
    
    const updatedChecklist = {
      ...checklist,
      categories: checklist.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.map(item => ({
              ...item,
              completed: false
            }))
          };
        }
        return category;
      })
    };
    
    setChecklist(updatedChecklist);
    localStorage.setItem('cx-checklist', JSON.stringify(updatedChecklist));
    
    toast({
      title: "Items unchecked",
      description: "All items in this category have been unchecked",
    });
  };

  const reloadChecklist = async () => {
    await loadChecklist();
  };

  useEffect(() => {
    loadChecklist();
  }, [user?.id]);

  // Auto-save to Supabase when checklist changes
  useEffect(() => {
    if (checklist && user) {
      const timer = setTimeout(() => {
        saveChecklistToSupabase(checklist);
      }, 3000); // Debounce for 3 seconds
      
      return () => clearTimeout(timer);
    }
  }, [checklist, user]);

  const value = {
    checklist,
    loading,
    error,
    saveChecklist,
    handleToggleItem,
    handleUncheckAll,
    reloadChecklist,
    lastSynced
  };

  return <ChecklistContext.Provider value={value}>{children}</ChecklistContext.Provider>;
}

export const useChecklist = () => {
  const context = useContext(ChecklistContext);
  if (context === undefined) {
    throw new Error('useChecklist must be used within a ChecklistProvider');
  }
  return context;
};
