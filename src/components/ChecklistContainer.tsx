
import React from 'react';
import { Category as CategoryType } from '@/lib/checklistData';
import Category from '@/components/Category'; // Updated import path
import ProgressBar from '@/components/ProgressBar';
import ConsultingCTA from '@/components/ConsultingCTA';

interface ChecklistContainerProps {
  categories: CategoryType[];
  onToggleItem: (itemId: string) => void;
  onUncheckAll: (categoryId: string) => void;
  progress: number;
}

const ChecklistContainer: React.FC<ChecklistContainerProps> = ({ 
  categories,
  onToggleItem,
  onUncheckAll,
  progress
}) => {
  return (
    <div className="checklist-container px-4 pb-24">
      <ProgressBar progress={progress} />
      
      {categories.map(category => (
        <Category 
          key={category.id} 
          category={category} 
          onToggleItem={onToggleItem}
          onUncheckAll={onUncheckAll}
        />
      ))}
      
      <ConsultingCTA />
    </div>
  );
};

export default ChecklistContainer;
