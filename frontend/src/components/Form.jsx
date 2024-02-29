import React, { useState, useEffect } from 'react';
import { notification } from '../assets';
import CategorySelector from './CategorySelector';
import DateTimeSelector from './DateTimeSelector';
import BookingConfirmation from './BookingConfirmation';

const Form = () => {
  const [step, setStep] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [currentStartDate, setCurrentStartDate] = useState(new Date());
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState({});
  const [categories] = useState([
    { id: 1, name: 'Haircut', subcategories: [{ id: 1, name: 'Men', price: '$20' }, { id: 2, name: 'Women', price: '$30' }] },
    { id: 2, name: 'Massage', subcategories: [{ id: 3, name: 'Swedish', price: '$40' }, { id: 4, name: 'Deep Tissue', price: '$50' }] }
  ]);

  useEffect(() => {
    const currentDate = new Date();
    setCurrentStartDate(currentDate);
    setSelectedDateTime(currentDate);
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id === selectedCategory ? null : category.id);
    setStep(1);
  };

  const handleSubCategorySelect = (subcategory) => {
    if (selectedSubCategories[subcategory.id]) {
      // Subcategory already selected, do nothing
      return;
    }
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

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setStep(3);
  };

  const handleConfirmation = () => {
    // Handle confirmation logic here
    alert("Booking confirmed");
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handlePreviousWeek = () => {
    setCurrentStartDate(new Date(currentStartDate.getTime() - 7 * 24 * 60 * 60 * 1000));
  };

  const handleNextWeek = () => {
    setCurrentStartDate(new Date(currentStartDate.getTime() + 7 * 24 * 60 * 60 * 1000));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4">
        {/* Navbar */}
        <nav className="flex flex-col justify-between items-center text-black mb-4 mt-2">
          <div className="flex items-center">
            <span className="text-4xl font-semibold">SALON</span>
            <div className="ml-4">
              <img src={notification} alt="Notification" className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center">
            <span className={step === 1 ? 'text-black cursor-default' : 'text-gray-500 cursor-default'}>Service</span>
            <span className="mx-2">&#62;</span>
            <span className={step === 2 ? 'text-black cursor-default' : 'text-gray-500 cursor-default'}>Slot</span>
            <span className="mx-2">&#62;</span>
            <span className={step === 3 ? 'text-black cursor-default' : 'text-gray-500 cursor-default'}>Confirm</span>
          </div>
        </nav>

        {step === 1 && (
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            selectedSubCategories={selectedSubCategories}
            handleCategorySelect={handleCategorySelect}
            handleSubCategorySelect={handleSubCategorySelect}
            removeSelectedSubCategory={removeSelectedSubCategory}
            handleNext={handleNext}
            setSelectedSubCategories={setSelectedSubCategories} // Pass setSelectedSubCategories as a prop
          />
        )}

        {step === 2 && (
          <DateTimeSelector
            currentStartDate={currentStartDate}
            handlePreviousWeek={handlePreviousWeek}
            handleNextWeek={handleNextWeek}
            setSelectedDateTime={setSelectedDateTime}
            selectedDateTime={selectedDateTime}
            handleNext={handleNext}
            handleSlotSelect={handleSlotSelect}
            handleBack={handleBack}
          />
        )}

        {step === 3 && (
          <BookingConfirmation
          selectedSubCategories={selectedSubCategories}
          selectedDateTime={selectedDateTime}
          selectedSlot={selectedSlot}
          handleBack={handleBack}
          handleConfirmation={handleConfirmation}
        />
        )}
      </div>
    </div>
  );
};

export default Form;
