import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Categories from './components/Categories';
import Testimonials from './components/Testimonials';
import Stats from './components/Stats';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Contact from './components/Contact';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Apply theme to body
  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Load saved preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setDarkMode(true);
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} transition-colors duration-300`}>
      <Navbar />

      <div className="flex justify-end p-4">
        
      </div>

      <main className="space-y-20 px-4">
        <Hero />
        <WhyChooseUs />
        <Categories />

        <section className="flex flex-wrap justify-center gap-4 px-4">
          <button
            onClick={() => navigate('/register-vendor')}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
          >
            Register as Vendor
          </button>
          <button
            onClick={() => navigate('/vendors')}
            className="bg-sky-500 text-white px-6 py-3 rounded-xl hover:bg-sky-600 transition-all duration-300 transform hover:scale-105"
          >
            Browse Vendors
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Organizer Dashboard
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-gray-800 text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
          >
            Login
          </button>
        </section>

        <Testimonials />
        <Stats />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;
