import React, { useState } from "react";
import Table from "@/components/ui/shared/Table";
import { TableColumn } from "@/components/ui/shared/Table/types/types";
import { Button } from "@/components/ui/button";
import { Attendance } from "../../..";
import { cn } from "@/lib/utils";
import WarningModal from "./Modal";

interface WarningFormData {
  subject: string;
  to: string;
  cc: string;
  date: string;
  message: string;
}

const TableView = ({attendance}:{attendance:Attendance[]}) => {
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Attendance | null>(null);

  const handleIssueWarning = (employee: Attendance) => {
    setSelectedEmployee(employee);
    setIsWarningModalOpen(true);
  };

  const handleSendWarning = (employee: Attendance, formData: WarningFormData) => {
    console.log('Warning data:', formData);
    
    //  update the employee's warning status here
    // and refresh the data
    
    // For demo purposes, we'll just log it
    alert(`Warning sent to ${employee.name}`);
  };

  const handleCloseModal = () => {
    setIsWarningModalOpen(false);
    setSelectedEmployee(null);
  };

  const Columns: TableColumn<Attendance & {incidentsDetails: React.ReactNode }>[] = [
    {
      key: "name",
      header: "Name",
      className:"max-xl:w-36 max-lg:w-full",
      render: (value) => <div className='truncate overflow-hidden'>{String(value)}</div>,
    },
    {
      key: "department",
      header: "Department",
      className:"max-xl:w-36 max-lg:w-full",
      render: (value) => (
        <div className='truncate overflow-hidden'>
          {String(value)}
        </div>
      ),
    },
    {
      key: "incidentsDetails",
      header: "Incident Type",
      render: (value) => {
        return (
          <div className="flex flex-col gap-1 max-lg:w-full">
        {Array.isArray(value) ? value : <div>{String(value)}</div>}
      </div>
        );
      },
    },
    {
      key: "incidents",
      header: "No. of Incidents",
      className: "w-24",
      render: (value) => {
        const incidents = value as { date: string; type: string }[];
        return (
          <div>
            {incidents?.length ?? 0}
          </div>
        );
      },
    },
    {
      key: "warningIssued",
      header: "Warning Letter",
      render: (value, row) => (
        <Button 
          className={cn(
            "w-44 max-xl:w-40 max-lg:w-full truncate overflow-hidden text-charcoal",
            value === true ? "bg-[#868585] text-white cursor-not-allowed" : "bg-gray-lite cursor-pointer font-normal hover:bg-gray-soft/50"
          )} 
          disabled={value === true} 
          variant={'default'} 
          onClick={() => handleIssueWarning(row as Attendance)}
        >
          {value === true ? "Warning Issued" : "Issue Warning"}
        </Button>
      ),
    },
  ];

  const processedAttendance = attendance.map((item) => ({
    ...item,
    incidentsDetails:
      item.incidents.length > 0
        ? item.incidents.map((i, idx) => (
            <div key={idx} className="flex flex-col text-sm text-center">
              <span>{i.type}</span>
              <span className="text-muted-foreground ">
                {new Date(i.date).toLocaleDateString()}
              </span>
            </div>
          ))
        : [<div key="none">None</div>],
  }));


  return (
    <div>
      <Table<Attendance & { incidentsDetails: React.ReactNode }>
        data={processedAttendance}
        columns={Columns}
        pagination={{
          enabled: true,
          pageSize: 7,
          showPageInfo: true,
        }}
        scrollAreaHeight="h-auto max-h-[560px]"
        className="mb-4"
      />

      <WarningModal
        isOpen={isWarningModalOpen}
        onClose={handleCloseModal}
        employee={selectedEmployee}
        onSendWarning={handleSendWarning}
      />
    </div>
  );
}

export default TableView