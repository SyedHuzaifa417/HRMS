import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import { employeesLeaves, LeaveManagement } from "../tempData";
import CardView from "./views/CardView";
import TableView from "./views/TableView";
import { IoChevronBack } from "react-icons/io5";
import { Button } from "@/components/ui/button";

const AdminLeaveManagement = () => {
  const [filterPending, setFilterPending] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [selectedEmployee, setSelectedEmployee] = useState<LeaveManagement | undefined>();

  // Filter data based on pending status if needed
  const filteredData = filterPending
    ? employeesLeaves.filter((leave) => {
        const latestLeave = [...leave.leaveRequests].sort(
          (a, b) => new Date(b.to).getTime() - new Date(a.to).getTime()
        )[0];
        return latestLeave?.status === "pending";
      })
    : employeesLeaves;

  return (
    <>
      <header className="flex items-center justify-between pt-10 pb-5 max-sm:pt-5">
        <h2 className="text-3xl font-semibold my-6 max-sm:text-xl max-sm:my-3">
          Leave Management
        </h2>
          {viewMode === 'card' ? <div className="flex items-center gap-5 max-sm:gap-3 text-lg text-charcoal">
            All
            <Switch
            id="toggle-view"
              className="data-[state=checked]:bg-[#A8A8A8] data-[state=unchecked]:bg-[#A8A8A8] cursor-pointer"
              onClick={() => {
                setFilterPending((prev) => !prev);
              }}
            />
            Pending
        </div> : <Button
              onClick={() =>
                setViewMode("card")
              }
              className="px-4 py-2 bg-gray-dark rounded-2xl text-base font-normal hover:bg-gray-soft transition-colors cursor-pointer"
              variant={"ghost"}
            >
              <IoChevronBack size={20} />
            </Button>}
      </header>
      
        {viewMode === 'card' ? (
          <CardView 
            data={filteredData} 
            onViewAllRequests={(employee) => {
              setSelectedEmployee(employee);
              setViewMode('table');
            }}
          />
        ) : (
          <TableView 
            data={filteredData} 
            initialSelectedEmployee={selectedEmployee} 
          />
        )}
    </>
  );
};

export default AdminLeaveManagement;
