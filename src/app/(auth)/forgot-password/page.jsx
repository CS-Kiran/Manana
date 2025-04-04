"use client";

import Theme from "@/components/ui/theme";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { AlertCircle, Loader2, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSuccess(true);
    setIsLoading(false);
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
              Reset Password
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              {success 
                ? "Check your email for further instructions"
                : "Enter your email to reset your password"}
            </p>
          </CardHeader>

          {!success && (
            <CardContent className="space-y-5 relative">
              <form className="space-y-4" onSubmit={handleSubmit}>
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
                    className={`input-modern h-11 transition-all ${errors.email ? 'border-destructive/50 focus:ring-destructive/30' : 'focus:ring-primary/30'}`}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm flex items-center gap-1 mt-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email}
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
                    "Send Reset Link"
                  )}
                </Button>
              </form>
            </CardContent>
          )}

          {success && (
            <CardContent className="flex justify-center relative">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </CardContent>
          )}

          <CardFooter className="flex justify-center gap-1 text-sm text-muted-foreground relative pb-6">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary hover:text-primary/80 transition-colors hover:underline underline-offset-4"
            >
              Log in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
