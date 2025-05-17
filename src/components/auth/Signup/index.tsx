"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    companyLocation: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
      });
      setIsLoading(false);
      return;
    }

    if (formData.email === "admin@example.com") {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description:
          "This email is reserved for admin use. Please use a different email.",
      });
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      localStorage.setItem("registeredEmail", formData.email);
      localStorage.setItem("registeredPassword", formData.password);
      localStorage.setItem("registeredRole", formData.role);

      localStorage.setItem("userRole", formData.role);
      localStorage.setItem("userEmail", formData.email);

      toast({
        title: "Registration successful",
        description: "Your account has been created successfully!",
      });

      router.push("/login");
      setIsLoading(false);
    }, 1500);
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

      {/* Right side  */}
      <div className="overflow-y-auto overflow-x-hidden">
        <div className="w-full max-w-lg mx-auto px-8 py-8">
          <div className="mb-3">
            <h1 className="text-2xl font-bold mb-2">Hello!</h1>
            <p className="text-gray-600">Welcome to Flexify</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2 ">
            <div>
              <Label
                htmlFor="firstName"
                className="block text-sm font-normal text-gray-700 mb-1"
              >
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border !bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-none"
              />
            </div>

            <div>
              <Label
                htmlFor="lastName"
                className="block text-sm font-normal text-gray-700 mb-1"
              >
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border !bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-none"
              />
            </div>

            <div>
              <Label
                htmlFor="companyName"
                className="block text-sm font-normal text-gray-700 mb-1"
              >
                Company Name
              </Label>
              <Input
                id="companyName"
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border !bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-none"
              />
            </div>

            <div>
              <Label
                htmlFor="companyLocation"
                className="block text-sm font-normal text-gray-700 mb-1"
              >
                Company Location
              </Label>
              <Input
                id="companyLocation"
                name="companyLocation"
                type="text"
                value={formData.companyLocation}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border !bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-none"
              />
            </div>

            <div>
              <Label
                htmlFor="role"
                className="block text-sm font-normal text-gray-700 mb-1"
              >
                Your Role
              </Label>
              <Select
                name="role"
                value={formData.role}
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value })
                }
                required
              >
                <SelectTrigger className="w-full px-3 text-sm text-gray-700 py-2 border !bg-gray-300 rounded-md focus:outline-none focus:border-none shadow-none">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teamLeader">Team Leader</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-normal text-gray-700 mb-1"
              >
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border !bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-none"
              />
            </div>

            <div>
              <Label
                htmlFor="confirmPassword"
                className="block text-sm font-normal text-gray-700 mb-1"
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border !bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-none"
              />
            </div>

            <div className="flex items-center mt-4">
              <Input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <Label
                htmlFor="agreeToTerms"
                className="ml-2 block text-sm font-normal text-gray-700"
              >
                I agree to the{" "}
                <span className="font-semibold">Terms & Conditions</span>
              </Label>
            </div>

            <Button
              type="submit"
              disabled={!formData.agreeToTerms || isLoading}
              className="w-full bg-gray-400 hover:bg-gray-500 text-gray-800 font-normal py-3 px-4 rounded-2xl transition-colors"
            >
              {isLoading ? "Registering..." : "Register"}
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
              <span>Sign up using Google</span>
            </Button>

            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-gray-600 hover:underline">
                  Sign In
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
