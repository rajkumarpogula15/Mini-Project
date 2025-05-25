import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-white via-gray-50 to-white py-20 px-6 text-center overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
          Your All-in-One Solution for{' '}
          <span className="block text-indigo-600">Tech Event Management</span>
        </h1>

        <p className="text-md sm:text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
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
