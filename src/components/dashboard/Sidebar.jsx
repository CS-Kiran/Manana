"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { DASHBOARD_LINKS } from "@/config/dashboard-links";
import Theme from "@/components/ui/theme";
import { useState } from "react";
import { LogOut, Menu } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-4 right-4 p-2 z-50 text-gray-700 dark:text-gray-200 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/30 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.nav
        className={cn(
          "fixed lg:relative h-screen border-r border-gray-200 dark:border-gray-800",
          "w-64 transition-all duration-300 z-50 shadow-xl bg-white dark:bg-gray-900",
          isOpen ? "left-0" : "-left-full lg:left-0"
        )}
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col h-full p-4 gap-4">
          {/* User Profile Section */}
          <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-200 dark:border-gray-800">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 dark:from-indigo-600 dark:to-indigo-900 flex items-center justify-center border-2 border-indigo-300 dark:border-indigo-800">
              <span className="font-medium text-white">
                {session?.user?.name?.charAt(0).toUpperCase() || "G"}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm truncate text-gray-800 dark:text-gray-100">
                {session?.user?.name || "Guest User"}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {session?.user?.email || "No email available"}
              </p>
            </div>
            <Theme className="ml-2" />
          </div>

          {/* Navigation Links */}
          <div className="flex-1 space-y-1">
            {DASHBOARD_LINKS.map((link) => {
              const isActive = pathname === link.path;
              return (
                <motion.div
                  key={link.path}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    asChild
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 px-3 h-12 rounded-lg transition-colors group",
                      isActive 
                        ? "bg-card dark:bg-card/80 border border-border dark:border-border/50 text-primary dark:text-primary-foreground" 
                        : "text-muted-foreground dark:text-muted-foreground hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white"
                    )}
                  >
                    <Link href={link.path}>
                      <link.icon className={cn(
                        "h-5 w-5 transition-colors",
                        isActive 
                          ? "text-primary dark:text-primary-foreground" 
                          : "text-muted-foreground dark:text-muted-foreground group-hover:text-white"
                      )} />
                      <span className="text-sm font-medium">{link.label}</span>
                      {link.notification && (
                        <Badge className="ml-auto px-2 py-1 text-xs bg-primary/80 text-primary-foreground dark:bg-primary/80 dark:text-primary-foreground group-hover:bg-white/80 group-hover:text-primary">
                          {link.notification}
                        </Badge>
                      )}
                    </Link>
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* Logout Section */}
          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
            <Button
              variant="ghost"
              className="w-full justify-between gap-3 px-3 h-12 rounded-lg text-gray-700 dark:text-gray-200 hover:text-destructive dark:hover:text-destructive hover:bg-destructive/10 transition-colors group"
              onClick={handleLogout}
            >
              <div className="flex items-center gap-3">
                <LogOut className="h-5 w-5 transition-colors group-hover:text-destructive" />
                <span className="text-sm font-medium">Log Out</span>
              </div>
            </Button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}