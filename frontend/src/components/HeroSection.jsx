// src/components/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../assets/animations/Home.json';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      
      {/* 🔵 Proper Fullscreen Background Animation */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Lottie
          animationData={animationData}
          loop
          autoplay
          className="w-full h-full"
        />
      </div>

      {/* 🔵 Overlay to reduce animation brightness */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-10" />

      {/* 🔵 Foreground Content */}
      <div className="relative z-20 py-20 px-6 text-center max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
          Your All-in-One Solution for{' '}
          <span className="block text-indigo-600">Tech Event Management</span>
        </h1>

        <p className="text-md sm:text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
          Plan, host, and engage in immersive webinars, hackathons, and expert-led sessions — all from one seamless platform.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/login">
            <button className="bg-indigo-600 text-white text-sm sm:text-base px-6 py-3 rounded-full font-semibold shadow-md hover:bg-indigo-700 transition">
              🎉 Host an Event
            </button>
          </Link>

          <Link to="/login">
            <button className="bg-purple-600 text-white text-sm sm:text-base px-6 py-3 rounded-full font-semibold shadow-md hover:bg-purple-700 transition">
              🎙️ Join as an Expert
            </button>
          </Link>

          <Link to="/login">
            <button className="bg-gray-200 text-gray-900 text-sm sm:text-base px-6 py-3 rounded-full font-medium hover:bg-gray-300 transition">
              🔍 Attend an Event
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
