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

const AdminAttendance = () => (
  <div className="p-4">Admin Attendance Management</div>
);
const AdminEmployees = () => <div className="p-4">Employee Management</div>;
const AdminLogs = () => <div className="p-4">System Logs</div>;
const AdminReports = () => <div className="p-4">Reports</div>;
const AdminSettings = () => <div className="p-4">System Settings</div>;

const TeamLeaderAttendance = () => <div className="p-4">Team Attendance</div>;
const TeamLeaderReports = () => <div className="p-4">Team Reports</div>;
const TeamLeaderSettings = () => (
  <div className="p-4">Team Leader Settings</div>
);

const EmployeeMyData = () => <div className="p-4">Employee My Data</div>;
const EmployeeStats = () => <div className="p-4">Employee Stats</div>;

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
    component: AdminAttendance,
  },
  {
    path: "/leave",
    title: "Leave Management",
    icon: <Timer size={20} />,
    component: AdminLogs,
  },
  {
    path: "/payroll",
    title: "Payroll",
    icon: <CgCreditCard size={20} className="rotate-180" />,
    component: AdminLogs,
  },
  {
    path: "/performance",
    title: "Performance",
    icon: <SlSpeedometer size={20} />,
    component: AdminSettings,
  },
  {
    path: "/teams",
    title: "Teams",
    icon: <PiCirclesThree size={20} />,
    component: AdminReports,
  },
  {
    path: "/messages",
    title: "Messages",
    icon: <MessageSquareMore size={20} />,
    component: AdminReports,
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
      { title: "Payroll", path: "/payroll", component: () => <div>hello</div> },
    ],
  },
  {
    path: "/attendance",
    title: "Attendance",
    icon: <Calendar size={20} />,
    component: TeamLeaderAttendance,
  },
  {
    path: "/leave",
    title: "Leave Management",
    icon: <Timer size={20} />,
    component: AdminLogs,
  },
  {
    path: "/performance",
    title: "Performance",
    icon: <SlSpeedometer size={20} />,
    component: AdminSettings,
  },
  {
    path: "/teams",
    title: "Teams",
    icon: <PiCirclesThree size={20} />,
    component: TeamLeaderReports,
  },
  {
    path: "/messages",
    title: "Messages",
    icon: <MessageSquareMore size={20} />,
    component: TeamLeaderSettings,
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
        component: EmployeeMyData,
      },
      {
        path: "/stats",
        title: "Stats",
        component: EmployeeStats,
      },
    ],
  },
  {
    path: "/attendance",
    title: "Attendance",
    icon: <RxTimer size={25} />,
    component: AdminAttendance,
  },
  {
    path: "/leave",
    title: "Leave Management",
    icon: <Timer size={25} />,
    component: AdminLogs,
  },
  {
    path: "/payroll",
    title: "Payroll",
    icon: <CgCreditCard size={25} className="rotate-180" />,
    component: AdminLogs,
  },
  {
    path: "/performance",
    title: "Performance",
    icon: <SlSpeedometer size={25} />,
    component: AdminSettings,
  },
  {
    path: "/teams",
    title: "Teams",
    icon: <PiCirclesThree size={25} />,
    component: AdminReports,
  },
  {
    path: "/messages",
    title: "Messages",
    icon: <MessageSquareMore size={25} />,
    component: AdminReports,
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
