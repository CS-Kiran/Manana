'use client';
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full backdrop-blur-md bg-white/70 dark:bg-black/70 px-6 py-3 flex justify-between items-center shadow-md z-50 border-border">
        <h1 className="text-3xl font-bold cursor-pointer">Manana</h1>
        <div className="flex items-center gap-10">
          <a href="#features" className="hover:text-primary">Features</a>
          <a href="#about" className="hover:text-primary">About</a>
          <a href="#contact" className="hover:text-primary">Contact</a>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <div className="pt-16"></div>
    </>
  );
}
