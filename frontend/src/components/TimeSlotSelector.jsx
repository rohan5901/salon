// TimeSlotSelector.jsx

import React from 'react';

const TimeSlotSelector = ({ timePeriod, handleSlotSelect }) => {
  const generateTimeSlots = () => {
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
    <div className="flex flex-wrap">
      {generateTimeSlots().map((slot, index) => (
        <button
          key={index}
          onClick={() => handleSlotSelect(slot)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2 mb-2"
        >
          {slot}
        </button>
      ))}
    </div>
  );
};

export default TimeSlotSelector;
