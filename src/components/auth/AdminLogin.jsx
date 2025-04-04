'use client'
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  return (
    <Button
      variant="outline"
      className="bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
      onClick={() => {
        console.log("Admin login clicked");
      }}
    >
      Admin Login
    </Button>
  );
}
