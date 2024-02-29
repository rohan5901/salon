import React, { useState } from 'react';
import Popup from './Popup';

const CategorySelector = ({ 
  selectedCategory, 
  handleCategorySelect, 
  setSelectedSubCategories, 
  selectedSubCategories, 
  handleNext 
}) => {
  const categories = [
    { id: 1, name: 'Haircut', subcategories: [{ id: 1, name: 'Men', price: '$20', staff: [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ] }, { id: 2, name: 'Women', price: '$30', staff: [
      { id: 1, name: 'John Doe' }
    ] }] },
    { id: 2, name: 'Massage', subcategories: [{ id: 3, name: 'Swedish', price: '$40', staff: [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ] }, { id: 4, name: 'Deep Tissue', price: '$50', staff: [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ] }] }
  ];

  const [selectedStaff, setSelectedStaff] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleSubCategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    if (subcategory.staff.length > 1) {
      setShowPopup(true);
    } else {
      setSelectedSubCategories(prevState => ({
        ...prevState,
        [subcategory.id]: {
          ...subcategory,
          selectedStaff: subcategory.staff[0]
        }
      }));
    }
  };

  const handleStaffSelect = (staff) => {
    setSelectedStaff(staff);
    setSelectedSubCategories(prevState => ({
      ...prevState,
      [selectedSubcategory.id]: {
        ...selectedSubcategory,
        selectedStaff: staff
      }
    }));
    setShowPopup(false);
  };

  const removeSelectedSubCategory = (subcategory) => {
    setSelectedSubCategories(prevState => {
      const updatedState = { ...prevState };
      delete updatedState[subcategory.id];
      return updatedState;
    });
  };

  // Check if any subcategory is selected
  const isSubcategorySelected = Object.keys(selectedSubCategories).length > 0;

  return (
    <>
      {/* Selected Sub-Categories */}
      <div className="flex flex-wrap mb-4">
        {Object.values(selectedSubCategories).map((subcategory, index) => (
          <div key={index} className="bg-gray-200 rounded-full px-3 py-1 m-1 flex items-center">
            <span className="mr-1">{subcategory.name}</span>
            {subcategory.selectedStaff && (
              <span className="ml-1 text-sm font-semibold">{`(${subcategory.selectedStaff.name})`}</span>
            )}
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
                    {`${subcategory.name} - ${subcategory.price}`}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Next Button */}
      <button 
        onClick={handleNext} 
        className={`py-2 px-4 rounded mt-4 ${isSubcategorySelected ? 'bg-blue-500 hover:bg-blue-700 text-white font-bold' : 'bg-gray-400 text-white font-bold cursor-not-allowed'}`}
        disabled={!isSubcategorySelected}
      >
        Next
      </button>

      {/* Staff Selection Popup */}
      {showPopup && selectedSubcategory && (
        <Popup
          title="Select Staff"
          options={selectedSubcategory.staff}
          onSelect={handleStaffSelect}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default CategorySelector;
