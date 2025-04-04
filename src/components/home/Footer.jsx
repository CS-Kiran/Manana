"use client";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import AdminLogin from "../auth/AdminLogin";
import { motion } from "framer-motion";

export default function Footer() {
  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/CS-Kiran", hoverColor: "#333" },
    { icon: FaInstagram, href: "https://instagram.com", hoverColor: "#E1306C" },
    { icon: RiTwitterXFill, href: "https://x.com", hoverColor: "#1DA1F2" },
  ];

  return (
    <footer className="w-full py-8 mt-20 text-foreground bg-background/50 shadow-lg border-t dark:border-border/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start space-y-6">
            <motion.div
              className="flex space-x-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground transition-colors duration-300"
                  whileHover={{
                    scale: 1.2,
                    color: social.hoverColor,
                    rotate: [0, -5, 5, -5, 0],
                  }}
                  transition={{
                    scale: { type: "spring", stiffness: 300, damping: 10 },
                    rotate: { type: "tween", duration: 0.5 },
                  }}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-sm text-center md:text-left text-foreground/70"
            >
              <p className="font-medium">
                &copy; {new Date().getFullYear()} Manana. All rights reserved.
              </p>
              <p className="mt-1">Stay mindful, stay productive every day.</p>
            </motion.div>
          </div>

          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <AdminLogin/>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}