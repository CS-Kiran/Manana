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

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const allowedDomains = ["gmail.com", "outlook.com", "yahoo.com"];

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
      !allowedDomains.includes(emailParts[1])
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
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned unexpected response');
      }
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }
  
      router.push('/login ');
    } catch (error) {
      setErrors({ server: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.append("client_id", process.env.GOOGLE_CLIENT_ID);
    authUrl.searchParams.append(
      "redirect_url",
      `${window.location.origin}/api/auth/google/callback`
    );
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("scope", "email profile");
    authUrl.searchParams.append("access_type", "offline");
    authUrl.searchParams.append("prompt", "consent");

    window.location.href = authUrl.href;
  };

  return (
    <>
      <div className="fixed top-2 right-4">
        <Theme />
      </div>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-accent/30 p-4">
        <Card className="w-full max-w-md shadow-2xl rounded-xl bg-card/90 backdrop-blur-lg border-border/50 hover:shadow-3xl transition-shadow duration-300">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Get started with your free account
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <form className="space-y-4" onSubmit={handleEmailSignup}>
              {errors.server && (
                <p className="text-destructive text-sm flex items-center gap-1 mb-4">
                  <AlertCircle className="h-4 w-4" />
                  {errors.server}
                </p>
              )}

              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`transition-all ${
                    errors.name
                      ? "border-destructive focus:ring-destructive"
                      : "focus:ring-primary"
                  }`}
                />
                {errors.name && (
                  <p className="text-destructive text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`transition-all ${
                    errors.email
                      ? "border-destructive focus:ring-destructive"
                      : "focus:ring-primary"
                  }`}
                />
                {errors.email && (
                  <p className="text-destructive text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`transition-all ${
                    errors.password
                      ? "border-destructive focus:ring-destructive"
                      : "focus:ring-primary"
                  }`}
                />
                {errors.password && (
                  <p className="text-destructive text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`transition-all ${
                    errors.confirmPassword
                      ? "border-destructive focus:ring-destructive"
                      : "focus:ring-primary"
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-destructive text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 hover:scale-[1.01] transition-all duration-300 shadow-lg"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or sign up with
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full hover:bg-accent/50 hover:scale-[1.01]"
              onClick={handleGoogleSignup}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
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
              Google
            </Button>
          </CardContent>

          <CardFooter className="flex justify-center gap-1 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Log in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
