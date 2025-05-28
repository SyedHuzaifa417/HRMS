import React from "react";
import Table from "../../../../ui/shared/Table";
import {
  TableColumn,
} from "../../../../ui/shared/Table/types/types";
import ExcelExport from "../../../../ui/shared/Table/components/ExcelExport";
import { allEmployees, Employee } from "../../tempData";

const employeeColumns: TableColumn<Employee>[] = [
  {
    key: "id",
    header: "ID",
    className:"w-20",
    render: (value) => (
      <div>
        {String(value).padStart(2, "0")}
      </div>
    ),
  },
  {
    key: "name",
    header:"employee",
    render: (value) => (
      <div >{String(value)}</div>
    ),
  },
  {
    key: "position",
    header: "Position",
    render: (value) => <div className="w-40 max-xl:w-28 max-lg:w-full truncate overflow-hidden">{String(value)}</div>,
  },
  {
    key: "location",
    header: "Location",
    render: (value) => <div className="w-40 max-xl:w-28 max-lg:w-full truncate overflow-hidden">{String(value)}</div>,
  },
  {
    key: "phone",
    header: "Phone",
    render: (value) => <div className="max-xl:w-28 max-lg:w-full truncate overflow-hidden">{String(value)}</div>,
  },
  {
    key: "email",
    header: "Email",
    render: (value) => <div className="w-40 max-xl:w-28 max-lg:w-full truncate overflow-hidden">{String(value)}</div>,
  },
  {
    key: "isOffline",
    header: "Status",
    className:"w-24 max-xl:w-20",
    render: (value) => <div>{value===false?"Online":"Offline"}</div>,
  }
];


export default function EmployeeTable({data,exportToExcel,onRowClick}: {data: Employee[],exportToExcel?:boolean,onRowClick?: (row: Employee) => void}) {
  
  const handleRowClick = (row: Record<string, unknown>) => {
    if (onRowClick) {
      const employee = row as unknown as Employee;
      if (employee && employee.id) {
        onRowClick(employee);
      }
    }
  };
  
  return (
    <div>
      <Table
        data={data as unknown as Record<string,unknown>[]}
        columns={employeeColumns as unknown as TableColumn<Record<string, unknown>>[]} 
        pagination={{
          enabled: true,
          pageSize: 10,
          showPageInfo: true,
        }}
        onRowClick={handleRowClick}
        scrollAreaHeight="h-auto max-h-[560px]"
        className="mb-4"
      />
      {exportToExcel && (
      <div className="flex justify-end my-4">
        <ExcelExport 
          data={allEmployees as unknown as Record<string, unknown>[]}
          columns={employeeColumns}
          filename="employee-reports.xlsx"
        />
      </div>)}
    </div>
  );
}
