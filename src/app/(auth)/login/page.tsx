import LoginPage from "@/components/auth/Login";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

const page = () => {
  return <LoginPage />;
};

export default page;
