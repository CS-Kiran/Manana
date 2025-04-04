"use client";

import { motion } from "framer-motion";
import { Calendar, Brain, Bell, BarChart3, Search, Sparkles } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Calendar,
      title: "Capture Tasks",
      description: "Effortlessly organize what needs to be done with intuitive task management tools",
      color: "from-teal-500 to-emerald-400"
    },
    {
      icon: Brain,
      title: "Digital Diary",
      description: "Document thoughts, insights, and moments worth remembering in your personal journal",
      color: "from-violet-600 to-indigo-500"
    },
    {
      icon: Bell,
      title: "Gentle Reminders",
      description: "Receive thoughtful notifications that respect your focus and keep you on track",
      color: "from-amber-500 to-orange-400"
    },
    {
      icon: BarChart3,
      title: "Progress Visualization",
      description: "Watch your productivity bloom through intuitive insights and visual tracking",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: Search,
      title: "Find What Matters",
      description: "Easily retrieve past entries and tasks with powerful semantic search",
      color: "from-rose-500 to-pink-400"
    },
    {
      icon: Sparkles,
      title: "Evolve with AI",
      description: "Coming soon: intelligent assistance that enhances your experience without overwhelming it",
      color: "from-purple-500 to-fuchsia-400"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="features" className="py-20 px-4 relative">
      {/* Background elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-30 dark:opacity-10"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-30 dark:opacity-10"></div>
      
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Features that Empower Mindfulness</h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
            Manana combines thoughtful design with powerful functionality to help you stay organized and mindful throughout your day.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border/50"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${feature.color} w-fit mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}