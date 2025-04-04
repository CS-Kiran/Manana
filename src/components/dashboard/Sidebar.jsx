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
        className="lg:hidden fixed top-4 right-4 p-2 z-50 bg-card rounded-lg shadow-sm border"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-6 w-6 text-foreground" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.nav
        className={cn(
          "fixed lg:relative h-screen bg-card/95 backdrop-blur-lg border-r border-border/50",
          "w-64 transition-all duration-300 z-50 shadow-xl",
          isOpen ? "left-0" : "-left-full lg:left-0"
        )}
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col h-full p-4 gap-4">
          {/* User Profile Section */}
          <div className="flex items-center gap-3 pb-4 mb-4 border-b border-border/30">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-foreground flex items-center justify-center border-2 border-primary/50">
              <span className="font-medium text-primary-foreground">
                {session?.user?.name?.charAt(0).toUpperCase() || "G"}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm truncate">
                {session?.user?.name || "Guest User"}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {session?.user?.email || "No email available"}
              </p>
            </div>
            <Theme className="ml-2" />
          </div>

          {/* Navigation Links */}
          <div className="flex-1 space-y-1">
            {DASHBOARD_LINKS.map((link) => (
              <motion.div
                key={link.path}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  asChild
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 px-3 h-12 rounded-lg",
                    "hover:bg-accent transition-colors",
                    pathname === link.path && "bg-accent/20 border border-accent/30"
                  )}
                >
                  <Link href={link.path}>
                    <link.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm font-medium">{link.label}</span>
                    {link.notification && (
                      <Badge className="ml-auto px-2 py-1 text-xs">
                        {link.notification}
                      </Badge>
                    )}
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Logout Section */}
          <div className="mt-auto pt-4 border-t border-border/30">
            <Button
              variant="ghost"
              className="w-full justify-between gap-3 px-3 h-12 rounded-lg text-destructive dark:text-white hover:bg-destructive hover:text-white"
              onClick={handleLogout}
            >
              <div className="flex items-center gap-3">
                <LogOut className="h-5 w-5" />
                <span className="text-sm font-medium">Log Out</span>
              </div>
            </Button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}