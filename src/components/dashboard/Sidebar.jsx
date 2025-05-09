"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { DASHBOARD_LINKS } from "@/config/dashboard-links";
import Theme from "@/components/ui/theme";
import { useState, useEffect } from "react";
import { LogOut, Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [taskCounts, setTaskCounts] = useState({ todo: 0, "in-progress": 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
        setIsOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchTaskCounts = async () => {
      try {
        const res = await fetch("/api/tasks");
        const data = await res.json();
        if (res.ok) {
          const todos = data.tasks.filter(t => t.status === "todo").length;
          const inProgress = data.tasks.filter(t => t.status === "in-progress").length;
          setTaskCounts({ todo: todos, "in-progress": inProgress });
        }
      } catch (error) {
        console.error("Error fetching task counts:", error);
      }
    };

    fetchTaskCounts();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  // Get notification count for a link
  const getLinkNotification = (link) => {
    if (link.path === "/dashboard/tasks") {
      const total = taskCounts.todo + taskCounts["in-progress"];
      return total > 0 ? total : null;
    }
    return null;
  };

  return (
    <>
      {/* Mobile menu button with improved accessibility */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={isOpen}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border shadow-lg transition-all hover:bg-background"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      {/* Mobile backdrop with improved animation */}
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar with consistent spacing */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? "64px" : "240px",
          x: (isMobile && !isOpen) ? "-100%" : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed top-0 left-0 z-40 h-full border-r bg-card/50 backdrop-blur-sm",
          "flex flex-col shadow-lg"
        )}
      >
        {/* Toggle button for desktop with improved accessibility */}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-background border shadow-md flex items-center justify-center hover:bg-primary/10 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        )}

        {/* Sidebar content with consistent padding */}
        <div className="flex flex-col h-full p-4 gap-4">
          {/* User profile with consistent styling */}
          <div className={cn(
            "flex items-center gap-3 py-2",
            isCollapsed ? "justify-center" : "border-b pb-4"
          )}>
            <div className="relative w-9 h-9">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-primary-foreground flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  {session?.user?.name?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold truncate">
                  {session?.user?.name || "Guest User"}
                </h3>
                <p className="text-xs text-muted-foreground truncate">
                  {session?.user?.email || "guest@example.com"}
                </p>
              </div>
            )}
          </div>

          {/* Navigation with improved spacing and transitions */}
          <nav className="flex-1 space-y-2 mt-2">
            {DASHBOARD_LINKS.map((link) => {
              const isActive = pathname === link.path;
              const notificationCount = getLinkNotification(link);
              
              return (
                <Link 
                  key={link.path}
                  href={link.path}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative",
                    isCollapsed ? "justify-center" : "",
                    isActive 
                      ? "bg-primary/10 text-primary hover:bg-primary/20" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <link.icon className={cn(
                    "h-5 w-5 transition-transform group-hover:scale-105",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )} />
                  
                  {!isCollapsed && (
                    <span className="text-sm font-medium truncate flex-1">
                      {link.label}
                    </span>
                  )}

                  {notificationCount && (
                    isCollapsed ? (
                      <Badge 
                        className={cn(
                          "absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center",
                          "bg-primary text-primary-foreground hover:bg-primary/90",
                          "animate-in fade-in-50 duration-300"
                        )}
                      >
                        {notificationCount}
                      </Badge>
                    ) : (
                      <Badge 
                        className={cn(
                          "bg-primary/10 text-primary hover:bg-primary/20",
                          "px-2 py-0.5 text-xs font-semibold",
                          "animate-in fade-in-50 duration-300",
                          "ml-auto"
                        )}
                      >
                        {notificationCount}
                      </Badge>
                    )
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom actions with improved layout and hover states */}
          <div className={cn(
            "mt-auto pt-4 border-t border-border/50",
            isCollapsed ? "flex justify-center" : "flex justify-between items-center gap-2"
          )}>
            <Theme />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              aria-label="Logout"
              className={cn(
                "text-muted-foreground hover:text-destructive hover:bg-destructive/10",
                "transition-all duration-200 hover:scale-105"
              )}
            >
              <LogOut className="h-5 w-5" />
              {!isCollapsed && <span className="sr-only">Logout</span>}
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Content offset with smoother transition */}
      <div 
        className={cn(
          "transition-[margin] duration-300 ease-in-out",
          isCollapsed ? "ml-16" : "ml-60",
          isMobile && "ml-0"
        )} 
      />
    </>
  );
}