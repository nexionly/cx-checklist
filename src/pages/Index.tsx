
import React, { useState, useEffect } from 'react';
import { initialChecklist, Checklist } from '@/lib/checklistData';
import Header from '@/components/Header';
import SaveOptions from '@/components/SaveOptions';
import ScrollIndicator from '@/components/ScrollIndicator';
import ActiveViewers from '@/components/ActiveViewers';
import GettingStarted from '@/components/GettingStarted';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ChecklistContainer from '@/components/ChecklistContainer';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGettingStartedOpen, setIsGettingStartedOpen] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setTimeout(() => {
      try {
        const savedChecklist = localStorage.getItem('cx-checklist');
        if (savedChecklist) {
          setChecklist(JSON.parse(savedChecklist));
        } else {
          setChecklist(initialChecklist);
        }
      } catch (e) {
        // Silent fallback to initial checklist
        setChecklist(initialChecklist);
      }
      setLoading(false);
    }, 1000);
  }, []);

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
    
    try {
      localStorage.setItem('cx-checklist', JSON.stringify(updatedChecklist));
    } catch (e) {
      // Silent failure - functionality continues without persistence
    }
  };

  const handleSave = () => {
    if (!checklist) return;
    
    try {
      localStorage.setItem('cx-checklist', JSON.stringify(checklist));
    } catch (e) {
      // Silent failure
    }
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
    
    try {
      localStorage.setItem('cx-checklist', JSON.stringify(updatedChecklist));
    } catch (e) {
      // Silent failure
    }
    
    toast({
      title: "Items unchecked",
      description: "All items in this category have been unchecked",
    });
  };

  const calculateProgress = () => {
    if (!checklist) return 0;
    
    const totalItems = checklist.categories.reduce(
      (acc, category) => acc + category.items.length, 
      0
    );
    
    const completedItems = checklist.categories.reduce(
      (acc, category) => acc + category.items.filter(item => item.completed).length, 
      0
    );
    
    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!checklist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error loading checklist data. Please refresh the page.</p>
      </div>
    );
  }

  const progress = calculateProgress();

  return (
    <div className="min-h-screen">
      <Header 
        title="Customer Experience Essentials Checklist"
        className="bg-gradient-to-r from-blue-50 to-indigo-50 pt-12 pb-10 mb-6 shadow-sm"
      />
      
      <GettingStarted 
        isOpen={isGettingStartedOpen} 
        onOpenChange={setIsGettingStartedOpen} 
      />
      
      <ChecklistContainer 
        categories={checklist.categories}
        onToggleItem={handleToggleItem}
        onUncheckAll={handleUncheckAll}
        progress={progress}
      />
      
      <SaveOptions checklist={checklist} onSave={handleSave} />
      <ScrollIndicator />
      <ActiveViewers />
    </div>
  );
};

export default Index;
