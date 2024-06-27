import React, { useState, useEffect } from 'react';
import { getMonthYearDisplay, getDatesArray, generateTimeSlots } from './utilities';

const DateTimeSelector = ({
  currentStartDate,
  handlePreviousWeek,
  handleNextWeek,
  setSelectedDateTime,
  selectedDateTime,
  handleNext,
  handleSlotSelect,
  handleBack
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [activeTimeSlots, setActiveTimeSlots] = useState({});

  useEffect(() => {
    // Function to find the next active date if the current selected date is inactive
    const findNextActiveDate = (date) => {
      let nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
      while (isSunday(nextDate) || isOffDate(nextDate)) {
        nextDate = new Date(nextDate.getTime() + 24 * 60 * 60 * 1000);
      }
      return nextDate;
    };

    // Check if the selected date is inactive (Sunday or off date)
    if (selectedDateTime && (isSunday(selectedDateTime) || isOffDate(selectedDateTime))) {
      const nextActiveDate = findNextActiveDate(selectedDateTime);
      setSelectedDateTime(nextActiveDate);
    }
  }, [selectedDateTime]);

  const handleTimeSlotSelection = (selectedDateTime, slot) => {
    setSelectedDateTime(selectedDateTime);
    handleSlotSelect(slot);
    handleNext();
  };

  const isSunday = (date) => {
    return date.getDay() === 0;
  };

  const inactiveDates = [
    new Date(2024, 2, 8),  // March 8th
    new Date(2024, 2, 15)  // March 15th
];

const isOffDate = (date) => {
    // Convert provided date to the same format as the dates in the inactiveDates array
    const providedDateFormat = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    return inactiveDates.some(inactiveDate => inactiveDate.getTime() === providedDateFormat.getTime());
};


  return (
    <div>
      <button onClick={handleBack} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-4">
        Back
      </button>
      <div className="flex justify-between mb-4">
        <button onClick={handlePreviousWeek} disabled={currentStartDate.getTime() <= new Date().getTime()} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
          &lt;
        </button>
        <h2 className="text-xl font-semibold mb-0">
          {getMonthYearDisplay(currentStartDate)}
        </h2>
        <button onClick={handleNextWeek} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
          &gt;
        </button>
      </div>
      <div className="flex justify-center mb-4">
        {getDatesArray(currentStartDate).map((date, index) => {
          const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
          const active = !(isSunday(date) || isOffDate(date));
          return (
            <div key={index} className="mx-2 text-center">
              <p className={`text-gray-500 ${active ? 'cursor-pointer' : 'text-gray-400'}`} onClick={() => active && setSelectedDateTime(date)}>
                {dayOfWeek}
              </p>
              <button
                onClick={() => active && setSelectedDateTime(date)}
                disabled={!active}
                className={`font-semibold py-2 px-4 rounded ${selectedDateTime && selectedDateTime.getDate && selectedDateTime.getDate() === date.getDate() ? 'bg-gray-300' : (!active ? 'text-gray-400 cursor-not-allowed' : '')}`}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
      {/* Selected Date Display */}
      {selectedDateTime && (
        <p className="text-lg font-semibold mb-4">
          Selected Date: <span className="font-bold">
            {selectedDateTime.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </p>
      )}
      <div className="flex justify-center mb-4">
        <div className="flex flex-col">
          {/* Map through time periods and render buttons */}
          {selectedDateTime && generateTimeSlots(selectedPeriod || 'morning').length === 0 ? (
            <p>No Slots Available</p>
          ) : (
            ['morning', 'afternoon', 'evening'].map((period) => (
              <React.Fragment key={period}>
                <button
                  onClick={() => setSelectedPeriod(period === selectedPeriod ? null : period)}
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 ${selectedPeriod === period ? 'bg-gray-300' : ''}`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
                {selectedPeriod === period && generateTimeSlots(period).map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeSlotSelection(selectedDateTime, slot)}
                    className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2 mb-2}`}
                  >
                    {slot}
                  </button>
                ))}
              </React.Fragment>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelector;
