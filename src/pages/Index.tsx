
import React from 'react';
import Header from '@/components/Header';
import Category from '@/components/Category';
import SaveOptions from '@/components/SaveOptions';
import ScrollIndicator from '@/components/ScrollIndicator';
import { Skeleton } from '@/components/ui/skeleton';
import GettingStarted from '@/components/GettingStarted';
import OverallProgress from '@/components/OverallProgress';
import MarketingCTA from '@/components/MarketingCTA';
import { useChecklist } from '@/contexts/ChecklistContext';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { checklist, loading, error, saveChecklist, handleToggleItem, handleUncheckAll } = useChecklist();
  const navigate = useNavigate();

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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Checklist</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            className="bg-primary text-white px-4 py-2 rounded-md"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
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
        title="Customer Experience Essentials Checklist"
        className="bg-gradient-to-r from-blue-50 to-indigo-50 pt-12 pb-10 mb-6 shadow-sm"
      />
      
      <div className="checklist-container px-4 pb-2">
        <GettingStarted />
      </div>
      
      <div className="checklist-container px-4 pb-24">
        <OverallProgress progress={progress} />
        
        {checklist.categories.map(category => (
          <Category 
            key={category.id} 
            category={category} 
            onToggleItem={handleToggleItem}
            onUncheckAll={handleUncheckAll}
          />
        ))}
        
        <MarketingCTA />
      </div>
      
      <SaveOptions checklist={checklist} onSave={saveChecklist} />
      <ScrollIndicator />
    </div>
  );
};

export default Index;
