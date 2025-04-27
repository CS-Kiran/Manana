"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background to-accent/5">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container h-full py-6 px-4">
          {children}
        </div>
      </main>
    </div>
  );
}