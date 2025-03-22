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

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = "Invalid email format";
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: email.trim().toLowerCase(),
        password: password.trim(),
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        throw new Error(result.error);
      }
      if (result?.url) {
        router.push(result.url);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setErrors({ server: error.message });
    } finally {
      setIsLoading(false);
    }
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
              Welcome Back
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <form className="space-y-4" onSubmit={handleLogin}>
              {errors.server && (
                <p className="text-destructive text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.server}
                </p>
              )}

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
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
                  >
                    Forgot password?
                  </Link>
                </div>
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

              <Button
                className="w-full bg-primary hover:bg-primary/90 hover:scale-[1.01] transition-all duration-300 shadow-lg"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full hover:bg-accent/50 hover:scale-[1.01]"
              onClick={() => signIn("google")}
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
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Sign up
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
