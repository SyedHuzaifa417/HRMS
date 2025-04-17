import SignupPage from "@/components/auth/Signup";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup",
  description: "Signup to your account",
};

const page = () => {
  return <SignupPage />;
};

export default page;
