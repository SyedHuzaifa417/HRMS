"use client";

import React from "react";
import {
  LayoutDashboard,
  Calendar,
  Timer,
  MessageSquareMore,
} from "lucide-react";
import { RxTimer } from "react-icons/rx";
import { HiUsers } from "react-icons/hi2";
import { CgCreditCard } from "react-icons/cg";
import { PiCirclesThree } from "react-icons/pi";
import { SlSpeedometer } from "react-icons/sl";
import AdminDashboard from "../Admin/dashboard";
import EmployeeDashboard from "../Employee/dashboard";
import TeamLeaderProfile from "../TeamLeader/dashboard/Profile/index";
import TeamLeaderDashboard from "../TeamLeader/dashboard";
import Payroll from "../TeamLeader/dashboard/Payroll";
import MyData from "../Employee/dashboard/MyData";
import AdminEmployees from "../Admin/employee";

export interface Route {
  path: string;
  title: string;
  icon: React.ReactNode;
  component: React.ComponentType;
  nestedRoutes?: {
    path: string;
    title: string;
    component: React.ComponentType;
  }[];
}



export const adminRoutes: Route[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    component: AdminDashboard,
  },
  {
    path: "/employee",
    title: "Employee",
    icon: <HiUsers size={20} />,
    component: AdminEmployees,
  },
  {
    path: "/attendance",
    title: "Attendance",
    icon: <RxTimer size={20} />,
    component: AdminDashboard,
  },
  {
    path: "/leave",
    title: "Leave Management",
    icon: <Timer size={20} />,
    component: AdminDashboard,
  },
  {
    path: "/payroll",
    title: "Payroll",
    icon: <CgCreditCard size={20} className="rotate-180" />,
    component: AdminDashboard,
  },
  {
    path: "/performance",
    title: "Performance",
    icon: <SlSpeedometer size={20} />,
    component: AdminDashboard,
  },
  {
    path: "/teams",
    title: "Teams",
    icon: <PiCirclesThree size={20} />,
    component: AdminDashboard,
  },
  {
    path: "/messages",
    title: "Messages",
    icon: <MessageSquareMore size={20} />,
    component: AdminDashboard,
  },
];

export const teamLeaderRoutes: Route[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    component: TeamLeaderDashboard,
    nestedRoutes: [
      { title: "My Profile", path: "/profile", component: TeamLeaderProfile },
      { title: "Payroll", path: "/payroll", component: Payroll },
    ],
  },
  {
    path: "/attendance",
    title: "Attendance",
    icon: <Calendar size={20} />,
    component: AdminDashboard,
  },
  {
    path: "/leave",
    title: "Leave Management",
    icon: <Timer size={20} />,
    component: AdminDashboard,
  },
  {
    path: "/performance",
    title: "Performance",
    icon: <SlSpeedometer size={20} />,
    component: AdminDashboard,
  },
  {
    path: "/teams",
    title: "Teams",
    icon: <PiCirclesThree size={20} />,
    component: AdminDashboard,
  },
  {
    path: "/messages",
    title: "Messages",
    icon: <MessageSquareMore size={20} />,
    component: AdminDashboard,
  },
];

export const employeeRoutes: Route[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: <LayoutDashboard size={25} />,
    component: EmployeeDashboard,
    nestedRoutes: [
      {
        path: "/my-data",
        title: "My Data",
        component: MyData,
      },
      {
        path: "/stats",
        title: "Stats",
        component: AdminDashboard,
      },
    ],
  },
  {
    path: "/attendance",
    title: "Attendance",
    icon: <RxTimer size={25} />,
    component: AdminDashboard,
  },
  {
    path: "/leave",
    title: "Leave Management",
    icon: <Timer size={25} />,
    component: AdminDashboard,
  },
  {
    path: "/payroll",
    title: "Payroll",
    icon: <CgCreditCard size={25} className="rotate-180" />,
    component: AdminDashboard,
  },
  {
    path: "/performance",
    title: "Performance",
    icon: <SlSpeedometer size={25} />,
    component: AdminDashboard,
  },
  {
    path: "/teams",
    title: "Teams",
    icon: <PiCirclesThree size={25} />,
    component: AdminDashboard,
  },
  {
    path: "/messages",
    title: "Messages",
    icon: <MessageSquareMore size={25} />,
    component: AdminDashboard,
  },
];

export const getRoutesByRole = (role: string): Route[] => {
  switch (role) {
    case "admin":
      return adminRoutes;
    case "teamLeader":
      return teamLeaderRoutes;
    case "employee":
      return employeeRoutes;
    default:
      return [];
  }
};
