"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/dashboard/layout/Sidebar";
import Header from "@/components/dashboard/layout/Header";
import { getRoutesByRole } from "@/components/dashboard/layout/routes";
import { AccessDeniedScreen } from "./FallbackPage";
import { Toaster } from "sonner";

type UserRole = "admin" | "teamLeader" | "employee";

const getUserRole = (): UserRole | null => {
  if (typeof window === "undefined") return null;

  const role = localStorage.getItem("userRole") as UserRole | null;

  if (!role || !["admin", "teamLeader", "employee"].includes(role)) {
    return null;
  }

  return role;
};

export default function DashboardLayout() {
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

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

  const routes = useMemo(() => (role ? getRoutesByRole(role) : []), [role]);

  const currentPath = useMemo(() => {
    const path = pathname.replace(/\/$/, "");
    const segments = path.split("/").filter(Boolean);
    return segments.length > 0 ? `/${segments[0]}` : "/dashboard";
  }, [pathname]);

  const currentRoute = useMemo(() => {
    const mainRoute = routes.find((route) => route.path === currentPath);
    if (mainRoute) return mainRoute;

    // Check nested routes
    for (const route of routes) {
      if (route.nestedRoutes) {
        const nestedRoute = route.nestedRoutes.find(
          (nested) => nested.path === pathname
        );
        if (nestedRoute) return nestedRoute;
      }
    }
    return null;
  }, [routes, currentPath, pathname]);

  useEffect(() => {
    if (
      role &&
      routes.length > 0 &&
      !currentRoute &&
      currentPath !== "/dashboard"
    ) {
      router.push("/dashboard");
    }
  }, [currentPath, role, routes, currentRoute, router]);

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
    return <AccessDeniedScreen onBackToLogin={() => router.push("/login")} />;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Toaster />
        <Sidebar
          userRole={role}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex-1 overflow-auto overflowY">
          <div
            className="fixed inset-0 bg-black/50 z-40 hidden max-sm:block transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
            style={{
              opacity: isSidebarOpen ? 1 : 0,
              pointerEvents: isSidebarOpen ? "auto" : "none",
            }}
          />
          <main className="p-4 max-lg:p-2">
            {currentRoute && (
              <div>
                <Header toggleSidebar={toggleSidebar} />
                <currentRoute.component />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
