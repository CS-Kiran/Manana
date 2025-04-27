"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TaskForm from "@/components/dashboard/TaskForm";
import TaskList from "@/components/dashboard/TaskList";
import { useRouter } from "next/navigation";

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

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

  const handleSuccess = (newTask) => {
    setShowForm(false);
    setEditingTask(null);
    if (newTask) {
      setTasks((prevTasks) => [newTask, ...prevTasks]);
    } else {
      router.refresh();
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Mindful Tasks
          </h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {showForm ? "View Tasks" : "Add Task"}
          </button>
        </div>

        {showForm ? (
          <TaskForm onSuccess={handleSuccess} editingTask={editingTask} />
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        )}
      </motion.div>
    </div>
  );
}