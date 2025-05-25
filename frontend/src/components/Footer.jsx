// components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-white mb-2">Tech Event Management</h3>
          <p className="text-sm max-w-xs">
            Empowering tech enthusiasts, organizers, and experts to connect and create unforgettable events.
          </p>
        </div>

        {/* Middle Section */}
        <nav className="flex gap-8 text-sm">
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/features" className="hover:text-white transition">Features</a>
          <a href="/events" className="hover:text-white transition">Events</a>
          <a href="/contact" className="hover:text-white transition">Contact</a>
          <a href="/terms" className="hover:text-white transition">Terms</a>
          <a href="/privacy" className="hover:text-white transition">Privacy</a>
        </nav>

        {/* Right Section */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex gap-4 text-2xl">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <i className="fab fa-github"></i>
            </a>
            <a href="mailto:contact@techeventpro.com" className="hover:text-white">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
          <p className="text-xs">
            Made with 💻 by Batch 12 @ 3rd year CSE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
