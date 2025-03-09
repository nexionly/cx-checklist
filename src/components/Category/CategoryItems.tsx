
import { ChecklistItem as ChecklistItemType } from '@/lib/checklistData';
import ChecklistItem from '@/components/ChecklistItem';

interface CategoryItemsProps {
  items: ChecklistItemType[];
  categoryId: string;
  onToggle: (itemId: string) => void;
}

export const CategoryItems = ({ items, categoryId, onToggle }: CategoryItemsProps) => {
  // Handle keyboard navigation between items
  const handleItemKeyDown = (e: React.KeyboardEvent, currentId: string) => {
    const currentIndex = items.findIndex(item => item.id === currentId);
    
    // Arrow up - move to previous item
    if (e.code === 'ArrowUp' && currentIndex > 0) {
      e.preventDefault();
      const prevItem = document.querySelector(`[data-item-id="${items[currentIndex - 1].id}"]`) as HTMLElement;
      if (prevItem) prevItem.focus();
    }
    
    // Arrow down - move to next item
    if (e.code === 'ArrowDown' && currentIndex < items.length - 1) {
      e.preventDefault();
      const nextItem = document.querySelector(`[data-item-id="${items[currentIndex + 1].id}"]`) as HTMLElement;
      if (nextItem) nextItem.focus();
    }
  };

  return (
    <div className="space-y-1">
      {items.map((item, index) => (
        <ChecklistItem 
          key={item.id} 
          item={item} 
          index={index}
          categoryId={categoryId}
          onToggle={onToggle}
          onKeyDown={handleItemKeyDown}
        />
      ))}
    </div>
  );
};
