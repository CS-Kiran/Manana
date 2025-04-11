"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 md:px-10 pb-16 pt-10 overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute top-20 -left-64 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl opacity-30 dark:opacity-10 animate-blob"></div>
      <div className="absolute bottom-20 -right-64 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl opacity-30 dark:opacity-10 animate-blob animation-delay-4000"></div>
      
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl relative z-10 gap-12"
      >
        <motion.div 
          className="w-full lg:w-1/2 text-left flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-lg">
            Stay Mindful,<br className="hidden md:block" /> Stay Productive
          </h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <p className="text-lg text-foreground/70 mb-6">
              Manana helps you track tasks and reflect on your thoughts
              effortlessly.
            </p>
            <p className="text-lg text-foreground/70 mb-6">
              Organize your daily activities, set reminders, and gain insights
              into your productivity. Our intuitive interface ensures a seamless
              experience while keeping you focused and stress-free.
            </p>
            <p className="text-lg text-foreground/70 mb-8">
              Whether you're planning your day or journaling your thoughts, Manana
              is designed to support your journey towards mindfulness and
              productivity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link href="/login">
              <motion.button
                className="rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold transition-all duration-300 shadow-lg w-fit px-8 py-3 text-lg relative overflow-hidden group"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Get Started</span>
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="w-full lg:w-1/2 h-80 sm:h-96 md:h-[30rem] flex justify-center lg:justify-end items-center relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <motion.div 
            className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-xl"
            whileHover={{ 
              scale: 1.03,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="relative w-full h-full">
              {/* Video overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 mix-blend-overlay"></div>
              
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-90 transition-opacity duration-300 ease-in-out"
                src="/videos/mindful.mp4"
              />
              
              {/* Video border glow effect */}
              <div className="absolute inset-0 rounded-3xl border border-border/20 pointer-events-none"></div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}