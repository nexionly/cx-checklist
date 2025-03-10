
import React from 'react';
import { Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface GettingStartedProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const GettingStarted: React.FC<GettingStartedProps> = ({ 
  isOpen, 
  onOpenChange 
}) => {
  return (
    <div className="px-4 pb-2">
      <Collapsible
        open={isOpen}
        onOpenChange={onOpenChange}
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
              {isOpen ? 
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
  );
};

export default GettingStarted;
