
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingSkeleton: React.FC = () => {
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
};

export default LoadingSkeleton;
