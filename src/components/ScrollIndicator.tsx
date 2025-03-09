
import React, { useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ScrollIndicator: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const calculateScrollPercentage = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = scrollTop / (docHeight - winHeight);
    setScrollPercentage(Math.min(scrollPercent * 100, 100));
  };

  useEffect(() => {
    window.addEventListener('scroll', calculateScrollPercentage);
    return () => window.removeEventListener('scroll', calculateScrollPercentage);
  }, []);

  // Calculate the stroke-dasharray and stroke-dashoffset for the circle
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * (1 - scrollPercentage / 100);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div 
              className={`relative h-14 w-14 flex items-center justify-center bg-white rounded-full shadow-md transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 50 50">
                {/* Background circle */}
                <circle
                  cx="25"
                  cy="25"
                  r={radius}
                  fill="none"
                  stroke="#e6e6e6"
                  strokeWidth="4"
                />
                {/* Progress circle */}
                <circle
                  cx="25"
                  cy="25"
                  r={radius}
                  fill="none"
                  stroke="#9b87f5"
                  strokeWidth="4"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashoffset}
                  strokeLinecap="round"
                />
              </svg>
              {/* Removed the percentage display */}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{Math.round(scrollPercentage)}% scrolled</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ScrollIndicator;
