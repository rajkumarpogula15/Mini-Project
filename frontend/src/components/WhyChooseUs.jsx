import React from 'react';
import { FaTrophy, FaStar, FaClock } from 'react-icons/fa';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <h2>Why Choose Us?</h2>
      <div className="why-cards">
        <div className="why-card">
          <FaTrophy size={48} style={{ color: 'var(--text-color)' }} />
          <h3>Trusted by 500+ Clients</h3>
        </div>
        <div className="why-card">
          <FaStar size={48} style={{ color: 'var(--text-color)' }} />
          <h3>99% Client Satisfaction Rate</h3>
        </div>
        <div className="why-card">
          <FaClock size={48} style={{ color: 'var(--text-color)' }} />
          <h3>5+ Years of Experience</h3>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
