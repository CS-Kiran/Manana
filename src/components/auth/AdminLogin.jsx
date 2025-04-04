'use client'
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  return (
    <Button
      variant="outline"
      className="w-full py-3 px-6 rounded-sm hover:scale-105 transition duration-300 bg-gradient-to-r from-primary to-accent text-white font-medium flex items-center justify-center gap-2 shadow-md"
      onClick={() => {
        console.log("Admin login clicked");
      }}
    >
      Admin Login
    </Button>
  );
}
