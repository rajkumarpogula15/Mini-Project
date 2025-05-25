import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-white via-gray-50 to-white py-20 px-6 text-center overflow-hidden">
      {/* Optional: Add a faint background pattern or illustration here */}
      {/* <img src="/images/bg-tech.svg" className="absolute top-0 left-0 w-full h-full object-cover opacity-5 pointer-events-none" alt="" /> */}

      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
  Your All-in-One Solution for{' '}
  <span className="block text-indigo-600">Tech Event Management</span>
</h1>

        <p className="text-md sm:text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Plan, host, and engage in immersive webinars, hackathons, and expert-led sessions — all from one seamless platform.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="bg-indigo-600 text-white text-sm sm:text-base px-6 py-3 rounded-full font-semibold shadow-md hover:bg-indigo-700 transition">
            🎉 Host an Event
          </button>
          <button className="bg-purple-600 text-white text-sm sm:text-base px-6 py-3 rounded-full font-semibold shadow-md hover:bg-purple-700 transition">
            🎙️ Join as an Expert
          </button>
          <button className="bg-gray-200 text-gray-900 text-sm sm:text-base px-6 py-3 rounded-full font-medium hover:bg-gray-300 transition">
            🔍 Explore Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
