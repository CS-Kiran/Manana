"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar as CalendarIcon, 
  Tag as TagIcon,
  X,
  Plus,
  AlertCircle,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function TaskForm({ task, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    tags: [],
    status: "todo"
  });
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : "",
        priority: task.priority || "medium",
        tags: task.tags || [],
        status: task.status || "todo"
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (formData.dueDate && new Date(formData.dueDate) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.dueDate = "Due date cannot be in the past";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Form will be closed by parent on successful submission
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: "Failed to save task. Please try again."
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine priority color for visual feedback
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "text-red-500";
      case "medium": return "text-amber-500";
      case "low": return "text-green-500";
      default: return "text-blue-500";
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 p-6 bg-card/50 backdrop-blur-sm rounded-xl border shadow-lg"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <Label htmlFor="title" className="text-foreground/80 font-medium flex items-center gap-2">
          Task Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={errors.title ? "true" : "false"}
          className={cn(
            "h-11 bg-background/50 focus:bg-background transition-colors",
            errors.title && "border-destructive focus:ring-destructive/30"
          )}
          placeholder="What needs to be done?"
        />
        {errors.title && (
          <p className="text-destructive text-sm flex items-center gap-1" role="alert">
            <AlertCircle className="h-4 w-4" />
            {errors.title}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-foreground/80 font-medium">
          Description
        </Label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-md border bg-background/50 focus:bg-background px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          placeholder="Add some details (optional)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dueDate" className="text-foreground/80 font-medium flex items-center gap-2">
            Due Date
          </Label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              aria-invalid={errors.dueDate ? "true" : "false"}
              className={cn(
                "pl-9 h-11 bg-background/50 focus:bg-background transition-colors",
                errors.dueDate && "border-destructive focus:ring-destructive/30"
              )}
            />
          </div>
          {errors.dueDate && (
            <p className="text-destructive text-sm flex items-center gap-1" role="alert">
              <AlertCircle className="h-4 w-4" />
              {errors.dueDate}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority" className="text-foreground/80 font-medium">
            Priority
          </Label>
          <div className="relative">
            <Clock className={cn(
              "absolute left-3 top-3 h-4 w-4",
              getPriorityColor(formData.priority)
            )} />
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full h-11 rounded-md border bg-background/50 focus:bg-background pl-9 pr-3 text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground/80 font-medium">Tags</Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <TagIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="pl-9 h-11 bg-background/50 focus:bg-background transition-colors"
              placeholder="Add a tag"
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag(e)}
              aria-label="Add tag"
            />
          </div>
          <Button 
            type="button"
            variant="outline"
            className="h-11 bg-background/50 hover:bg-background transition-colors"
            onClick={handleAddTag}
            aria-label="Add tag"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Tags display with improved visual style */}
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 p-2 rounded-lg bg-background/30 border border-border/50">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <TagIcon className="h-3 w-3" />
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="hover:text-destructive focus:outline-none"
                  aria-label={`Remove tag ${tag}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {errors.submit && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2" role="alert">
          <AlertCircle className="h-4 w-4" />
          {errors.submit}
        </div>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          className="bg-background/50 hover:bg-background transition-colors"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
              Saving...
            </>
          ) : (
            <>{task ? 'Update Task' : 'Add Task'}</>
          )}
        </Button>
      </div>
    </motion.form>
  );
}