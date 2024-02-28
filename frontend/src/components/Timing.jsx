import React from "react";
import {timings} from "../constants"
import { timing } from "../assets";

const Timing = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <div className="flex">
          <div className="w-1/2">
            <img
              src={timing}
              alt="Timing"
              className="rounded-lg"
            />
          </div>
          <div className="w-1/2 text-center flex flex-col justify-evenly">
            <p className="text-2xl font-bold mb-2">
              {timings.greeting1}
            </p>
            <p className="">{timings.greeting2.toUpperCase()}</p>
            <p>{timings.greeting3}</p>
            <ul>
              {Object.entries(timings.timings).map(([day, time]) => (
                <li key={day}>{day}: {time}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timing;
