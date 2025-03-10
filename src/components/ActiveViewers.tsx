
import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const ActiveViewers: React.FC<{ className?: string }> = ({ className }) => {
  const [viewerCount, setViewerCount] = useState<number>(0);
  
  useEffect(() => {
    // Generate initial random count between 1 and 8
    const initialCount = Math.floor(Math.random() * 8) + 1;
    setViewerCount(initialCount);
    
    // Set up interval to occasionally adjust the count slightly
    const interval = setInterval(() => {
      // 70% chance of no change
      const shouldChange = Math.random() > 0.7;
      
      if (shouldChange) {
        setViewerCount(prevCount => {
          // Only increase or decrease by 0 or 1
          const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
          const newCount = prevCount + change;
          
          // Keep between 1 and 8
          if (newCount < 1) return 1;
          if (newCount > 8) return 8;
          return newCount;
        });
      }
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  if (viewerCount === 0) return null; // Don't show until initialized
  
  return (
    <div className={cn(
      "fixed bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md border border-gray-100 flex items-center gap-1.5 text-sm font-medium text-gray-700 transition-opacity animate-fade-in z-20",
      className
    )}>
      <Users size={14} className="text-primary" />
      <span>{viewerCount} viewing now</span>
    </div>
  );
};

export default ActiveViewers;
