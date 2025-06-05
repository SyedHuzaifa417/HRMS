import React, { useMemo } from "react";
import Table from "@/components/ui/shared/Table";
import {
  TableColumn,
  TableFilter,
} from "@/components/ui/shared/Table/types/types";
import { employeesLeaves, LeaveManagement } from "../../../tempData";
import moment from "moment";
import ExcelExport from "@/components/ui/shared/Table/components/ExcelExport";

interface ProcessedLeaveData extends LeaveManagement {
  srNo: number;
  total: number;
  taken: number;
  reason: string;
  lastLeaveDate?: string;
  month?: string;
  year?: string;
}

const LeaveBalance = () => {
  const processedData = useMemo(
    () =>
      employeesLeaves.map((item, index) => {
        const { allowedLeaves = {}, leaveRequests = [] } = item;

        const total = Object.values(
          allowedLeaves as Record<string, number>
        ).reduce((sum: number, val: number) => sum + val, 0);

        const approvedLeaves = leaveRequests.filter(
          (req) => req.status === "approved"
        );

        const taken = approvedLeaves.reduce((sum: number, req) => {
          const from = new Date(req.from);
          const to = new Date(req.to);
          const diff =
            (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24) + 1; // inclusive
          return sum + diff;
        }, 0);

        const lastLeaveDate =
          approvedLeaves.length > 0
            ? approvedLeaves.sort(
                (a, b) => new Date(b.to).getTime() - new Date(a.to).getTime()
              )[0].to
            : undefined;

        const reason = approvedLeaves[0]?.reason || "—";

        return {
          ...item,
          srNo: index + 1,
          total,
          taken,
          reason,
          lastLeaveDate,
          month: lastLeaveDate
            ? moment(lastLeaveDate).format("YYYY-MM")
            : undefined,
          year: lastLeaveDate
            ? moment(lastLeaveDate).format("YYYY")
            : undefined,
        } as ProcessedLeaveData;
      }),
    []
  );

  const WarningLogColumns: TableColumn<ProcessedLeaveData>[] = [
    {
      key: "srNo",
      header: "Sr No.",
      className: "w-20",
      render: (_value, _row, index) => (
        <div>{String(index + 1).padStart(2, "0")}</div>
      ),
    },
    {
      key: "name",
      header: "Employee",
      render: (value) => <div>{String(value)}</div>,
    },
    {
      key: "title",
      header: "Title",
      render: (value) => <div>{String(value)}</div>,
    },
    {
      key: "total",
      header: "Total",
      className: "w-32",
      render: (value) => <div>{String(value)}</div>,
    },
    {
      key: "taken",
      header: "Leaves Taken",
      className: "w-56 max-xl:w-36",
      render: (value) => <div>{String(value)}</div>,
    },
    {
      key: "reason",
      header: "Purpose/Reason",
      className: "w-56 max-xl:w-36",
      render: (value) => <div>{String(value)}</div>,
    },
  ];

  const createFilters = (data: ProcessedLeaveData[]): TableFilter[] => {
    const uniqueDesignation = [...new Set(data.map((item) => item.title))]
      .filter(Boolean)
      .map((item) => ({ value: item, label: item }));

    // Get unique taken values from actual data
    const uniqueTakenLeaves = [...new Set(data.map((item) => item.taken))]
      .sort((a, b) => a - b)
      .map((taken) => ({
        value: String(taken),
        label: `${taken} days`,
      }));

    // Get unique dates for filtering
    const uniqueDates = [...new Set(data.map((item) => item.lastLeaveDate))]
      .filter(Boolean)
      .sort()
      .map((date) => ({
        value: date as string,
        label: moment(date).format("DD/MM/YYYY"),
      }));

    // Get unique months from actual dates
    const uniqueMonths = [
      ...new Set(
        data
          .map((item) => item.lastLeaveDate)
          .filter(Boolean)
          .map((date) => moment(date).format("YYYY-MM"))
      ),
    ]
      .sort()
      .map((monthKey) => ({
        value: monthKey,
        label: moment(monthKey, "YYYY-MM").format("MMMM YYYY"),
      }));

    // Get unique years from actual dates
    const uniqueYears = [
      ...new Set(
        data
          .map((item) => item.lastLeaveDate)
          .filter(Boolean)
          .map((date) => moment(date).format("YYYY"))
      ),
    ]
      .sort()
      .map((year) => ({
        value: year,
        label: year,
      }));

    return [
      {
        key: "title",
        label: "Designation",
        options: uniqueDesignation,
      },
      {
        key: "taken",
        label: "Leave Taken",
        options: uniqueTakenLeaves,
      },
      {
        key: "lastLeaveDate",
        label: "Last Leave Date",
        options: uniqueDates,
      },
      {
        key: "month",
        label: "Month",
        options: uniqueMonths,
      },
      {
        key: "year",
        label: "Year",
        options: uniqueYears,
      },
    ];
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Leave Balance</h2>

      <Table<ProcessedLeaveData>
        data={processedData}
        columns={WarningLogColumns}
        pagination={{
          enabled: true,
          pageSize: 9,
          showPageInfo: true,
        }}
        filters={{
          enabled: true,
          filters: createFilters(processedData),
        }}
        scrollAreaHeight="h-auto max-h-[560px]"
        className="mb-4"
        editing={{
          enabled: true,
          isEditing: false,
          onSave: (updatedData) => {
            // Handle saving the updated data
            console.log("Updated data:", updatedData);
            // TODO: Add API call to save the updated data
          },
        }}
      />

      <div className="flex justify-end my-4">
        <ExcelExport
          data={processedData}
          columns={WarningLogColumns}
          filename="Leave-balance.xlsx"
        />
      </div>
    </div>
  );
};

export default LeaveBalance;
