import { FaGithub, FaInstagram } from "react-icons/fa";
import AdminLogin from "./AdminLogin";

export default function Footer() {
  return (
    <footer className="w-full py-2 text-secondary-foreground shadow-md border-t dark:border-none">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <div className="flex space-x-6">
            <a
              href="https://github.com/CS-Kiran"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-foreground hover:text-[#333] transition-colors duration-300"
            >
              <FaGithub className="w-6 h-6" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-foreground hover:text-[#E1306C] transition-colors duration-300"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
          </div>

          <p className="text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Manana. All rights reserved.
          </p>
        </div>

        <div className="flex items-center">
            {<AdminLogin />}
        </div>
      </div>
    </footer>
  );
}