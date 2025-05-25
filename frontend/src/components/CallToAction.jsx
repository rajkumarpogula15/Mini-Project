// components/CallToAction.jsx
import React from 'react';

const CallToAction = () => {
  return (
    <section className="bg-white py-20 px-6 text-center text-gray-900">
      <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 max-w-3xl mx-auto">
        🚀 Ready to host or attend the next big tech event?
      </h2>
      <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-md mx-auto">
        <button
          className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md
                     hover:bg-indigo-700 transition duration-300 ease-in-out
                     focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          Sign Up
        </button>
        <button
          className="border-2 border-indigo-600 text-indigo-600 font-semibold px-8 py-3 rounded-lg
                     hover:bg-indigo-50 transition duration-300 ease-in-out
                     focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          Sign In
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
