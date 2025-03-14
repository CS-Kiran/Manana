"use client";

import { useTheme } from "@/context/theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 group hover:bg-accent/50"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-400 transform transition-transform duration-500 group-hover:rotate-12" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300 transform transition-transform duration-500 group-hover:-rotate-12" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}