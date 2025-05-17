import React from "react";
import { Metadata } from "next";
import PasswordResetPage from "@/components/auth/forgetPassword";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password",
};

const page = () => {
  return <PasswordResetPage />;
};

export default page;
