"use client";

import Theme from "@/components/ui/theme";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const router = useRouter();
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuccess(true);
    setIsLoading(false);
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
              Reset Password
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              {success 
                ? "Check your email for further instructions"
                : "Enter your email to reset your password"}
            </p>
          </CardHeader>

          {!success && (
            <CardContent className="space-y-4">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`transition-all ${errors.email ? 'border-destructive focus:ring-destructive' : 'focus:ring-primary'}`}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email}
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
                    "Send Reset Link"
                  )}
                </Button>
              </form>
            </CardContent>
          )}

          {success && (
            <CardContent className="flex justify-center">
              <CheckCircle className="h-12 w-12 text-green-500 animate-check-in" />
            </CardContent>
          )}

          <CardFooter className="flex justify-center gap-1 text-sm text-muted-foreground">
            Remember your password?{" "}
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