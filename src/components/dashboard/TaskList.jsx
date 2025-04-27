"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Tag, 
  CheckCircle2, 
  Circle,
  Clock,
  Trash2,
  Edit,
  Filter,
  Search,
  AlertCircle,
  ChevronDown
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function TaskList({ tasks: initialTasks, onEdit, onDelete, onStatusChange }) {
  const [tasks, setTasks] = useState(initialTasks || []);
  const [search, setSearch] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [filter, setFilter] = useState("all");
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/tasks");
        if (!res.ok) throw new Error("Failed to fetch tasks");
        
        const data = await res.json();
        setTasks(data.tasks);
        setError(null);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update task");

      const updatedTask = await res.json();
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
      onStatusChange?.(updatedTask);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    // Optimistic update
    const previousTasks = [...tasks];
    setTasks((prev) => prev.filter((task) => task._id !== taskId));
    
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete task");
      onDelete?.(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
      // Restore previous state on error
      setTasks(previousTasks);
    }
  };

  const handleEditTask = (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    if (task) {
      onEdit?.(task);
    }
  };

  // Helper to get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "text-red-500 bg-red-500/10";
      case "medium": return "text-amber-500 bg-amber-500/10";
      case "low": return "text-green-500 bg-green-500/10";
      default: return "text-blue-500 bg-blue-500/10";
    }
  };

  const getPriorityIcon = (priority) => {
    return <Clock className={`h-4 w-4 ${priority === "high" ? "text-red-500" : priority === "medium" ? "text-amber-500" : "text-green-500"}`} />;
  };

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => {
      const matchesFilter =
        filter === "all" || task.status === filter;
      const matchesPriority =
        selectedPriority === "all" || task.priority === selectedPriority;
      const matchesSearch =
        search === "" ||
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase()) ||
        task.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        );

      return matchesFilter && matchesPriority && matchesSearch;
    })
    .sort((a, b) => {
      // Sort by priority first, then by creation date
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      // Then by date
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  // Calculate status counts and completion rate
  const statusCount = {
    todo: tasks.filter((t) => t.status === "todo").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  const totalTasks = tasks.length;
  const completionRate = Math.round(
    (statusCount.completed / totalTasks) * 100 || 0
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="w-8 h-8 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
        <p className="text-muted-foreground">Loading tasks...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 rounded-xl bg-destructive/10 border border-destructive text-center space-y-4">
        <AlertCircle className="h-8 w-8 text-destructive mx-auto" />
        <p className="text-destructive font-medium">{error}</p>
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline" 
          className="bg-card hover:bg-background"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and toggle filters */}
      <div className="p-4 rounded-xl bg-card/50 backdrop-blur-sm border shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-auto flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-11 bg-background/50 focus:bg-background transition-colors"
                aria-label="Search tasks"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 bg-background/50 hover:bg-background transition-colors"
              onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
              aria-expanded={isFiltersExpanded}
              aria-label="Toggle filters"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Responsive filters - hidden on mobile unless expanded */}
          <div className={cn(
            "flex gap-2 w-full md:w-auto",
            isFiltersExpanded ? "flex" : "hidden md:flex"
          )}>
            <div className="relative w-full md:w-auto">
              {getPriorityIcon(selectedPriority !== "all" ? selectedPriority : "medium")}
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="appearance-none h-11 w-full md:w-40 rounded-md border bg-background/50 hover:bg-background px-8 py-2 text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
                aria-label="Filter by priority"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>

            <div className="relative w-full md:w-auto">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none h-11 w-full md:w-40 rounded-md border bg-background/50 hover:bg-background px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
                aria-label="Filter by status"
              >
                <option value="all">All Status</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <ChevronDown className="absolute right-3 top-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Status cards with improved visual styling */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.entries(statusCount).map(([status, count]) => {
          const statusColor = status === "completed" ? "text-green-500" : 
                            status === "in-progress" ? "text-blue-500" : 
                            "text-amber-500";
          
          return (
            <motion.div
              key={status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-card/50 backdrop-blur-sm p-5 rounded-xl border shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground capitalize mb-1">
                  {status.replace("-", " ")}
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  status === "completed" ? "bg-green-500" : 
                  status === "in-progress" ? "bg-blue-500" : 
                  "bg-amber-500"
                }`}></div>
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {count}
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                {status === "completed" ? "Tasks completed" : 
                 status === "in-progress" ? "Tasks in progress" : 
                 "Tasks to do"}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress section with improved visual feedback */}
      <div className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border shadow-lg space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-medium">Overall Progress</span>
          <span className={`font-medium ${
            completionRate >= 75 ? "text-green-500" : 
            completionRate >= 25 ? "text-amber-500" : 
            "text-red-500"
          }`}>{completionRate}%</span>
        </div>
        <Progress 
          value={completionRate} 
          className="h-2.5 rounded-full" 
          aria-label={`${completionRate}% of tasks completed`}
        />
        <p className="text-xs text-muted-foreground">
          {totalTasks} total task{totalTasks !== 1 ? 's' : ''} • {statusCount.completed} completed
        </p>
      </div>

      {/* Tasks list with improved card design and accessibility */}
      <div className="rounded-xl border bg-card/50 backdrop-blur-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-medium text-lg">Tasks</h2>
          <Badge 
            variant="outline" 
            className="bg-background/80"
          >
            {filteredTasks.length} result{filteredTasks.length !== 1 ? 's' : ''}
          </Badge>
        </div>
        
        <ScrollArea className="h-[calc(100vh-28rem)] px-4 py-2">
          <AnimatePresence mode="popLayout">
            {filteredTasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground space-y-2"
              >
                <Filter className="h-12 w-12 text-muted-foreground/50" />
                <p>No tasks found matching your filters</p>
                {(search || filter !== "all" || selectedPriority !== "all") && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSearch("");
                      setFilter("all");
                      setSelectedPriority("all");
                    }}
                    className="mt-2"
                  >
                    Clear filters
                  </Button>
                )}
              </motion.div>
            ) : (
              filteredTasks.map((task) => (
                <motion.div
                  key={task._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={cn(
                    "p-4 mb-4 rounded-xl border transition-all",
                    "bg-card/50 hover:bg-card/80 backdrop-blur-sm",
                    "group hover:shadow-lg"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <button
                        onClick={() =>
                          handleStatusChange(
                            task._id,
                            task.status === "completed" ? "todo" : "completed"
                          )
                        }
                        aria-label={task.status === "completed" ? "Mark as incomplete" : "Mark as complete"}
                        className="mt-1 transition-transform hover:scale-110"
                      >
                        {task.status === "completed" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </button>

                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h3
                            className={cn(
                              "font-medium text-base",
                              task.status === "completed" && "line-through text-muted-foreground"
                            )}
                          >
                            {task.title}
                          </h3>
                          
                          {/* Priority badge */}
                          <Badge
                            variant="outline"
                            className={cn(
                              "px-2 py-0.5 text-xs capitalize",
                              getPriorityColor(task.priority)
                            )}
                          >
                            {task.priority}
                          </Badge>
                        </div>
                        
                        {task.description && (
                          <p className="text-sm text-muted-foreground">
                            {task.description}
                          </p>
                        )}
                        
                        {task.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {task.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="px-2 py-0.5 text-xs bg-primary/10 text-primary hover:bg-primary/20"
                              >
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          {task.dueDate && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(task.dueDate).toLocaleDateString()}
                              {new Date(task.dueDate) < new Date() && task.status !== "completed" && (
                                <Badge variant="destructive" className="text-xs ml-1 py-0 px-1">Overdue</Badge>
                              )}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions with improved visibility */}
                    <div className="flex sm:gap-2 gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Edit task"
                        className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                        onClick={() => handleEditTask(task._id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Delete task"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 sm:opacity-0 sm:group-hover:opacity-100 transition-all"
                        onClick={() => handleDeleteTask(task._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </ScrollArea>
      </div>

      {/* Empty state and task count indicator */}
      {tasks.length === 0 && !isLoading && !error && (
        <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center rounded-xl border bg-card/50 backdrop-blur-sm">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-medium">No tasks yet</h3>
          <p className="text-muted-foreground max-w-sm">
            Create your first task by clicking the "Add Task" button above.
          </p>
        </div>
      )}
    </div>
  );
}