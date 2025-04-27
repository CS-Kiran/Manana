import { Home, Settings, Bell, User, CheckSquare } from "lucide-react";

export const SIDEBAR_LINKS = [
  { path: "/dashboard", label: "Home", icon: Home },
  { path: "/dashboard/tasks", label: "Tasks", icon: CheckSquare },
  { path: "/dashboard/settings", label: "Settings", icon: Settings },
  { path: "/dashboard/notifications", label: "Notifications", icon: Bell, notification: 3 },
  { path: "/dashboard/profile", label: "Profile", icon: User },
];
