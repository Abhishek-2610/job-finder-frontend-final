import React from "react";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision.jsx";

const HeroSection = () => {
  return (
    <BackgroundBeamsWithCollision>
      <div className="flex flex-col items-center justify-center gap-3 text-center min-h-screen p-4">
        
        {/* Badge Section */}
        <div className="rounded-full py-2 px-4 bg-gray-700 flex flex-row items-center mb-5">
          <div className="rounded-full bg-blue-500 text-white mr-2">
            <span className="py-1 px-2 text-xs md:text-sm">NEW</span>
          </div>
          <span className="text-white text-sm md:text-base">Create Resume in 5 mins</span>
        </div>
        
        {/* Hero Title */}
        <div className="relative text-3xl md:text-5xl text-white font-bold">
          Your Dream Career Starts Here
        </div>

        {/* Gradient Text */}
        <div className="relative text-3xl md:text-5xl bg-gradient-to-r from-blue-400 via-green-200 to-purple-400 text-transparent bg-clip-text font-bold block leading-tight">
          Effortless Resume Buildings.
        </div>

        {/* Description */}
        <div className="relative p-2 text-gray-500 max-w-2xl font-bold text-sm md:text-base">
          Craft a winning resume with our easy-to-use AI-powered builder. Select templates, input details, and get a ready-to-use resume in minutes! Start now.
        </div>

        {/* Gradient Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <button className="px-4 md:px-6 py-2 text-white font-semibold bg-gradient-to-r from-blue-400 to-green-400 rounded-2xl shadow-md hover:opacity-80 transition">
            Get Started
          </button>
          <button className="px-4 md:px-6 py-2 text-white font-semibold bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl shadow-md hover:opacity-80 transition">
            Learn More
          </button>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default HeroSection;
