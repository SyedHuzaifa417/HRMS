import DashboardRouter from "@/components/dashboard/common/DashboardRouter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Human Resource Management System Dashboard",
};

export default function DashboardPage() {
  return <DashboardRouter />;
}
