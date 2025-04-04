"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  const techStack = [
    { name: "Next.js 15", icon: "/images/nextjs.svg" },
    { name: "MongoDB Atlas", icon: "/images/mongodb.svg" },
    { name: "ShadCN-UI", icon: "/images/shadcn.svg" },
  ];

  return (
    <section
      id="about"
      className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              The Story Behind Manana
            </h2>

            <p className="text-lg text-foreground/70 mb-6">
              <span className="font-semibold">Manana (मनन)</span> - derived from
              the Sanskrit word for reflection and deep contemplation - was born
              from a simple realization:
            </p>

            <p className="text-lg text-foreground/70 mb-6">
              In our fast-paced digital world, staying organized while
              maintaining mindfulness can feel impossible. We wanted to create a
              beautifully simple yet powerful tool that brings calm to your
              daily digital experience.
            </p>

            <p className="text-lg text-foreground/70 mb-8">
              Our mission is to help you capture tasks, reflect on your
              thoughts, and visualize your progress - all within an interface
              designed for clarity and peace of mind.
            </p>

            <h3 className="text-xl font-semibold mb-4">
              Built with Care Using
            </h3>

            <div className="flex flex-wrap gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-md border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
                >
                  <div className="w-5 h-5 relative">
                    <div className="w-5 h-5 bg-muted rounded-full" />
                    <Image src={tech.icon} alt={tech.name} fill />
                  </div>
                  <span className="font-medium">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="w-full lg:w-1/2 h-[400px] relative rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 z-10" />
            <div className="relative w-full h-full">
              <Image
                src="/images/home.png"
                alt="Manana app interface screenshot"
                fill
                className="object-contain p-4"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-6">
                <h3 className="text-3xl text-center font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  Your Mindful Digital Companion
                </h3>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
