// src/components/HeroSection.jsx
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../assets/animations/Home.json';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 12,
    },
  },
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const HeroSection = () => {
  const lottieRef = useRef();

  // Play Lottie only once on mount
  useEffect(() => {
    lottieRef.current?.play();
  }, []);

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* 🔵 Background Animation (once on load) */}
      <motion.div
        className="absolute inset-0 z-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}
          autoplay={false}
          className="w-full h-full"
        />
      </motion.div>

      {/* 🔵 Foreground Content */}
      <motion.div
        className="relative z-20 py-20 px-6 text-center max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          variants={fadeUp}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6"
        >
          Your All-in-One Solution for{' '}
          <span className="block text-indigo-600">Tech Event Management</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-md sm:text-lg md:text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          Plan, host, and engage in immersive webinars, hackathons, and expert-led sessions — all from one seamless platform.
        </motion.p>

        <motion.div
          variants={zoomIn}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/login">
              <button className="bg-indigo-600 text-white text-sm sm:text-base px-6 py-3 rounded-full font-semibold shadow-md hover:bg-indigo-700 transition">
                🎉 Host an Event
              </button>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/login">
              <button className="bg-purple-600 text-white text-sm sm:text-base px-6 py-3 rounded-full font-semibold shadow-md hover:bg-purple-700 transition">
                🎙️ Join as an Expert
              </button>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/login">
              <button className="bg-gray-200 text-gray-900 text-sm sm:text-base px-6 py-3 rounded-full font-medium hover:bg-gray-300 transition">
                🔍 Attend an Event
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
