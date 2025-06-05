import Table from '@/components/ui/shared/Table'
import { TableColumn } from '@/components/ui/shared/Table/types/types';
import React from 'react'
import moment from 'moment'
import { attendance } from '../tempData';

export interface Attendance {
  id:string;
  no?:number;
  name: string;
  title: string;
  date: string;
  checkIn: string;
  checkOut?:string;
  status: string;
  location: string;
  incidents: {date:string,type:string}[];
  department: string;
  warningIssued: boolean;
  warningLetter: {status:"Pending" | "Acknowledged",content:string};
}

const AdminAttendance = () => {
const attendanceColumns: TableColumn<Attendance>[] = [
  {
    key: "no",
    header: "Sr No.",
    className:"w-20",
    render: (_value, _row, index) => (
      <div>{String(index + 1).padStart(2, "0")}</div>
    ),
  },
  {
    key: "name",
    header:"employee",
    render: (value) => <div>{String(value)}</div>,
  },
  {
    key: "title",
    header: "Title",
    render: (value) => <div className="w-40 max-xl:w-28 max-lg:w-full truncate overflow-hidden">{String(value)}</div>,
  },
  {
    key: "date",
    header: "Date",
    render: (value) => <div>{moment(value as string).format("DD/MM/YY")}</div>,
  },
  {
    key: "checkIn",
    header: "Check-In",
    render: (value) => <div>{moment(value as string).format("hh:mm A")}</div>,
  },
  {
    key: "checkOut",
    header: "Check-Out",
    render: (value) => <div>{value ? moment(value as string).format("hh:mm A") : "-"}</div>,
  },
  {
    key: "status",
    header: "Status",
    render: (value) => <div>{String(value)}</div>,
  }
];

  return (
    <>
    <div className="text-3xl font-semibold my-6">
     Today&apos;s Attendance
    </div>

    <Table<Attendance>
    data={attendance}
    columns={attendanceColumns}
    pagination={{
      enabled: true,
      pageSize: 10,
      showPageInfo: true,
    }}
    scrollAreaHeight="h-auto max-h-[400px] max-sm:max-h-[340px]"
    className="mb-4"
    />
    </>
  )
}

export default AdminAttendance
