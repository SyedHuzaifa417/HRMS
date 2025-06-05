import React, { useState } from "react";
import Table from "../../../../ui/shared/Table";
import { TableColumn } from "../../../../ui/shared/Table/types/types";
import { LeaveManagement, LeaveRequest } from "../../tempData";
import moment from "moment";
import { FileText } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import LeaveApplicationModal from "./LeaveApplicationModal";
import { Button } from "@/components/ui/button";
import { CgGirl } from "react-icons/cg";
import ExcelExport from "@/components/ui/shared/Table/components/ExcelExport";

interface LeaveTableData {
  id: string;
  leaveType: string;
  dateFrom: string;
  dateTo: string;
  duration: string;
  employmentType: string;
  status: string;
  leaveRequest: LeaveRequest;
}

interface TableViewProps {
  data: LeaveManagement[];
  initialSelectedEmployee?: LeaveManagement;
}

const TableView = ({ data, initialSelectedEmployee }: TableViewProps) => {
  const [selectedEmployee] = useState<LeaveManagement | undefined>(
    initialSelectedEmployee || data[0]
  );
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState<
    LeaveRequest | undefined
  >();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewApplication = (leaveRequest: LeaveRequest) => {
    setSelectedLeaveRequest(leaveRequest);
    setIsModalOpen(true);
  };

  if (!selectedEmployee) {
    return <div>No employee data available</div>;
  }

  const usedLeaves = selectedEmployee.leaveRequests.reduce((total, req) => {
    if (req.status === "approved" || req.status === "pending") {
      const from = new Date(req.from);
      const to = new Date(req.to);
      const days =
        Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      return total + days;
    }
    return total;
  }, 0);

  const totalAllowedLeaves = Object.values(
    selectedEmployee.allowedLeaves
  ).reduce((sum, val) => sum + val, 0);
  const availableDays = totalAllowedLeaves - usedLeaves;

  const sortedLeaveRequests = [...selectedEmployee.leaveRequests].sort(
    (a, b) => new Date(b.from).getTime() - new Date(a.from).getTime()
  );

  const latestLeaveRequest = sortedLeaveRequests[0];

  const tableData: LeaveTableData[] = sortedLeaveRequests.map(
    (leaveRequest, index) => {
      const getDaysBetween = (from: string, to: string): number => {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        return (
          Math.ceil(
            (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)
          ) + 1
        );
      };

      const days = getDaysBetween(leaveRequest.from, leaveRequest.to);

      return {
        id: `${index}`,
        leaveType: leaveRequest.reason,
        dateFrom: leaveRequest.from,
        dateTo: leaveRequest.to,
        duration: `${days} day${days !== 1 ? "s" : ""}`,
        employmentType:
          selectedEmployee.employmentType === "full-time"
            ? "Full Time Employee"
            : selectedEmployee.employmentType === "part-time"
            ? "Part Time Employee"
            : "Contractor",
        status: leaveRequest.status,
        leaveRequest,
      };
    }
  );

  const leaveColumns: TableColumn<LeaveTableData>[] = [
    {
      key: "leaveType",
      header: "Leave type",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <Checkbox
            checked={row.leaveRequest.status === "pending"}
            className="rounded-sm"
            disabled
          />
          <div className="capitalize">{String(value)}</div>
        </div>
      ),
    },
    {
      key: "dateFrom",
      header: "Date from",
      render: (value) => <div>{moment(String(value)).format("Do MMM")}</div>,
    },
    {
      key: "dateTo",
      header: "Date To",
      render: (value) => <div>{moment(String(value)).format("Do MMM")}</div>,
    },
    {
      key: "duration",
      header: "Duration",
      render: (value) => <div>{String(value)}</div>,
    },
    {
      key: "employmentType",
      header: "Employement Type",
      className: "w-48 max-lg:w-full truncate overflow-hidden",
      render: (value) => <div>{String(value)}</div>,
    },
    {
      key: "status",
      header: "Status",
      render: (value) => (
        <div className="capitalize">
          {String(value) === "approved"
            ? "Approved"
            : String(value) === "declined"
            ? "Rejected"
            : "Pending"}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col mb-6 px-1.5">
        <div className="flex justify-between items-center pb-4 px-3 max-lg:flex-col max-lg:gap-4">
          <div className="flex items-center gap-4 max-lg:self-start max-sm:flex-col max-sm:gap-2">
            <div className="flex items-center gap-2 max-sm:self-start">
              <div className="flex items-center justify-center bg-white w-14 h-14 rounded-full border-2 border-black ">
                <CgGirl className="w-full h-full text-charcoal" />
              </div>
              <div className="flex flex-col items-start">
                <h2 className="text-xl">{selectedEmployee.name}</h2>
                <span className="text-sm">
                  {sortedLeaveRequests.find(
                    (req) => req.status === "pending"
                  ) &&
                    (() => {
                      const pendingLeave = sortedLeaveRequests.find(
                        (req) => req.status === "pending"
                      )!;
                      const from = moment(pendingLeave.from);
                      const to = moment(pendingLeave.to);
                      const duration = to.diff(from, "days") + 1;
                      return `Leave for ${duration} day${
                        duration !== 1 ? "s" : ""
                      }`;
                    })()}
                </span>
              </div>
            </div>

            <Button
              className="flex items-center text-base gap-2 text-charcoal hover:text-gray-dark hover:bg-transparent"
              onClick={() => handleViewApplication(latestLeaveRequest)}
              variant={"ghost"}
            >
              <FileText size={20} />
              View Leave Application
            </Button>
          </div>
          <div className="flex gap-4  max-lg:self-end">
            <Button
              onClick={() =>
                alert(`Approving leave request for ${selectedEmployee.name}`)
              }
              className="bg-[#878787] rounded-4xl text-white px-7 hover:bg-[#686868] transition-colors"
            >
              Approve
            </Button>
            <Button
              variant="outline"
              className="bg-gray-soft rounded-4xl text-charcoal px-7 hover:bg-gray-dark transition-colors"
              onClick={() =>
                alert(`Declining leave request for ${selectedEmployee.name}`)
              }
            >
              Decline
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center pb-5 max-sm:flex-col max-sm:gap-4">
          <div>
            <h2 className="text-2xl font-semibold">
              Leave Summary for {selectedEmployee.name}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gray-soft py-3 px-4 rounded-3xl flex items-center gap-8">
              <span className="text-charcoal text-xl">Days Available</span>
              <span className="text-3xl font-bold">{availableDays}</span>
            </div>
          </div>
        </div>

        <Table<LeaveTableData>
          data={tableData}
          columns={leaveColumns}
          scrollAreaHeight="h-auto max-h-[400px]"
          className="mb-4"
        />
        <div className="flex justify-end my-4">
          <ExcelExport
            data={tableData}
            columns={leaveColumns}
            filename="Leave-requests.xlsx"
          />
        </div>
      </div>

      <LeaveApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        leaveRequest={selectedLeaveRequest}
        employeeName={selectedEmployee.name}
      />
    </div>
  );
};

export default TableView;
