"use client";

import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background to-accent/5">      
      <ScrollArea className="flex-1">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-8"
        >
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 heading-gradient">
              Welcome to Manana
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border glass-card hover:bg-card/80 transition-colors">
                <h2 className="text-xl font-semibold mb-2">Tasks</h2>
                <p className="text-muted-foreground">Manage your daily tasks and stay organized.</p>
              </div>
              <div className="p-6 rounded-xl border glass-card hover:bg-card/80 transition-colors">
                <h2 className="text-xl font-semibold mb-2">Diary</h2>
                <p className="text-muted-foreground">Record your thoughts and reflections.</p>
              </div>
              <div className="p-6 rounded-xl border glass-card hover:bg-card/80 transition-colors">
                <h2 className="text-xl font-semibold mb-2">Calendar</h2>
                <p className="text-muted-foreground">Plan and view your schedule.</p>
              </div>
            </div>
          </div>
        </motion.main>
      </ScrollArea>
    </div>
  );
}