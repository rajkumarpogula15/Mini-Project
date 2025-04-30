import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Categories from './components/Categories';
import Testimonials from './components/Testimonials';
import Stats from './components/Stats';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Apply theme to body
  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Load saved preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setDarkMode(true);
  }, []);

  return (
    <>
      <Navbar />
      <div className="theme-toggle-container">
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div className="homepage-container">
        <Hero />
        <WhyChooseUs />
        <Categories />

        <div className="button-group">
          <button onClick={() => navigate('/register-vendor')} className="action-button green">
            Register as Vendor
          </button>
          <button onClick={() => navigate('/vendors')} className="action-button blue">
            Browse Vendors
          </button>
          <button onClick={() => navigate('/dashboard')} className="action-button purple">
            Organizer Dashboard
          </button>
          <button onClick={() => navigate('/login')} className="action-button dark">
            Login
          </button>
        </div>

        <Testimonials />
        <Stats />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </>
  );
}

export default App;
