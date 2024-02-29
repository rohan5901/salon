import React from 'react';

const BookingConfirmation = ({ selectedSubCategories, selectedSlot, handleBack, handleConfirmation, selectedDateTime }) => {
  return (
    <div>
      <button onClick={handleBack} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-4">
        Back
      </button>
      <div className="flex flex-wrap mb-4">
        {Object.values(selectedSubCategories).map((subcategory, index) => (
          <div key={index} className="bg-gray-200 rounded-full px-3 py-1 m-1 flex items-center">
            <span className="mr-1">{subcategory.name} - {subcategory.selectedStaff.name}</span>
          </div>
        ))}
      </div>
      <p>{selectedDateTime.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {selectedSlot}</p>
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
  );
};

export default BookingConfirmation;
