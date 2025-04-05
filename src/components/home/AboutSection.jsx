"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  const techStack = [
    { name: "Next.js 15", icon: "/images/nextjs.svg" },
    { name: "MongoDB Atlas", icon: "/images/mongodb.svg" },
    { name: "ShadCN-UI", icon: "/images/shadcn.svg" },
  ];

  // Custom animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };
  
  return (
    <section
      id="about"
      className="py-20 px-4 relative overflow-hidden"
    >
      {/* Abstract background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30" />
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
      
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4 inline-block">
            Our Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent inline-block">
            The Story Behind Manana
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left content */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <motion.p 
                custom={0}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-lg md:text-xl text-foreground/80 leading-relaxed"
              >
                <span className="font-semibold text-foreground">Manana (मनन)</span> - derived from
                the Sanskrit word for reflection and deep contemplation - was born
                from a simple realization.
              </motion.p>

              <motion.p 
                custom={1}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-lg text-foreground/70 leading-relaxed"
              >
                In our fast-paced digital world, staying organized while
                maintaining mindfulness can feel impossible. We wanted to create a
                beautifully simple yet powerful tool that brings calm to your
                daily digital experience.
              </motion.p>

              <motion.div
                custom={2}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/30 shadow-md"
              >
                <p className="text-lg italic text-foreground/80">
                  "Our mission is to help you capture tasks, reflect on your
                  thoughts, and visualize your progress - all within an interface
                  designed for clarity and peace of mind."
                </p>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <span className="w-10 h-1 bg-primary mr-3 rounded-full"></span>
                Built with Care Using
              </h3>

              <div className="flex flex-wrap gap-4">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 bg-card/80 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-md border border-border/30"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    <div className="w-6 h-6 relative">
                      <div className="w-6 h-6 bg-background rounded-full absolute inset-0" />
                      <Image src={tech.icon} alt={tech.name} fill className="p-0.5" />
                    </div>
                    <span className="font-medium text-foreground">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - Adjusted height and layout */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Container with better aspect ratio */}
            <div className="relative w-full pt-4 pb-8 px-4">
              {/* Frame */}
              <motion.div 
                className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/20 via-background/0 to-accent/20 blur-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              />
              
              {/* Image container with adjusted aspect ratio */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-border/20">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 z-10" />
                
                {/* Reflection effect */}
                <div className="absolute inset-0 bg-card/20 backdrop-blur-sm z-5" />
                
                <div className="relative w-full h-full">
                  <Image
                    src="/images/home.png"
                    alt="Manana app interface screenshot"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover p-3 z-10"
                    priority
                  />
                  
                  {/* Overlay at bottom - adjusted padding */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-6 flex flex-col items-center">
                    <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                      Your Mindful Digital Companion
                    </h3>
                    <motion.button
                      className="mt-3 px-5 py-2 bg-primary/90 hover:bg-primary text-primary-foreground rounded-full font-medium shadow-lg shadow-primary/20 flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Started
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>
              
              {/* Floating feature badges - repositioned for better alignment */}
              <motion.div
                className="absolute -left-2 md:left-2 top-8 bg-card shadow-lg rounded-full px-4 py-2 flex items-center gap-2 border border-border/30 z-20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                <span className="font-medium">Task Tracking</span>
              </motion.div>
              
              <motion.div
                className="absolute -right-2 md:right-2 bottom-2 bg-card shadow-lg rounded-full px-4 py-2 flex items-center gap-2 border border-border/30 z-20"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
                <span className="font-medium">Mindfulness Timer</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}