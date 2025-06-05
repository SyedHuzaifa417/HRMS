import React from "react";
import Table from "../../../../ui/shared/Table";
import { TableColumn } from "../../../../ui/shared/Table/types/types";

export interface Employee {
  id: string;
  name: string;
  position: string;
  location: string;
  phone: string;
  rating?: string;
  email: string;
  isOffline: boolean;
  onLeave?: boolean;
}

const employeeColumns: TableColumn<Employee>[] = [
  {
    key: "id",
    header: "ID",
    className: "w-20",
    render: (value) => <div>{String(value).padStart(2, "0")}</div>,
  },
  {
    key: "name",
    header: "employee",
    render: (value) => <div>{String(value)}</div>,
  },
  {
    key: "position",
    header: "Position",
    render: (value) => (
      <div className="w-40 max-xl:w-28 max-lg:w-full truncate overflow-hidden">
        {String(value)}
      </div>
    ),
  },
  {
    key: "location",
    header: "Location",
    render: (value) => (
      <div className="w-40 max-xl:w-28 max-lg:w-full truncate overflow-hidden">
        {String(value)}
      </div>
    ),
  },
  {
    key: "phone",
    header: "Phone",
    render: (value) => (
      <div className="max-xl:w-28 max-lg:w-full truncate overflow-hidden">
        {String(value)}
      </div>
    ),
  },
  {
    key: "email",
    header: "Email",
    render: (value) => (
      <div className="w-40 max-xl:w-28 max-lg:w-full truncate overflow-hidden">
        {String(value)}
      </div>
    ),
  },
  {
    key: "isOffline",
    header: "Status",
    className: "w-24 max-xl:w-20",
    render: (value) => <div>{value === false ? "Online" : "Offline"}</div>,
  },
];

export default function EmployeeTable({
  data,
  onRowClick,
}: {
  data: Employee[];
  onRowClick?: (row: Employee) => void;
}) {
  
  const handleRowClick = (row: Employee) => {
    if (onRowClick && row.id) {
      onRowClick(row);
    }
  };

  return (
    <div>
      <Table<Employee>
        data={data}
        columns={employeeColumns}
        pagination={{
          enabled: true,
          pageSize: 10,
          showPageInfo: true,
        }}
        onRowClick={handleRowClick}
        scrollAreaHeight="h-auto max-h-[560px]"
        className="mb-4"
      />
    </div>
  );
}
