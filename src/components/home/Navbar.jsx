"use client";

import { useState, useEffect } from "react";
import Theme from "@/components/ui/theme";
import { motion } from "framer-motion";
import Link from "next/link";
import { NAV_LINKS } from "@/config/nav-links";

function Logo() {
  return (
    <Link href="/">
      <motion.h1
        className="text-3xl font-bold cursor-pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Manana
        </span>
      </motion.h1>
    </Link>
  );
}

function NavLink({ href, name }) {
  return (
    <Link href={href}>
      <motion.span
        className="relative text-foreground/80 hover:text-foreground transition-colors duration-300 font-medium"
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <span className="relative">
          {name}
          <motion.span
            className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </span>
      </motion.span>
    </Link>
  );
}

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isMounted ? 1 : 0,
          y: isMounted ? 0 : -20,
          backdropFilter: scrolled ? "blur(12px)" : "blur(8px)",
          boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none",
        }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 w-full px-6 py-4 flex justify-between items-center z-50 border-b border-transparent ${
          scrolled ? "border-border/20" : ""
        }`}
      >
        <Logo />

        <div className="flex items-center gap-10">
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.name} href={link.href} name={link.name} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Theme />
          </motion.div>

          <motion.button
            className="flex md:hidden text-foreground"
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </motion.button>
        </div>
      </motion.nav>

      <div className="pt-20"></div>
    </>
  );
}