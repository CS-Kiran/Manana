import { ListChecks, Notebook, Calendar, Bell, Settings } from "lucide-react";

export const DASHBOARD_LINKS = [
  {
    icon: ListChecks,
    label: "Tasks",
    path: "/dashboard/tasks",
  },
  {
    icon: Notebook,
    label: "Diary",
    path: "/dashboard/diary",
  },
  {
    icon: Calendar,
    label: "Calendar",
    path: "/dashboard/calendar",
  },
  {
    icon: Bell,
    label: "Notifications",
    path: "/dashboard/notifications",
  },
];