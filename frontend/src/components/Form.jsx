import React, { useState, useEffect } from 'react';

const Form = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [currentStartDate, setCurrentStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const categories = [
    { id: 1, name: 'Haircut', subcategories: [{ id: 1, name: 'Men', price: '$20' }, { id: 2, name: 'Women', price: '$30' }] },
    { id: 2, name: 'Massage', subcategories: [{ id: 3, name: 'Swedish', price: '$40' }, { id: 4, name: 'Deep Tissue', price: '$50' }] }
  ];

  useEffect(() => {
    const currentDate = new Date();
    setCurrentStartDate(currentDate);
    setSelectedDate(currentDate);
  }, []);

  const handleCategorySelect = (category) => {
    if (selectedCategory === category.id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category.id);
    }
    setSelectedService('');
    setSelectedSlot('');
    setStep(1);
  };

  const handleSubCategorySelect = (subcategory) => {
    setSelectedService(subcategory.name);
    setStep(2);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setStep(3);
  };

  const handleConfirmation = () => {
    // Handle confirmation logic here
    alert("Booking confirmed");
  };

  const handlePreviousWeek = () => {
    setCurrentStartDate(new Date(currentStartDate.getTime() - 7 * 24 * 60 * 60 * 1000));
  };

  const handleNextWeek = () => {
    setCurrentStartDate(new Date(currentStartDate.getTime() + 7 * 24 * 60 * 60 * 1000));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const getMonthYearDisplay = () => {
    const startMonth = currentStartDate.getMonth();
    const startYear = currentStartDate.getFullYear();
    const endMonth = new Date(currentStartDate.getTime() + 6 * 24 * 60 * 60 * 1000).getMonth();
    const endYear = new Date(currentStartDate.getTime() + 6 * 24 * 60 * 60 * 1000).getFullYear();
    if (startMonth === endMonth) {
      return `${monthNames[startMonth]} ${startYear}`;
    } else if (startYear === endYear) {
      return `${monthNames[startMonth]} - ${monthNames[endMonth]} ${startYear}`;
    } else {
      return `${monthNames[startMonth]} ${startYear} - ${monthNames[endMonth]} ${endYear}`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4">
        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-4">Select a category</h2>
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
          </>
        )}
        {step === 2 && (
          <>
            <div className="flex justify-between mb-4">
              <button onClick={() => setStep(1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                Back
              </button>
            </div>
            <h2 className="text-xl font-semibold mb-4">Select a slot</h2>
            {/* Logic for rendering available slots */}
          </>
        )}
        {step === 3 && (
          <div>
            <div className="flex justify-between mb-4">
              <button onClick={() => setStep(2)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                Back
              </button>
            </div>
            <h2 className="text-xl font-semibold mb-4">Select a slot</h2>
            {/* Logic for rendering available slots */}
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <button onClick={handlePreviousWeek} disabled={currentStartDate.getTime() <= new Date().getTime()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                &lt;
              </button>
              <h2 className="text-xl font-semibold mb-0">
                {getMonthYearDisplay()}
              </h2>
              <button onClick={handleNextWeek} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                &gt;
              </button>
            </div>
            <div className="flex justify-center mb-4">
              {[...Array(7)].map((_, index) => {
                const date = new Date(currentStartDate.getTime() + index * 24 * 60 * 60 * 1000);
                const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
                return (
                  <div key={index} className="mx-2 text-center">
                    <p className="text-gray-500">{dayOfWeek}</p>
                    <button onClick={() => setSelectedDate(date)} className={`font-semibold py-2 px-4 rounded ${selectedDate && selectedDate.getDate() === date.getDate() ? 'bg-gray-300' : ''}`}>
                      {date.getDate()}
                    </button>
                  </div>
                );
              })}
            </div>
            {selectedDate && (
              <p className="text-lg font-semibold mb-4">
                Selected Date: <span className="font-bold">
                  {selectedDate.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </p>
            )}
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Confirmation</h2>
            <p>Service: {selectedService}</p>
            <p>Slot: {selectedSlot}</p>
            {/* Add input fields for first name, last name, mobile number, email */}
            <button onClick={handleConfirmation} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
