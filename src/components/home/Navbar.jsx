'use client';
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 w-full backdrop-blur-md bg-white/70 dark:bg-black/70 px-6 py-3 flex justify-between items-center shadow-md z-50 border-border
        transition-all duration-500 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        
        <h1 className="text-3xl font-bold cursor-pointer transform hover:scale-105 transition-transform duration-300">
          <span className="bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
            Manana
          </span>
        </h1>
        
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-8">
            <a href="#features" className="relative group text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300">
              <span className="group-hover:opacity-100 opacity-0 absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-all duration-300 group-hover:translate-y-0 translate-y-1"></span>
              Features
            </a>
            <a href="#about" className="relative group text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300">
              <span className="group-hover:opacity-100 opacity-0 absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-all duration-300 group-hover:translate-y-0 translate-y-1"></span>
              About
            </a>
            <a href="#contact" className="relative group text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300">
              <span className="group-hover:opacity-100 opacity-0 absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-all duration-300 group-hover:translate-y-0 translate-y-1"></span>
              Contact
            </a>
          </div>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 group"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400 transform transition-transform duration-500 group-hover:rotate-12" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300 transform transition-transform duration-500 group-hover:-rotate-12" />
            )}
          </button>
        </div>
      </nav>

      <div className="pt-16"></div>
    </>
  );
}