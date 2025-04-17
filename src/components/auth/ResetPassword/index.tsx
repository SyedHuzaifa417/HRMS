"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset password requested for:", email);

    // Show success message
    setIsSubmitted(true);
  };

  return (
    <div className="w-full max-w-md mx-auto py-8 px-8">
      <div className="flex flex-col items-center mb-8">
        <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
          <Image
            src="/placeholder.svg"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
        <p className="text-gray-600 text-center">
          {isSubmitted
            ? "Check your email for instructions to reset your password."
            : "Enter your email address and we'll send you instructions to reset your password."}
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
          >
            Send Reset Instructions
          </button>

          <div className="text-center mt-6">
            <Link
              href="/login"
              className="text-blue-600 hover:underline text-sm"
            >
              ← Back to Login
            </Link>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <button
            onClick={() => router.push("/login")}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
          >
            Return to Login
          </button>
        </div>
      )}
    </div>
  );
}
