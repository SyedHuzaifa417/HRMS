"use client";

import React from "react";

// Admin Routes
import AdminDashboard from "../Admin/dashboard";
import AdminEmployees from "../Admin/employee";
import AdminAttendance from "../Admin/attendance";
import AdminReports from "../Admin/attendance/nestedTabs/Reports";
import FlaggedEmployees from "../Admin/attendance/nestedTabs/FlaggedEmployees";
import ManageWarningLog from "../Admin/attendance/nestedTabs/ManageWarningLog";
import AdminLeaveManagement from "../Admin/leaveManagement";
import SetUpLeaves from "../Admin/leaveManagement/nestedTabs/SetUpLeaves";
import LeaveBalance from "../Admin/leaveManagement/nestedTabs/LeaveBalance";
//Team Leader Routes
import TeamLeaderDashboard from "../TeamLeader/dashboard";
import TeamLeaderProfile from "../TeamLeader/dashboard/nestedTabs/Profile/index";
import Payroll from "../TeamLeader/dashboard/nestedTabs/Payroll";
//Employee Routes
import EmployeeDashboard from "../Employee/dashboard";
import MyData from "../Employee/dashboard/nestedTabs/MyData";

import { RxTimer } from "react-icons/rx";
import { HiUsers } from "react-icons/hi2";
import { CgCreditCard } from "react-icons/cg";
import { PiCirclesThree } from "react-icons/pi";
import { SlSpeedometer } from "react-icons/sl";
import {
  LayoutDashboard,
  Calendar,
  Timer,
  MessageSquareMore,
} from "lucide-react";
import AdminPayroll from "../Admin/payroll";
import ManagePayRoll from "../Admin/payroll/nestedTabs/ManagePayroll";
import AdminPayrollReports from "../Admin/payroll/nestedTabs/Reports";

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
    component: AdminAttendance,
    nestedRoutes: [
      {
        path: "/attendance-reports",
        title: "Reports",
        component: AdminReports,
      },
      {
        path: "/flagged-employees",
        title: "Flagged Employee",
        component: FlaggedEmployees,
      },
      {
        path: "/manage-warning-log",
        title: "Manage Warning Log",
        component: ManageWarningLog,
      },
    ],
  },
  {
    path: "/leave-management",
    title: "Leave Management",
    icon: <Timer size={20} />,
    component: AdminLeaveManagement,
    nestedRoutes: [
      {
        path: "/setup-leaves",
        title: "Set up Leaves",
        component: SetUpLeaves,
      },
      {
        path: "/leaves-balance",
        title: "Leave Balance",
        component: LeaveBalance,
      },
    ],
  },
  {
    path: "/payroll",
    title: "Payroll",
    icon: <CgCreditCard size={20} className="rotate-180" />,
    component: AdminPayroll,
    nestedRoutes: [
      {
        path: "/manage-payroll",
        title: "Manage Payroll",
        component: ManagePayRoll,
      },
      {
        path: "/payroll-reports",
        title: "Reports",
        component: AdminPayrollReports,
      },
    ],
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
    nestedRoutes: [
      {
        path: "/report",
        title: "Reports",
        component: AdminReports,
      },
      {
        path: "/flagged-employees",
        title: "Flagged Employee",
        component: FlaggedEmployees,
      },
      {
        path: "/manage-warning-log",
        title: "Manage Warning Log",
        component: ManageWarningLog,
      },
    ],
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
