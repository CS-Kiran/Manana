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
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <>
      <div className="fixed top-4 right-6 z-10">
        <Theme />
      </div>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-4 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        
        <Card className="w-full max-w-md shadow-2xl rounded-2xl bg-card/70 backdrop-blur-xl border border-white/10 dark:border-white/5 hover:shadow-primary/10 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl opacity-30"></div>
          
          <CardHeader className="space-y-2 relative">
            <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-hue">
              Welcome Back
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </CardHeader>

          <CardContent className="space-y-5 relative">
            <form className="space-y-4" onSubmit={handleLogin}>
              {errors.server && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {errors.server}
                </div>
              )}

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
                      : "focus:ring-primary/30"
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
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-foreground/80 font-medium">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 transition-colors hover:underline underline-offset-4"
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
                  className={`input-modern h-11 ${
                    errors.password
                      ? "border-destructive/50 focus:ring-destructive/30"
                      : "focus:ring-primary/30"
                  }`}
                />
                {errors.password && (
                  <p className="text-destructive text-sm flex items-center gap-1 mt-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.password}
                  </p>
                )}
              </div>

              <Button
                className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 hover:scale-[1.01] transition-all duration-300 shadow-lg shadow-primary/20 text-white font-medium rounded-xl"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 py-1 rounded-full text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign In Button - Fixed with static colors */}
            <Button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 font-medium h-11 rounded-lg transition-colors duration-300"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
            >
              <FcGoogle className="w-5 h-5" />
              Sign in with Google
            </Button>
          </CardContent>

          <CardFooter className="flex justify-center gap-1 text-sm text-muted-foreground relative pb-6">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary hover:text-primary/80 transition-colors hover:underline underline-offset-4"
            >
              Sign up
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}