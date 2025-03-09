
import React, { useState, useEffect } from 'react';
import { initialChecklist, Checklist, ChecklistItem } from '@/lib/checklistData';
import Header from '@/components/Header';
import Category from '@/components/Category';
import SaveOptions from '@/components/SaveOptions';
import { useToast } from '@/hooks/use-toast';
import { BarChart2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading from storage
    setTimeout(() => {
      // Try to get saved checklist from localStorage
      const savedChecklist = localStorage.getItem('cx-checklist');
      if (savedChecklist) {
        try {
          setChecklist(JSON.parse(savedChecklist));
        } catch (e) {
          console.error('Error parsing saved checklist', e);
          setChecklist(initialChecklist);
        }
      } else {
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
    
    // Save to localStorage with each toggle
    localStorage.setItem('cx-checklist', JSON.stringify(updatedChecklist));
  };

  const handleSave = () => {
    if (!checklist) return;
    localStorage.setItem('cx-checklist', JSON.stringify(checklist));
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
    return (
      <div className="min-h-screen max-w-4xl mx-auto px-4 py-8">
        <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
        
        {[1, 2, 3].map(i => (
          <div key={i} className="mb-8">
            <Skeleton className="h-8 w-1/3 mb-4" />
            <Skeleton className="h-2 w-full mb-6" />
            
            {[1, 2, 3].map(j => (
              <Skeleton key={j} className="h-16 w-full mb-3" />
            ))}
          </div>
        ))}
      </div>
    );
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
        title={checklist.title}
        subtitle="Track and manage your customer experience initiatives with this interactive checklist."
      />
      
      <div className="checklist-container px-4 pb-24">
        <div className="bg-white border border-gray-100 rounded-xl p-4 mb-8 shadow-sm animate-scale-in">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium">Overall Progress</h2>
            </div>
            <span className="text-2xl font-semibold">{progress}%</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-700 ease-in-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {checklist.categories.map(category => (
          <Category 
            key={category.id} 
            category={category} 
            onToggleItem={handleToggleItem}
          />
        ))}
      </div>
      
      <SaveOptions checklist={checklist} onSave={handleSave} />
    </div>
  );
};

export default Index;
