import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorks from './components/HowItWorks';
import Categories from './components/Categories';
import Stats from './components/Stats';
import EventsSection from './components/EventsSection';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import Hero from './components/Hero';

function Home() {
  return (
    <>
      <HeroSection />
      <Hero />
      <Categories />
      <AboutSection />
      <Stats />
      <FeaturesSection />
      <HowItWorks />
      <EventsSection />
      <Testimonials />
      <CallToAction />
    </>
  );
}

const App = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-gray-900">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add other routes here if needed */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
