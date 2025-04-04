"use client";

import Theme from "@/components/ui/theme";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const allowedDomains = ["gmail.com", "outlook.com", "yahoo.com"];
  const domain = email.split("@")[1]?.toLowerCase();

  const validate = () => {
    const newErrors = {};
    const emailParts = email.split("@");

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = "Invalid email format";
    } else if (
      emailParts.length < 2 ||
      !allowedDomains.includes(emailParts[1]?.toLowerCase())
    ) {
      newErrors.email = "Only Gmail, Outlook & Yahoo emails allowed";
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Must contain at least one uppercase letter";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password: password.trim(),
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned unexpected response");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      router.push("/login");
    } catch (error) {
      setErrors({ server: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed top-4 right-6 z-10">
        <Theme />
      </div>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-secondary/5 to-primary/10 p-4 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        
        <Card className="w-full max-w-md shadow-2xl rounded-2xl bg-card/70 backdrop-blur-xl border border-white/10 dark:border-white/5 hover:shadow-secondary/10 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl opacity-30"></div>
          
          <CardHeader className="space-y-2 relative">
            <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent animate-hue">
              Create Account
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Get started with your free account
            </p>
          </CardHeader>

          <CardContent className="space-y-5 relative">
            <form className="space-y-4" onSubmit={handleEmailSignup}>
              {errors.server && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {errors.server}
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground/80 font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`input-modern h-11 ${
                    errors.name
                      ? "border-destructive/50 focus:ring-destructive/30"
                      : "focus:ring-secondary/30"
                  }`}
                />
                {errors.name && (
                  <p className="text-destructive text-sm flex items-center gap-1 mt-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground/80 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`input-modern h-11 ${
                    errors.email
                      ? "border-destructive/50 focus:ring-destructive/30"
                      : "focus:ring-secondary/30"
                  }`}
                />
                {errors.email && (
                  <p className="text-destructive text-sm flex items-center gap-1 mt-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground/80 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`input-modern h-11 ${
                    errors.password
                      ? "border-destructive/50 focus:ring-destructive/30"
                      : "focus:ring-secondary/30"
                  }`}
                />
                {errors.password && (
                  <p className="text-destructive text-sm flex items-center gap-1 mt-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground/80 font-medium">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`input-modern h-11 ${
                    errors.confirmPassword
                      ? "border-destructive/50 focus:ring-destructive/30"
                      : "focus:ring-secondary/30"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-destructive text-sm flex items-center gap-1 mt-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button
                className="w-full h-11 bg-gradient-to-r from-secondary to-primary hover:from-secondary/90 hover:to-primary/90 hover:scale-[1.01] transition-all duration-300 shadow-lg shadow-secondary/20 text-white font-medium rounded-xl"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 py-1 rounded-full text-muted-foreground">
                  Or sign up with
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-11 border border-border/50 hover:bg-accent/10 hover:text-black hover:border-secondary/30 hover:scale-[1.01] transition-all duration-300 relative rounded-xl"
              onClick={() => signIn("google")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              <span className="font-medium">Google</span>
            </Button>
          </CardContent>

          <CardFooter className="flex justify-center gap-1 text-sm text-muted-foreground relative pb-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-secondary hover:text-secondary/80 transition-colors hover:underline underline-offset-4"
            >
              Log in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}