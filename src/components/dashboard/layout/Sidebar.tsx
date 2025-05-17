"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getRoutesByRole } from "./routes";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { X } from "lucide-react";
import useWindowWidth from "@/hooks/useWindowWidth";

interface SidebarProps {
  userRole: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ userRole, isOpen = false, onClose }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const routes = getRoutesByRole(userRole);
  const [isExpanded, setIsExpanded] = useState(false);
  const { isMobileView } = useWindowWidth();

  return (
    <aside
      className={cn(
        "bg-gray-soft h-screen flex flex-col transition-all duration-300 ease-in-out relative max-sm:fixed z-50",
        isExpanded || isOpen ? "w-64 max-lg:w-52 " : "w-16",
        isMobileView && !isOpen ? "-translate-x-full" : "translate-x-0"
      )}
      onMouseEnter={() => !isMobileView && setIsExpanded(true)}
      onMouseLeave={() => !isMobileView && setIsExpanded(false)}
    >
      <div
        className={cn(
          "flex items-start space-x-5 pt-6",
          isExpanded || isOpen ? "px-8" : "px-5",
          "max-sm:pb-0 max-sm:px-5 max-sm:pt-10"
        )}
        onClick={() => router.push("/")}
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={25}
          height={25}
          className="object-cover flex-shrink-0"
        />
        <h2
          className={cn(
            "font-bold text-center text-xl transition-opacity duration-300",
            isExpanded || isOpen
              ? "opacity-100"
              : "opacity-0 w-0 overflow-hidden"
          )}
        >
          Flexify
        </h2>
      </div>
      {isMobileView && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700"
          aria-label="Close sidebar"
        >
          <X size={24} className="transition-all duration-300" />
        </button>
      )}
      <nav className="flex-1 overflow-y-auto py-3 overflow-x-hidden ">
        <ul
          className={cn(
            "space-y-3 max-sm:px-1 ",
            isExpanded || isOpen ? "pl-4" : "pl-0"
          )}
        >
          {routes.map((route) => {
            const isNestedActive = route.nestedRoutes?.some(
              (nested) => pathname === nested.path
            );
            const isActive = pathname === route.path;

            return (
              <li key={route.path} className="relative">
                <Link
                  href={route.path}
                  className={cn(
                    "flex items-center py-2 rounded-md transition-all duration-300 text-lg font-semibold relative text-charcoal hover:text-gray-600",
                    isExpanded || isOpen
                      ? "px-4 space-x-6"
                      : "justify-center px-2",
                    isActive && isMobileView ? "max-sm:text-blue-600" : ""
                  )}
                >
                  <span className="flex-shrink-0">{route.icon}</span>
                  {(isExpanded || isOpen) && (
                    <span className="transition-opacity duration-300 max-w-32">
                      {route.title}
                    </span>
                  )}
                </Link>
                {(isActive && !isNestedActive) ||
                (isNestedActive && !isExpanded) ? (
                  <div
                    className={cn(
                      "absolute max-sm:hidden right-0 top-3 h-4 bg-white rounded-l-lg transition-all duration-300",
                      isExpanded || isOpen ? "w-10 max-lg:w-5 " : "w-2 "
                    )}
                  />
                ) : null}
                {route.nestedRoutes &&
                  (isActive || isNestedActive) &&
                  (isExpanded || isOpen) && (
                    <ul className="mt-1 space-y-1 ">
                      {route.nestedRoutes.map((nestedRoute) => {
                        const isNestedRouteActive =
                          pathname === nestedRoute.path;
                        return (
                          <li key={nestedRoute.path} className="relative">
                            <Link
                              href={nestedRoute.path}
                              className={cn(
                                "flex items-center py-1.5 pl-16 pr-4 rounded-md transition-all duration-300 text-base font-medium text-gray-600 hover:text-charcoal"
                              )}
                            >
                              <span className="transition-all duration-300">
                                {nestedRoute.title}
                              </span>
                            </Link>
                            {isNestedRouteActive && (
                              <div className="absolute max-sm:hidden right-0 top-1/3 h-4 bg-white rounded-l-lg w-10 max-lg:w-5" />
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="h-16"></div>
    </aside>
  );
};

export default Sidebar;
