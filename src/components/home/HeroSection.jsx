"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen px-4 md:px-10 overflow-hidden">
      <section className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl relative z-10">
        <div className="w-full md:w-1/2 text-left flex flex-col justify-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
            Stay Mindful, Stay Productive
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 drop-shadow-md">
            Manana helps you track tasks and reflect on your thoughts
            effortlessly.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 drop-shadow-md">
            Organize your daily activities, set reminders, and gain insights
            into your productivity. Our intuitive interface ensures a seamless
            experience while keeping you focused and stress-free.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 drop-shadow-md">
            Whether you're planning your day or journaling your thoughts, Manana
            is designed to support your journey towards mindfulness and
            productivity.
          </p>

          <Link href="/login">
            <button
              className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl w-fit px-8 py-2 text-lg"
            >
              Get Started
            </button>
          </Link>
        </div>

        <div className="w-full md:w-1/2 h-[30rem] flex justify-end items-center relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 ease-in-out"></div>
          <div className="w-full max-w-2xl rounded-2xl overflow-hidden transform transition-all duration-300 ease-in-out group-hover:scale-[1.02] group-hover:shadow-lg">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
              src="/mindful.mp4"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
