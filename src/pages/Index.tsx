
import React, { useState, useEffect } from 'react';
import { initialChecklist, Checklist } from '@/lib/checklistData';
import Header from '@/components/Header';
import Category from '@/components/Category';
import SaveOptions from '@/components/SaveOptions';
import ScrollIndicator from '@/components/ScrollIndicator';
import { useToast } from '@/hooks/use-toast';
import { BarChart2, Info, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Index = () => {
  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGettingStartedOpen, setIsGettingStartedOpen] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setTimeout(() => {
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
    
    localStorage.setItem('cx-checklist', JSON.stringify(updatedChecklist));
  };

  const handleSave = () => {
    if (!checklist) return;
    localStorage.setItem('cx-checklist', JSON.stringify(checklist));
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
        title="Customer Experience Essentials Checklist"
        className="bg-gradient-to-r from-blue-50 to-indigo-50 pt-12 pb-10 mb-6 shadow-sm"
      />
      
      <div className="checklist-container px-4 pb-2">
        <Collapsible
          open={isGettingStartedOpen}
          onOpenChange={setIsGettingStartedOpen}
          className="bg-white border border-gray-100 rounded-xl mb-8 shadow-sm transition-all duration-200"
        >
          <div className="flex items-center justify-between p-4 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                <Info className="h-5 w-5 text-blue-500" />
              </div>
              <h2 className="text-xl font-medium text-gray-800">Getting Started</h2>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                {isGettingStartedOpen ? 
                  <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                }
              </Button>
            </CollapsibleTrigger>
          </div>
          
          <CollapsibleContent className="px-4 pb-6">
            <div className="ml-14">
              <p className="text-gray-600 leading-relaxed mb-4">
                This checklist is your actionable guide to building a high-performing CX team from the ground up. 
                It's designed to help you systematically consider all the critical elements, from defining your strategic vision 
                to implementing the right processes and tools across Onboarding, Support, Customer Success, and more.
              </p>
              <div className="flex items-center gap-2 bg-amber-50 p-3 rounded-md text-sm text-amber-700 border border-amber-100">
                <Info className="h-4 w-4" />
                <span>Your progress is saved locally in your browser.</span>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
      
      <div className="checklist-container px-4 pb-24">
        <div className="bg-white border border-gray-100 rounded-xl p-5 mb-8 shadow-sm animate-scale-in">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-medium">Overall Progress</h2>
            </div>
            <span className="text-2xl font-semibold">{progress}%</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-700 ease-in-out",
                progress === 100 ? "bg-green-500" : "bg-primary"
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {checklist.categories.map(category => (
          <Category 
            key={category.id} 
            category={category} 
            onToggleItem={handleToggleItem}
            onUncheckAll={handleUncheckAll}
          />
        ))}
        
        {/* CTA Section */}
        <div className="mt-12 mb-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl overflow-hidden shadow-lg animate-fade-in">
          <div className="p-8 md:p-10 text-center md:text-left md:flex items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl font-bold text-white mb-3">Need help implementing your CX strategy?</h2>
              <p className="text-blue-100 max-w-xl">
                Building a customer experience function can be challenging. Get expert guidance on 
                implementing this checklist and creating a CX strategy that delivers results.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-md"
                onClick={() => window.open('https://mattegreenmedia.com/', '_blank')}
              >
                Book a Call
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <SaveOptions checklist={checklist} onSave={handleSave} />
      <ScrollIndicator />
    </div>
  );
};

export default Index;
