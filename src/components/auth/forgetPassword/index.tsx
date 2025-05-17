"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { EmailForm } from "./components/EmailForm";
import { OtpVerification } from "./components/OtpVerification";
import { ResetPasswordForm } from "./components/ResetPasswordForm";
import { SuccessMessage } from "./components/SuccessMessage";

type PasswordResetStage = "email" | "otp" | "reset" | "success";

export default function PasswordResetPage() {
  const [mounted, setMounted] = useState(false);
  const [stage, setStage] = useState<PasswordResetStage>("email");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("stage", stage);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEmailSubmit = async (email: string) => {
    setIsSubmitting(true);
    try {
      setEmail(email);

      toast.success("OTP sent to your email", {
        position: "bottom-right",
        duration: 3000,
      });

      setStage("otp");
    } catch (error) {
      console.error("Error sending OTP:", error);
      if (error instanceof Error) {
        toast.error(error.message || "Failed to send OTP. Please try again.", {
          position: "bottom-right",
          duration: 3000,
        });
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "bottom-right",
          duration: 3000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = () => {
    setIsSubmitting(true);
    try {
      toast.success("OTP verified successfully", {
        position: "bottom-right",
        duration: 3000,
      });

      setStage("reset");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      if (error instanceof Error) {
        toast.error(
          error.message || "Failed to verify OTP. Please try again.",
          {
            position: "bottom-right",
            duration: 3000,
          }
        );
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "bottom-right",
          duration: 3000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordReset = () => {
    setIsSubmitting(true);
    try {
      toast.success("Password reset successfully", {
        position: "bottom-right",
        duration: 3000,
      });

      setStage("success");
    } catch (error) {
      console.error("Error resetting password:", error);
      if (error instanceof Error) {
        toast.error(
          error.message || "Failed to reset password. Please try again.",
          {
            position: "bottom-right",
            duration: 3000,
          }
        );
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "bottom-right",
          duration: 3000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen w-3/5 max-xl:w-4/5 max-lg:w-5/6 max-sm:w-full mx-auto flex items-center justify-center max-sm:p-4">
      <div className="relative z-10 w-full">
        <div className="bg-gray-100 border border-gray-900 rounded-lg py-14 px-40 max-xl:px-20 max-lg:px-16 max-md:px-12 max-sm:px-8">
          <Link href="/" className="flex items-center gap-4 cursor-pointer">
            <Image
              src="/logo.png"
              alt="Logo"
              width={25}
              height={25}
              className="object-cover"
            />
            <span className="text-xl font-bold">Flexify</span>
          </Link>
          {stage === "email" && (
            <EmailForm
              onSubmit={handleEmailSubmit}
              isSubmitting={isSubmitting}
            />
          )}

          {stage === "otp" && (
            <OtpVerification
              onSubmit={handleOtpSubmit}
              isSubmitting={isSubmitting}
              email={email}
            />
          )}

          {stage === "reset" && (
            <ResetPasswordForm
              onSubmit={handlePasswordReset}
              isSubmitting={isSubmitting}
            />
          )}

          {stage === "success" && <SuccessMessage />}
        </div>
      </div>
    </div>
  );
}
