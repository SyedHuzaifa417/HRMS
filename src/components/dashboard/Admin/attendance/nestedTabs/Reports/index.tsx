import Table from "@/components/ui/shared/Table";
import {
  TableColumn,
  TableFilter,
} from "@/components/ui/shared/Table/types/types";
import React from "react";
import moment from "moment";
import { attendance } from "../../../tempData";
import ExcelExport from "@/components/ui/shared/Table/components/ExcelExport";
import { Attendance } from "../..";

const AdminReports = () => {
  const attendanceColumns: TableColumn<Attendance>[] = [
    {
      key: "no",
      header: "Sr No.",
      className: "w-20",
      render: (_value, _row, index) => (
        <div>{String(index + 1).padStart(2, "0")}</div>
      ),
    },
    {
      key: "name",
      header: "employee",
      render: (value) => <div>{String(value)}</div>,
    },
    {
      key: "title",
      header: "Title",
      render: (value) => (
        <div className="w-40 max-xl:w-28 max-lg:w-full truncate overflow-hidden">
          {String(value)}
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (value) => (
        <div>{moment(value as string).format("DD/MM/YY")}</div>
      ),
    },
    {
      key: "checkIn",
      header: "Check-In",
      render: (value) => <div>{moment(value as string).format("hh:mm A")}</div>,
    },
    {
      key: "checkOut",
      header: "Check-Out",
      render: (value) => (
        <div>{value ? moment(value as string).format("hh:mm A") : "-"}</div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (value) => <div>{String(value)}</div>,
    },
  ];

  const createFilters = (data: Attendance[]): TableFilter[] => {
    const uniqueDesignation = [...new Set(data.map((item) => item.title))]
      .filter(Boolean)
      .map((item) => ({ value: item, label: item }));
    const uniqueDate = [...new Set(data.map((item) => item.date))]
      .filter(Boolean)
      .map((item) => ({ value: item, label: moment(item).format("DD/MM/YY") }));
    const uniqueStatus = [...new Set(data.map((item) => item.status))]
      .filter(Boolean)
      .map((item) => ({ value: item, label: item }));
    const uniqueCheckIn = [...new Set(data.map((item) => item.checkIn))]
      .filter(Boolean)
      .map((item) => ({ value: item, label: moment(item).format("hh:mm A") }));
      const uniqueDepartment=[...new Set(data.map((item) => item.department))]
      .filter(Boolean)
      .map((item) => ({ value: item, label: item }));
    return [
      {
        key: "title",
        label: "Designation",
        options: [...uniqueDesignation],
      },
      {
        key: "department",
        label: "Department",
        options: [...uniqueDepartment],
      },
      {
        key: "date",
        label: "Date",
        options: [...uniqueDate],
      },
      {
        key: "status",
        label: "Status",
        options: [...uniqueStatus],
      },
      {
        key: "checkIn",
        label: "Check-In",
        options: [...uniqueCheckIn],
      },
    ];
  };

  return (
    <>
      <div className="text-3xl font-semibold my-6">Reports</div>

      <Table<Attendance>
        data={attendance}
        columns={attendanceColumns}
        pagination={{
          enabled: true,
          pageSize: 12,
          showPageInfo: true,
        }}
        filters={{
          enabled: true,
          filters: createFilters(attendance),
        }}
        searchConfig={{ enabled: true, columns: ["name"] }}
        scrollAreaHeight="h-auto max-h-[500px]"
        className="mb-4"
      />
      <div className="flex justify-end my-4">
        <ExcelExport
          data={attendance}
          columns={attendanceColumns}
          filename="attendance-reports.xlsx"
        />
      </div>
    </>
  );
};

export default AdminReports;
