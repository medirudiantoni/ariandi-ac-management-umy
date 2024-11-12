import React, { useEffect, useState } from 'react';

interface DropdownProps {
  categories: {
    id: number;
    name: string;
  }[];
  selectedCategoryId: number;
  onSelectCategory: (category: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ categories, selectedCategoryId, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | ''>('');

  useEffect(() => {
    if(selectedCategoryId){
      setSelectedCategory(selectedCategoryId)
    }
  }, [selectedCategoryId]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCategory(Number(selectedValue));
    onSelectCategory(Number(selectedValue));
  };

  return (
    <div>
      <select value={selectedCategory} onChange={handleChange} className="dropdown focus:outline-none">
        <option value="" disabled>Select a category</option>
        {categories.map((category, index) => (
          <option key={index} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
