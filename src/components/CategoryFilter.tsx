
import { Button } from './ui/button';
import { Category } from '../types/product';

interface CategoryFilterProps {
  selectedCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
}

const categories: (Category | 'all')[] = ['all', 'gambling', 'trading', 'betting', 'social media', 'sales'];

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "secondary"}
          className={`${
            selectedCategory === category 
              ? "bg-white text-black" 
              : "bg-[#1E2533] text-white hover:bg-[#2A3441]"
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Button>
      ))}
    </div>
  );
}