import React from "react";
import {about} from "../constants"
import { timing } from "../assets";

const About = () => {
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
              About Us
            </p>
            <p>{About.title}</p>
            <p className="px-4">{about.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
