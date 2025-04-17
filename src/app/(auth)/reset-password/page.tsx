import ResetPasswordPage from "@/components/auth/ResetPassword";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password",
};

const page = () => {
  return <ResetPasswordPage />;
};

export default page;
