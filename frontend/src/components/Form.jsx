import React, { useState, useEffect } from 'react';
import { notification } from '../assets';

const Form = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [currentStartDate, setCurrentStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('');
  const [isNextVisible, setIsNextVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState({});
  const [categories] = useState([
    { id: 1, name: 'Haircut', subcategories: [{ id: 1, name: 'Men', price: '$20' }, { id: 2, name: 'Women', price: '$30' }] },
    { id: 2, name: 'Massage', subcategories: [{ id: 3, name: 'Swedish', price: '$40' }, { id: 4, name: 'Deep Tissue', price: '$50' }] }
  ]);
  const [timePeriods, setTimePeriods] = useState({
    morning: false,
    afternoon: false,
    evening: false,
  });

  useEffect(() => {
    const currentDate = new Date();
    setCurrentStartDate(currentDate);
    setSelectedDate(currentDate);
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

  const getDatesArray = () => {
    const datesArray = [];
    const currentDate = new Date(currentStartDate);
    for (let i = 0; i < 7; i++) {
      datesArray.push(new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000));
    }
    return datesArray;
  };

  const handleTimePeriodSelect = (period) => {
    setTimePeriods(prevTimePeriods => ({
      ...prevTimePeriods,
      [period]: !prevTimePeriods[period] // Toggle the display of time slots
    }));
  };

  const generateTimeSlots = (timePeriod) => {
    let timeSlots = [];

    if (timePeriod === 'morning') {
      // Morning time slots (10 am to 12 pm)
      for (let hour = 10; hour < 12; hour++) {
        timeSlots.push(`${hour}:00 AM`);
        timeSlots.push(`${hour}:30 AM`);
      }
    } else if (timePeriod === 'afternoon') {
      // Afternoon time slots (12 pm to 5 pm)
      for (let hour = 12; hour < 17; hour++) {
        timeSlots.push(`${hour}:00 PM`);
        timeSlots.push(`${hour}:30 PM`);
      }
    } else if (timePeriod === 'evening') {
      // Evening time slots (5 pm to 7:30 pm)
      for (let hour = 17; hour < 19; hour++) {
        timeSlots.push(`${hour}:00 PM`);
        if (hour === 18) {
          timeSlots.push(`${hour}:30 PM`);
        }
      }
    }

    return timeSlots;
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
        )}

        {step === 2 && (
          <div>
            <div className="flex justify-between mb-4">
              <button onClick={() => setStep(1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                Back
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="flex justify-between mb-4">
              <button onClick={() => setStep(2)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                Back
              </button>
            </div>
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
              {getDatesArray().map((date, index) => {
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
            <div className="flex justify-center mb-4">
              <div className="flex flex-col">
                {/* Map through time periods and render buttons */}
                {['morning', 'afternoon', 'evening'].map((period) => (
                  <React.Fragment key={period}>
                    <button
                      onClick={() => handleTimePeriodSelect(period)}
                      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 ${timePeriods[period] ? 'bg-gray-300' : ''}`}
                    >
                      {period.charAt(0).toUpperCase() + period.slice(1)}
                    </button>
                    {timePeriods[period] && (
                      <div className="flex flex-wrap">
                        {generateTimeSlots(period).map((slot, index) => (
                          <button
                            key={index}
                            onClick={() => handleSlotSelect(slot)}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2 mb-2"
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            {/* Selected Sub-Categories */}
            <div className="flex flex-wrap mb-4">
              {Object.values(selectedSubCategories).map((subcategory, index) => (
                <div key={index} className="bg-gray-200 rounded-full px-3 py-1 m-1 flex items-center">
                  <span className="mr-1">{subcategory.name}</span>
                </div>
              ))}
            </div>
            <p>Slot: {selectedSlot}</p>
            {/* Input fields */}
            <div className="mt-4">
              <label className="block mb-2">
                First Name:
                <input type="text" className="form-input mt-1 block w-full py-2 px-4 rounded-lg placeholder-gray-500" placeholder="Enter First Name" />
              </label>
              <label className="block mb-2">
                Last Name:
                <input type="text" className="form-input mt-1 block w-full py-2 px-4 rounded-lg placeholder-gray-500" placeholder="Enter Last Name" />
              </label>
              <label className="block mb-2">
                Phone Number:
                <input type="text" className="form-input mt-1 block w-full py-2 px-4 rounded-lg placeholder-gray-500" placeholder="Enter Phone Number" />
              </label>
              <label className="block mb-2">
                Email:
                <input type="email" className="form-input mt-1 block w-full py-2 px-4 rounded-lg placeholder-gray-500" placeholder="Enter Email" />
              </label>
            </div>
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
