
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ConsultingCTA: React.FC = () => {
  return (
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
  );
};

export default ConsultingCTA;
