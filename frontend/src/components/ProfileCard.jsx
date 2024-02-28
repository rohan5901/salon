import React from 'react';
import 'tailwindcss/tailwind.css';

const ProfileCard = ({ name, title, description, imageUrl }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 mb-6 bg-secondary rounded-lg mx-4">
      <img className="w-full rounded-lg" src={imageUrl} alt={name} />
      <div className="px-6 py-4">
        <p className="text-gray-900 text-2xl">{title}</p>
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
};

export default ProfileCard;