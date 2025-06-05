import React, { useState } from "react";
import {
  EmployeeAction,
  EmployeeActions,
  EmployeeAvatar,
  EmployeeCard,
  EmployeeContainer,
  EmployeeDesc1,
  EmployeeDesc2,
  EmployeeDetail1,
  EmployeeName,
} from "@/components/ui/shared/EmployeeCard";
import LeaveApplicationModal from "./LeaveApplicationModal";
import moment from "moment";
import { LeaveManagement, LeaveRequest } from "../../tempData";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import UpcomingHolidays from "./upcomingHolidays";

const CardView = ({ data, onViewAllRequests }: { data: LeaveManagement[], onViewAllRequests?: (employee: LeaveManagement) => void }) => {
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState<LeaveRequest | undefined>();
  const [selectedEmployeeName, setSelectedEmployeeName] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleViewApplication = (leaveRequest: LeaveRequest, employeeName: string) => {
    setSelectedLeaveRequest(leaveRequest);
    setSelectedEmployeeName(employeeName);
    setIsModalOpen(true);
  };
  const cardContent = data.map((leave) => {
    const latestLeave = [...leave.leaveRequests].sort(
      (a, b) => new Date(b.to).getTime() - new Date(a.to).getTime()
    )[0];

    const statusObj = latestLeave
      ? {
          text:
            latestLeave.status.charAt(0).toUpperCase() +
            latestLeave.status.slice(1),
          colorClass:
            latestLeave?.status === "approved" ||
            latestLeave?.status === "declined"
              ? "bg-[#585757]"
              : "bg-charcoal",
        }
      : undefined;

    return (
      <EmployeeCard key={leave.name} status={statusObj} className="p-3">
        <div className="flex items-center justify-between mt-4 px-2 max-lg:px-0">
          <div className="flex items-center gap-2">
            <EmployeeAvatar />
            <div className="flex flex-col items-start">
              <EmployeeName>{leave.name}</EmployeeName>
              <EmployeeDetail1 className="text-sm">
                {(() => {
                  const getDaysBetween = (
                    from: string,
                    to: string
                  ): number => {
                    const fromDate = new Date(from);
                    const toDate = new Date(to);
                    return Math.ceil(
                      (toDate.getTime() - fromDate.getTime()) /
                        (1000 * 60 * 60 * 24)
                    );
                  };

                  const days = latestLeave
                    ? getDaysBetween(latestLeave.from, latestLeave.to)
                    : 0;

                  return `Leave for ${days} day${days !== 1 ? "s" : ""}`;
                })()}
              </EmployeeDetail1>
            </div>
          </div>
          <FileText 
            size={20} 
            className="mr-3 max-lg:mr-0 cursor-pointer" 
            onClick={() => handleViewApplication(latestLeave, leave.name)}
          />
        </div>
        <EmployeeContainer className="flex flex-1 items-center gap-6 max-lg:flex-col max-lg:items-start max-lg:gap-2 max-sm:flex-row max-sm:gap-4">
          <EmployeeDesc1 className="gap-1 mb-0">
            <div>From:</div>
            <div className="text-sm max-lg:max-w-[150px] max-w-48 truncate">
              {latestLeave &&
                moment(latestLeave.from).format("DD MMM YYYY")}
            </div>
          </EmployeeDesc1>
          <EmployeeDesc2 className="gap-1">
            <div>To:</div>
            <div className="text-sm max-lg:max-w-[150px] max-w-48 truncate">
              {latestLeave && moment(latestLeave.to).format("DD MMM YYYY")}
            </div>
          </EmployeeDesc2>
        </EmployeeContainer>
        <EmployeeActions>
          <EmployeeAction
            className={cn(
              "cursor-pointer bg-[#878787] text-base max-lg:text-sm max-sm:text-base text-white"
            )}
            onClick={() => {
              if (onViewAllRequests) {
                onViewAllRequests(leave);
              }
            }}
          >
            Full Request
          </EmployeeAction>
          <EmployeeAction
            className={cn("cursor-pointer text-base bg-white")}
            onClick={() => {
              // Handle decline action here
              alert(`Message will be sent to ${leave.name} someday soon`);
            }}
          >
            Message
          </EmployeeAction>
        </EmployeeActions>
      </EmployeeCard>
    );
  });

  return (
    <>
      <div className="flex max-xl:flex-col items-start gap-3 max-xl:gap-8">
      <div className="grid grid-cols-2 max-xl:grid-cols-2 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-x-5 gap-y-7 w-2/3 max-xl:w-full max-xl:order-2">
        {cardContent}
      </div>
      <div className="w-1/3 max-xl:w-full max-xl:order-1">
      <UpcomingHolidays/>
      </div>
      </div>

      <LeaveApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        leaveRequest={selectedLeaveRequest}
        employeeName={selectedEmployeeName}
      />
    </>
  );
};

export default CardView;
