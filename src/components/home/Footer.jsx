"use client";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { motion } from "framer-motion";

export default function Footer() {
  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/CS-Kiran", hoverColor: "#333" },
    { icon: FaInstagram, href: "https://instagram.com", hoverColor: "#E1306C" },
    { icon: RiTwitterXFill, href: "https://x.com", hoverColor: "#000" },
  ];

  return (
    <footer className="w-full py-8 mt-20 text-foreground bg-background/50 backdrop-blur-sm shadow-lg border-t dark:border-border/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="flex flex-col items-center md:items-start space-y-6 w-full md:w-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center bg-gradient-to-r from-teal-500 to-violet-600 bg-clip-text text-transparent"
            >
              <span className="text-xl font-bold">Manana</span>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-sm text-foreground/70"
            >
              Stay mindful, stay productive every day.
            </motion.p>
          </div>
          
          <div className="flex flex-col items-center md:items-end space-y-6 w-full md:w-auto">
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
              className="text-sm text-center md:text-right text-foreground/70"
            >
              <p className="font-medium">
                &copy; {new Date().getFullYear()} Manana. All rights reserved.
              </p>
            </motion.div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center md:justify-between mt-6 pt-2 border-t border-border/10 text-sm"
        >
          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-2 font-semibold">
            <a href="#" className="text-foreground/70 hover:text-foreground transition-colors duration-300">Home</a>
            <a href="#features" className="text-foreground/70 hover:text-foreground transition-colors duration-300">Features</a>
            <a href="#about" className="text-foreground/70 hover:text-foreground transition-colors duration-300">About</a>
            <a href="#contact" className="text-foreground/70 hover:text-foreground transition-colors duration-300">Contact</a>
          </div>
          <div className="mt-4 md:mt-0 text-foreground/60 text-xs">
            <a href="#" className="hover:text-foreground transition-colors duration-300">Privacy Policy</a>
            <span className="mx-2">•</span>
            <a href="#" className="hover:text-foreground transition-colors duration-300">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}