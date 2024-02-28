import React from 'react';
import 'tailwindcss/tailwind.css';
import ProfileCard from './ProfileCard';
import { profiles } from '../constants';

const Team = () => {

  return (
    <div className="flex flex-row items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-row max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        {profiles.map((profile) => (
            <ProfileCard {...profile} />
        ))}
      </div>
    </div>
  );
};

export default Team;
