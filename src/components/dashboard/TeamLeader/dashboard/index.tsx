import React from "react";
import { useRouter } from "next/navigation";
import MetricCard from "@/components/ui/shared/MetricCard";
import AverageKpiGraph from "@/components/ui/shared/AverageKpiGraph";
import RequestQueue from "@/components/ui/shared/RequestQueue";
import ScheduleCard from "@/components/ui/shared/ScheduleCard";
import InboxCard, { Message } from "@/components/ui/shared/InboxCard";
import ProjectProgress from "@/components/ui/shared/ProgressBar";
import { Switch } from "@/components/ui/switch";

import { FaUserPlus } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { MdOutlineDateRange } from "react-icons/md";
import { TbUserSquare } from "react-icons/tb";
import { CgGirl } from "react-icons/cg";

import {
  attendance,
  kpiData,
  mockMessages,
  requests,
  scheduleItems,
} from "../tempData";
import { cn } from "@/lib/utils";

const TeamLeaderDashboard = () => {
  const router = useRouter();

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
      <div className="flex items-center justify-between gap-2 mb-7 mt-5 px-2">
        <span className="text-2xl font-medium text-charcoal">Design Team</span>
        <div className="flex items-center gap-5 max-sm:gap-3">
          <span>Team Profile</span>
          <Switch
            id="team-profile"
            className="data-[state=checked]:bg-[#A8A8A8] data-[state=unchecked]:bg-[#A8A8A8]  cursor-pointer"
            onClick={() => router.push("/profile")}
          />
          <span>My Profile</span>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-[auto_1fr_1fr] gap-x-3 mt-3",
          "max-xl:grid-cols-[auto_1fr] max-xl:space-x-3 max-xl:gap-y-3",
          "max-lg:grid-cols-[auto_1fr] max-lg:gap-x-3 max-lg:gap-y-3",
          "max-sm:grid-cols-1 max-sm:gap-y-3 max-sm:gap-x-0"
        )}
      >
        <div className="grid grid-cols-2 gap-4 w-80 mr-0 max-lg:gap-2 max-xl:w-auto max-sm:row-start-1">
          <MetricCard
            title="No. Of Employees"
            value="10"
            icon={<ImUsers size={40} />}
            className="max-lg:min-w-32 max-lg:w-min max-lg:px-3 max-lg:py-2 "
          />
          <MetricCard
            title="No. Of New Employees"
            value="00"
            icon={<FaUserPlus size={40} />}
            className="max-lg:min-w-32 max-lg:w-min max-lg:px-3 max-lg:py-2 "
          />
          <MetricCard
            title="No. Of Employees on Leave"
            value="04"
            icon={<TbUserSquare size={40} />}
            className="max-lg:min-w-32 max-lg:w-min max-lg:px-3 max-lg:py-2 "
          />
          <MetricCard
            title="Upcoming Events"
            value="02"
            icon={<MdOutlineDateRange size={40} />}
            className="max-lg:min-w-32 max-lg:w-min max-lg:px-3 max-lg:py-2 "
          />
        </div>

        <div className="max-w-[622px] max-xl:w-full max-lg:max-w-full max-sm:row-start-2">
          <RequestQueue
            title="Updates"
            requests={requests}
            editIcon
            className="p-4"
          />
        </div>

        <div className="rounded-3xl w-full max-xl:row-start-2 max-xl:col-span-2 max-lg:row-start-2 max-sm:row-start-3">
          <AverageKpiGraph data={kpiData} />
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-[1fr_auto_1fr] gap-x-3 mt-3",
          "max-xl:grid-cols-2 max-xl:space-x-3 max-xl:gap-y-3",
          "max-sm:grid-cols-1 max-sm:gap-y-3 max-sm:gap-x-0"
        )}
      >
        <div className="w-full bg-gray-soft rounded-3xl flex flex-col gap-3 p-5 max-xl:col-span-2 max-xl:row-start-1">
          <div className=" text-xl font-semibold mt-2">Project Progress</div>
          <ProjectProgress percentage={10} label="Website Revamp" />
          <ProjectProgress percentage={45} label="App Prototyping" />
          <ProjectProgress percentage={8} label="Company Profile" />
          <ProjectProgress percentage={76} label="Web app development" />
        </div>

        <div className="w-[388px] max-xl:w-full max-xl:row-start-2">
          <ScheduleCard
            title="Your Schedule"
            items={scheduleItems.slice(0, 6)}
            gridClassName="grid grid-cols-2 gap-x-4 gap-y-2 items-end"
          />
        </div>

        <div className="w-full bg-[#BABABA] rounded-3xl flex flex-col max-sm:row-start-3">
          <div className=" text-xl font-semibold mt-2 p-5">
            Today&apos;s Attendance
          </div>
          <div className="flex flex-col gap-y-4 h-full justify-start p-2">
            {attendance.slice(0, 3).map((attend, idx) => (
              <div key={idx} className="bg-[#E2E2E2] rounded-full p-2">
                <div className="flex items-center gap-5">
                  <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center">
                    <CgGirl size={48} />
                  </div>
                  <div className="text-charcoal text-xs flex items-start truncate gap-2">
                    <span> {attend.name}</span> - <span> {attend.message}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={cn(
          "w-full grid grid-cols-[1fr_1fr] gap-x-3 mt-3",
          "max-lg:grid-cols-1 max-lg:gap-y-3 max-lg:gap-x-0"
        )}
      >
        <div className="w-full max-sm:row-start-1">
          <div className="rounded-3xl bg-gray-soft shadow p-4 flex flex-col gap-2 min-h-[300px]">
            <InboxCard
              chatTitle="Company Chat"
              initialMessages={mockMessages}
              currentUser="You"
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>

        <div className="w-full max-lg:row-start-2">
          <div className="rounded-3xl bg-gray-soft shadow p-4 flex flex-col gap-2 min-h-[300px]">
            <InboxCard
              chatTitle="Team Chat"
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

export default TeamLeaderDashboard;
