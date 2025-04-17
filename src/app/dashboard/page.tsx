"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Get user role from localStorage
const getUserRole = (): "admin" | "teamLeader" | "employee" | null => {
  if (typeof window === "undefined") return null; // Server-side check

  const role = localStorage.getItem("userRole") as
    | "admin"
    | "teamLeader"
    | "employee"
    | null;

  // If role doesn't exist or is invalid, return null
  if (!role || !["admin", "teamLeader", "employee"].includes(role)) {
    return null;
  }

  return role;
};

// Get user email from localStorage
const getUserEmail = (): string => {
  if (typeof window === "undefined") return ""; // Server-side check
  return localStorage.getItem("userEmail") || "";
};

export default function Dashboard() {
  const [role, setRole] = useState<"admin" | "teamLeader" | "employee" | null>(
    null
  );
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  const handleActionClick = (action: string) => {
    toast({
      title: "Action triggered",
      description: `You clicked on ${action}`,
    });
  };

  useEffect(() => {
    // Small delay to ensure localStorage is available
    setTimeout(() => {
      const userRole = getUserRole();
      const email = getUserEmail();

      setRole(userRole);
      setUserEmail(email);

      if (userRole) {
        toast({
          title: "Welcome",
          description: `You are logged in as ${userRole}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Authentication error",
          description:
            "You are not authenticated or your role is not recognized",
        });

        // Redirect to login if not authenticated
        router.push("/login");
      }

      setIsLoading(false);
    }, 500);
  }, [toast, router]);

  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");

    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });

    router.push("/login");
  };

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

  // If role is not found, show a message
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

  // Common dashboard layout with role-specific content
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {role === "admin" && "Admin Dashboard"}
            {role === "teamLeader" && "Team Leader Dashboard"}
            {role === "employee" && "Employee Dashboard"}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{userEmail}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        role === "employee"
                          ? "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          : "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      }
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {role === "admin" && "Total Employees"}
                      {role === "teamLeader" && "Team Members"}
                      {role === "employee" && "Leave Balance"}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {role === "admin" && "124"}
                        {role === "teamLeader" && "12"}
                        {role === "employee" && "15 days"}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            {/* Second Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {role === "admin" && "Departments"}
                      {role === "teamLeader" && "Active Projects"}
                      {role === "employee" && "My Tasks"}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {role === "admin" && "8"}
                        {role === "teamLeader" && "4"}
                        {role === "employee" && "5"}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            {/* Third Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {role === "admin" && "Pending Requests"}
                      {role === "teamLeader" && "Pending Approvals"}
                      {role === "employee" && "Upcoming Events"}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {role === "admin" && "12"}
                        {role === "teamLeader" && "7"}
                        {role === "employee" && "2"}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Feature List - Different for each role */}
          <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {/* Admin Features */}
              {role === "admin" && (
                <>
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto py-4 px-6 hover:bg-gray-50"
                      onClick={() => handleActionClick("Manage Employees")}
                    >
                      <div className="text-left">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          Manage Employees
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          Add, edit, or remove employee records
                        </p>
                      </div>
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto py-4 px-6 hover:bg-gray-50"
                      onClick={() => handleActionClick("Department Management")}
                    >
                      <div className="text-left">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          Department Management
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          Create and manage departments and teams
                        </p>
                      </div>
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto py-4 px-6 hover:bg-gray-50"
                      onClick={() => handleActionClick("System Reports")}
                    >
                      <div className="text-left">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          System Reports
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          Generate and view system-wide reports
                        </p>
                      </div>
                    </Button>
                  </li>
                </>
              )}

              {/* Team Leader Features */}
              {role === "teamLeader" && (
                <>
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto py-4 px-6 hover:bg-gray-50"
                      onClick={() => handleActionClick("Team Management")}
                    >
                      <div className="text-left">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          Team Management
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          View and manage your team members
                        </p>
                      </div>
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto py-4 px-6 hover:bg-gray-50"
                      onClick={() => handleActionClick("Project Assignments")}
                    >
                      <div className="text-left">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          Project Assignments
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          Assign tasks and track project progress
                        </p>
                      </div>
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto py-4 px-6 hover:bg-gray-50"
                      onClick={() => handleActionClick("Leave Approvals")}
                    >
                      <div className="text-left">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          Leave Approvals
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          Review and approve team leave requests
                        </p>
                      </div>
                    </Button>
                  </li>
                </>
              )}

              {/* Employee Features */}
              {role === "employee" && (
                <>
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto py-4 px-6 hover:bg-gray-50"
                      onClick={() => handleActionClick("Request Leave")}
                    >
                      <div className="text-left">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          Request Leave
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          Submit a new leave request
                        </p>
                      </div>
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto py-4 px-6 hover:bg-gray-50"
                      onClick={() => handleActionClick("View Assignments")}
                    >
                      <div className="text-left">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          View Assignments
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          View your current tasks and assignments
                        </p>
                      </div>
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto py-4 px-6 hover:bg-gray-50"
                      onClick={() => handleActionClick("Update Profile")}
                    >
                      <div className="text-left">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          Update Profile
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          Update your personal information
                        </p>
                      </div>
                    </Button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
