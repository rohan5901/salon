// Category.jsx

import React from 'react';

const Category = ({ 
  selectedCategory, 
  handleCategorySelect, 
  setSelectedSubCategories, 
  selectedSubCategories, 
  handleNext 
}) => {
  const categories = [
    { id: 1, name: 'Haircut', subcategories: [{ id: 1, name: 'Men', price: '$20' }, { id: 2, name: 'Women', price: '$30' }] },
    { id: 2, name: 'Massage', subcategories: [{ id: 3, name: 'Swedish', price: '$40' }, { id: 4, name: 'Deep Tissue', price: '$50' }] }
  ];

  const handleSubCategorySelect = (subcategory) => {
    setSelectedSubCategories(prevState => ({
      ...prevState,
      [subcategory.id]: subcategory
    }));
  };

  const removeSelectedSubCategory = (subcategory) => {
    setSelectedSubCategories(prevState => {
      const updatedState = { ...prevState };
      delete updatedState[subcategory.id];
      return updatedState;
    });
  };

  return (
    <>
      {/* Selected Sub-Categories */}
      <div className="flex flex-wrap mb-4">
        {Object.values(selectedSubCategories).map((subcategory, index) => (
          <div key={index} className="bg-gray-200 rounded-full px-3 py-1 m-1 flex items-center">
            <span className="mr-1">{subcategory.name}</span>
            <button
              onClick={() => removeSelectedSubCategory(subcategory)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Categories and Sub-Categories */}
      {categories.map(category => (
        <div key={category.id} className="mb-4">
          <button
            onClick={() => handleCategorySelect(category)}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${selectedCategory === category.id ? 'bg-gray-300' : ''}`}
          >
            {category.name}
          </button>
          {selectedCategory === category.id && (
            <div>
              {category.subcategories.map(subcategory => (
                <div key={subcategory.id} className="mb-2">
                  <button onClick={() => handleSubCategorySelect(subcategory)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                    {subcategory.name} - {subcategory.price}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Next Button */}
      <button onClick={handleNext} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Next
      </button>
    </>
  );
};

export default Category;
