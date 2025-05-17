"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

// Only admin is predefined
const ADMIN_CREDENTIALS = {
  email: "admin@test.com",
  password: "admin123",
  role: "admin",
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      // Check if admin credentials match
      if (
        email === ADMIN_CREDENTIALS.email &&
        password === ADMIN_CREDENTIALS.password
      ) {
        // Store admin info
        localStorage.setItem("userRole", ADMIN_CREDENTIALS.role);
        localStorage.setItem("userEmail", ADMIN_CREDENTIALS.email);

        toast({
          title: "Admin login successful",
          description: "Welcome to the admin dashboard",
        });

        router.push("/dashboard");
      } else {
        const storedEmail = localStorage.getItem("registeredEmail");
        const storedPassword = localStorage.getItem("registeredPassword");
        const storedRole = localStorage.getItem("registeredRole");

        if (
          storedEmail === email &&
          storedPassword === password &&
          storedRole
        ) {
          localStorage.setItem("userRole", storedRole);
          localStorage.setItem("userEmail", email);

          toast({
            title: "Login successful",
            description: `Welcome back, ${email}`,
          });

          router.push("/dashboard");
        } else {
          setError("Invalid email or password");
          toast({
            variant: "destructive",
            title: "Login failed",
            description: "Invalid email or password",
          });
        }
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full h-screen grid md:grid-cols-2">
      {/* image side */}
      <div className="hidden md:flex items-center justify-center bg-gray-soft">
        <div className="flex items-center justify-center w-32 h-32 ">
          <Image
            src="/auth/imagePlaceholder.png"
            alt="Logo"
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
      </div>

      {/* form side */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg mx-auto px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Hello!</h1>
            <p className="text-gray-600">Welcome back Flexify</p>
          </div>

          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-normal text-gray-700 mb-1"
              >
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border !bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-none"
              />
            </div>

            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-normal text-gray-700 mb-1"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-none"
              />
              <div className="flex justify-end mt-1">
                <Link
                  href="/forget-password"
                  className="text-xs text-gray-700 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-400 hover:bg-gray-500 text-gray-800 font-normal py-3 px-4 rounded-2xl transition-colors"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>

            <div className="relative flex items-center justify-center my-4">
              <hr className="w-full border-gray-300" />
              <span className="absolute bg-white px-2 text-xs text-gray-500">
                OR
              </span>
            </div>

            <Button
              type="button"
              className="w-full bg-gray-300 hover:bg-gray-500 text-gray-800 font-normal py-3 px-4 rounded-2xl transition-colors"
            >
              <span>Sign in using Google</span>
            </Button>

            <div className="text-center mt-6">
              <span className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-gray-600 hover:underline">
                  Sign Up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
