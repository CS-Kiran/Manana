"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TaskList from "@/components/dashboard/TaskList";
import { useRouter } from "next/navigation";

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        if (res.ok) {
          setTasks(data.tasks);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleStatusChange = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  const handleDelete = (deletedTaskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== deletedTaskId));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-6"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Mindful Tasks
        </h1>
        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      </motion.div>
    </div>
  );
}