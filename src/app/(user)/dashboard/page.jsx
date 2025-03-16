"use client";

import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar } from "@/components/dashboard/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-background to-accent/5">
      <Sidebar />

      {/* Main Content Area */}
      <ScrollArea className="flex-1">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-8"
        >
          {/* Add your content components here */}
          <div className="text-center text-muted-foreground">
            Select a section from the sidebar
          </div>
        </motion.main>
      </ScrollArea>
    </div>
  );
}