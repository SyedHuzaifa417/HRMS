"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import AdminDashboard from "@/components/dashboard/Admin";
import TeamLeaderDashboard from "@/components/dashboard/TeamLeader";
import EmployeeDashboard from "@/components/dashboard/Employee";

type UserRole = "admin" | "teamLeader" | "employee";

const getUserRole = (): UserRole | null => {
  if (typeof window === "undefined") return null;

  const role = localStorage.getItem("userRole") as UserRole | null;

  if (!role || !["admin", "teamLeader", "employee"].includes(role)) {
    return null;
  }

  return role;
};

export default function DashboardRouter() {
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  // First effect just sets the role and loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      const userRole = getUserRole();
      setRole(userRole);
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && role) {
      toast({
        title: "Welcome",
        description: `You are logged in as ${role}`,
      });
    }
  }, [role, isLoading, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Loading your dashboard...</h1>
          <p className="text-gray-500 mt-2">
            Please wait while we fetch your profile
          </p>
        </div>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-red-600">Access Denied</h1>
          <p className="text-gray-500 mt-2">
            You don&apos;t have permission to access this page.
          </p>
          <Button className="mt-4" onClick={() => router.push("/login")}>
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  switch (role) {
    case "admin":
      return <AdminDashboard />;
    case "teamLeader":
      return <TeamLeaderDashboard />;
    case "employee":
      return <EmployeeDashboard />;
    default:
      return null;
  }
}
