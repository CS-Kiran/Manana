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
      className="p-2 rounded-full transition-colors duration-300 group hover:bg-accent/50"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 transform transition-transform duration-500" />
      ) : (
        <Moon className="w-5 h-5 transform transition-transform duration-500" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}