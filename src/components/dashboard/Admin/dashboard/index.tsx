import React from "react";
import MetricCard from "@/components/ui/shared/MetricCard";
import AverageKpiGraph from "@/components/ui/shared/AverageKpiGraph";
import AttendanceRate from "@/components/ui/shared/AttendanceRate";
import GenderBreakdown from "@/components/ui/shared/GenderBreakdown";
import RequestQueue from "@/components/ui/shared/RequestQueue";
import ScheduleCard from "@/components/ui/shared/ScheduleCard";
import ProjectsCard from "@/components/ui/shared/ProjectsCard";
import InboxCard, { Message } from "@/components/ui/shared/InboxCard";

import { FaUserPlus } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { MdOutlineDateRange } from "react-icons/md";
import { TbUserSquare } from "react-icons/tb";
import { HiPlus } from "react-icons/hi2";

import {
  attendanceData,
  genderData,
  kpiData,
  mockMessages,
  requests,
  scheduleItems,
  upcomingInterviews,
} from "../tempData";
import { cn } from "@/lib/utils";

const AdminDashboard = () => {
  const handleSendMessage = async (message: Message): Promise<boolean> => {
    console.log("Sending message:", message);

    // This would be actual API call
    // Example:
    // try {
    //   const response = await fetch('/api/chat/send', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(message)
    //   });
    //   return response.ok;
    // } catch (error) {
    //   console.error('Failed to send message:', error);
    //   return false;
    // }

    // For demo, simulate success with 90% chance
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(Math.random() > 0.1);
      }, 1000);
    });
  };

  return (
    <>
      <div className="justify-self-end py-2 px-4 bg-gray-dark flex items-center rounded-4xl gap-2 mb-5 mt-3">
        <span className="text-base font-medium text-charcoal">
          {" "}
          Add New Announcement
        </span>
        <span className="size-5 bg-gray-soft rounded-full flex items-center justify-center">
          <HiPlus />
        </span>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-[auto_auto_1fr] gap-x-3 mt-3",
          "max-xl:grid-cols-[auto_1fr] max-xl:space-x-3 max-xl:gap-y-3",
          "max-sm:grid-cols-1 max-sm:gap-y-3 max-sm:gap-x-0"
        )}
      >
        <div className="grid grid-cols-2 gap-4 w-80 max-sm:gap-2 max-sm:w-full mr-0">
          <MetricCard
            title="No. Of Employees"
            value="10"
            icon={<ImUsers size={40} />}
          />
          <MetricCard
            title="No. Of New Employees"
            value="00"
            icon={<FaUserPlus size={40} />}
          />
          <MetricCard
            title="No. Of Employees on Leave"
            value="04"
            icon={<TbUserSquare size={40} />}
          />
          <MetricCard
            title="Upcoming Events"
            value="02"
            icon={<MdOutlineDateRange size={40} />}
          />
        </div>

        <div className="w-[622px] max-xl:w-full max-xl:row-start-2 max-xl:col-span-2">
          <AverageKpiGraph title="Average Team KPI" data={kpiData} />
        </div>

        <div className="rounded-3xl bg-gray-soft p-2 w-full flex flex-col gap-1 justify-center max-sm:row-start-3">
          <ProjectsCard title="Active Projects" value={12} arrow />
          <ProjectsCard title="Projects on Hold" value={24} arrow />
          <ProjectsCard title="Total Projects" value={36} arrow />
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-[auto_auto_1fr] gap-x-3 mt-3",
          "max-xl:grid-cols-2 max-xl:space-x-3 max-xl:gap-y-3",
          "max-sm:grid-cols-1 max-sm:gap-y-3 max-sm:gap-x-0"
        )}
      >
        <div className="w-[622px] max-xl:w-full max-xl:col-span-2">
          <AttendanceRate title="Attendance rate" data={attendanceData} />
        </div>

        <div className="w-[237px] max-xl:w-full">
          <GenderBreakdown title="Gender Diversity" data={genderData} />
        </div>

        <div className="w-full max-sm:row-start-3">
          <RequestQueue
            title="Pending Leave Requests"
            arrow
            requests={requests}
          />
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-[auto_auto_1fr] gap-x-3 mt-3",
          "max-xl:grid-cols-2 max-xl:space-x-3 max-xl:gap-y-3",
          "max-sm:grid-cols-1 max-sm:gap-y-3 max-sm:gap-x-0"
        )}
      >
        <div className="w-[300px] max-xl:w-full">
          <ScheduleCard
            title="Upcoming Interviews"
            icon
            items={upcomingInterviews.slice(0, 3)}
          />
        </div>

        <div className="w-[388px] max-xl:w-full max-sm:row-start-2">
          <ScheduleCard
            title="Your Schedule"
            items={scheduleItems.slice(0, 6)}
            gridClassName="grid grid-cols-2 gap-x-4 gap-y-2 items-end"
          />
        </div>

        <div className="w-full max-sm:row-start-3 max-xl:col-span-2">
          <div className="rounded-3xl bg-gray-soft shadow p-4 flex flex-col gap-2 min-h-[200px]">
            <InboxCard
              chatTitle="Company Chat"
              initialMessages={mockMessages}
              currentUser="You"
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
