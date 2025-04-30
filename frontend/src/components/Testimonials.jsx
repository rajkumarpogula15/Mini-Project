import { motion } from 'framer-motion';
import './Testimonials.css';

const testimonials = [
  {
    img: '/images/user1.jpg',
    text: '“Amazing experience! Everything went smoothly.”',
    name: 'Priya, Hyderabad',
  },
  {
    img: '/images/user2.jpg',
    text: '“Truly professional and creative team!”',
    name: 'Aarav, Bengaluru',
  },
  {
    img: '/images/user3.jpg',
    text: '“Our event turned out even better than we imagined!”',
    name: 'Meera, Pune',
  },
];

function Testimonials() {
  return (
    <section className="testimonials">
      <h2>What Our Clients Say</h2>
      <div className="testimonial-wrapper">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="testimonial-card"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img src={t.img} alt={`User${i + 1}`} />
            <p>{t.text}</p>
            <strong>– {t.name}</strong>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
