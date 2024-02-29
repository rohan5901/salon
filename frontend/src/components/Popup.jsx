import React from 'react';

const Popup = ({ title, options, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            &times;
          </button>
        </div>
        <div>
          {options.map(option => (
            <button
              key={option.id}
              onClick={() => onSelect(option)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg mb-2 w-full text-left"
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popup;
