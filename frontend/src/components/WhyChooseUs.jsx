// src/components/WhyChooseUs.jsx
import { FaTrophy, FaStar, FaClock } from 'react-icons/fa';
import { motion }          from 'framer-motion';
import './WhyChooseUs.css';

const benefits = [
  { icon: <FaTrophy />, title: 'Trusted by 500+ Clients'      },
  { icon: <FaStar   />, title: '99% Client Satisfaction Rate' },
  { icon: <FaClock  />, title: '5+ Years of Experience'       },
];

export default function WhyChooseUs() {
  return (
    <section className="why-us container">
      <h2 className="section-title">Why Choose Us?</h2>
      <div className="benefit-grid">
        {benefits.map((b, i) => (
          <motion.div
            className="benefit-card"
            key={i}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="icon-wrapper">{b.icon}</div>
            <p>{b.title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
