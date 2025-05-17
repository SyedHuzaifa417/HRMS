import DashboardLayout from "@/components/dashboard/layout/DashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Human Resource Management System Dashboard",
};

export default function DashboardPage() {
  return <DashboardLayout />;
}
