import React from "react";
import InboxCard from "@/components/ui/shared/InboxCard";
import MetricCard from "@/components/ui/shared/MetricCard";
import RequestQueue from "@/components/ui/shared/RequestQueue";
import ScheduleCard from "@/components/ui/shared/ScheduleCard";
import TimeTracker from "@/components/ui/shared/TimeTracker";
import ProjectProgress from "@/components/ui/shared/ProgressBar";
import { Timer, Umbrella } from "lucide-react";
import { ImUsers } from "react-icons/im";
import { requests, scheduleItems, mockMessages } from "../tempData";
import { cn } from "@/lib/utils";

const EmployeeDashboard = () => {
  return (
    <>
      <div className=" mb-5 mt-10 text-3xl font-medium text-charcoal">
        Overview
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-[1fr_auto_1fr] gap-x-3 mt-3",
          "max-xl:grid-cols-[auto_1fr] max-xl:gap-x-3 max-xl:gap-y-3",
          "max-lg:grid-cols-[1fr_1fr] max-lg:gap-x-3 max-lg:gap-y-3",
          "max-sm:grid-cols-[1fr] max-sm:gap-y-3 max-sm:gap-x-0"
        )}
      >
        <div className=" max-xl:row-start-1 h-[315px] max-xl:w-full max-lg:col-span-2 max-sm:h-max">
          <TimeTracker />
        </div>

        <div className="rounded-3xl bg-gray-soft w-[375px] max-xl:w-full h-[315px] flex flex-col gap-1 justify-center max-lg:row-start-2 max-lg:col-start-1 max-sm:col-start-2">
          <ScheduleCard
            title="Your Schedule"
            items={scheduleItems.slice(0, 4)}
            cellClassName="grid grid-cols-2 gap-x-2 gap-y-2 items-end"
          />
        </div>

        <div className="w-full h-[315px] max-sm:row-start-3 max-xl:col-span-2 max-lg:col-span-1 max-lg:col-start-2 max-lg:row-start-2 ">
          <RequestQueue
            title="Updates"
            requests={requests}
            editIcon
            className="p-4"
          />
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-2 gap-x-3 mt-3",
          "max-sm:grid-cols-1 max-sm:gap-y-3 max-sm:gap-x-0"
        )}
      >
        <div className=" flex flex-col gap-y-3">
          <div className="w-full bg-gray-soft rounded-3xl flex flex-col gap-5  p-5 ">
            <div className=" text-xl font-semibold mt-2">Project Progress</div>
            <ProjectProgress percentage={65} label="Mobile app development" />
          </div>
          <div className="rounded-3xl bg-gray-soft shadow p-4 min-h-[200px] max-xl:h-full">
            <InboxCard
              chatTitle="Company Chat"
              initialMessages={mockMessages}
              currentUser="You"
              className="max-xl:h-[496px] max-lg:!h-[500px]"
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-3">
          <div className="rounded-3xl bg-gray-soft shadow p-4 min-h-[470px]">
            <InboxCard
              chatTitle="Team Chat"
              initialMessages={mockMessages}
              currentUser="You"
            />
          </div>

          <div className="flex gap-4 w-full h-full max-xl:grid grid-cols-2 max-lg:gap-2">
            <MetricCard
              title="Your Attendance"
              value="85%"
              icon={<ImUsers size={40} />}
              arrow
              className="min-w-32 w-auto px-3 py-2 h-full"
            />
            <MetricCard
              title="No. Of Leave Used"
              value="00"
              icon={<Timer size={40} />}
              arrow
              className="min-w-32 w-auto px-3 py-2 h-full"
            />
            <MetricCard
              title="Paid Days Off"
              value="15"
              icon={<Umbrella size={40} className="rotate-45" />}
              arrow
              className="min-w-32 w-auto px-3 py-2 h-full"
            />
            <MetricCard
              title="Letters From HR"
              icon={
                <span className="text-4xl font-extrabold underline">HR</span>
              }
              arrow
              className="min-w-32 w-auto px-3 py-2 h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard;
