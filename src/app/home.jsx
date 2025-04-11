import React from "react";
import { useTheme } from "@/context/theme-provider";

export default function Home() {
  const { toggleTheme } = useTheme();

  return (
    <div className="p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold heading-gradient">Welcome Home</h1>
        <button
          onClick={toggleTheme}
          className="btn-gradient"
        >
          Toggle Theme
        </button>
      </header>
      <section className="glass-card p-6">
        <h2 className="text-2xl font-semibold mb-4">About Us</h2>
        <p className="text-muted-foreground">
          This is a modern and minimalistic website designed with a fresh and aesthetic theme.
        </p>
      </section>
    </div>
  );
}
