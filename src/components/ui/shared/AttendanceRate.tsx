import React from "react";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AttendanceDataPoint {
  label: string;
  onTime: number;
  late: number;
  absent: number;
}

interface AttendanceRateProps {
  title: string;
  data: AttendanceDataPoint[];
  className?: string;
}

const AttendanceRate: React.FC<AttendanceRateProps> = ({
  title,
  data,
  className,
}) => {
  const currentMonth = data[data.length - 1];
  const previousMonth = data[data.length - 2];

  const percentChange =
    ((currentMonth.onTime - previousMonth.onTime) / previousMonth.onTime) * 100;
  const formatted = percentChange.toFixed(1);
  const direction =
    percentChange > 0
      ? "increase"
      : percentChange < 0
      ? "decrease"
      : "no change";
  const icon =
    currentMonth > previousMonth ? <MdArrowUpward /> : <MdArrowDownward />;

  const normalizedData = data.map(({ label, onTime, late, absent }) => {
    const total = onTime + late + absent;
    const scale = total === 0 ? 0 : 100 / total;

    return {
      label,
      onTime: +(onTime * scale).toFixed(2),
      spacer1: 1,
      late: +(late * scale).toFixed(2),
      spacer2: 1,
      absent: +(absent * scale).toFixed(2),
    };
  });

  return (
    <div
      className={`rounded-3xl w-full h-full bg-gray-soft shadow p-2 ${
        className || ""
      }`}
    >
      <div className="flex items-center justify-between mb-2 px-1.5 max-sm:flex-col">
        <div className="flex items-center gap-2 ">
          <span className="text-xl text-charcoal font-medium capitalize mt-1">
            {title}
          </span>
          <div className="flex gap-2 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-4 h-4 bg-[#8B8B8B] inline-block rounded-full"></span>
              On-time
            </span>
            <span className="flex items-center gap-1">
              <span className="w-4 h-4 bg-[#BBBBBB] inline-block rounded-full"></span>
              Late
            </span>
            <span className="flex items-center gap-1">
              <span className="w-4 h-4 bg-[#2C2C2C] inline-block rounded-full"></span>
              Absent
            </span>
          </div>
        </div>
        {direction && (
          <div className="bg-gray-dark my-2 flex items-center rounded-4xl px-2 py-1 ">
            {icon}
            <div className="text-sm text-charcoal">
              <span className="text-base font-semibold">{formatted}%</span>{" "}
              <span className="max-lg:hidden">
                {" "}
                {direction} since last month
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="w-full h-56 bg-transparent">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={normalizedData.map((item) => ({
              label: item.label,
              onTime: item.onTime,
              spacer1: 2,
              late: item.late,
              spacer2: 2,
              absent: item.absent,
            }))}
            margin={{ top: 5, left: -20 }}
            barCategoryGap={6}
          >
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              tickFormatter={(value) => `${value}%`}
              tick={{ fontSize: 12 }}
              interval={0}
            />
            <Tooltip />
            <Bar
              dataKey="onTime"
              stackId="a"
              fill="#8B8B8B"
              radius={[4, 4, 0, 0]}
            />
            <Bar dataKey="spacer1" stackId="a" fill="transparent" />
            <Bar
              dataKey="late"
              stackId="a"
              fill="#BBBBBB"
              radius={[4, 4, 4, 4]}
            />
            <Bar dataKey="spacer2" stackId="a" fill="transparent" />
            <Bar
              dataKey="absent"
              stackId="a"
              fill="#2C2C2C"
              radius={[0, 0, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceRate;
