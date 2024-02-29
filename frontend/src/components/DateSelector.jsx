// DateSelector.jsx

import React from 'react';

const DateSelector = ({ 
  currentStartDate, 
  handlePreviousWeek, 
  handleNextWeek, 
  getMonthYearDisplay, 
  getDatesArray, 
  setSelectedDate 
}) => {
  return (
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
    </div>
  );
};

export default DateSelector;
