import { cn } from "@/lib/utils";
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

interface KPIDataPoint {
  label: string;
  value: number;
}

interface AverageKpiGraphProps {
  title?: string;
  data: KPIDataPoint[];
  className?: string;
}

const AverageKpiGraph: React.FC<AverageKpiGraphProps> = ({
  title,
  data,
  className,
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const average = (total / data.length).toFixed(2);

  const currentMonth = data[data.length - 1].value;
  const previousMonth = data[data.length - 2].value;

  const percentChange = (
    ((currentMonth - previousMonth) / previousMonth) *
    100
  ).toFixed(1);
  const trend = currentMonth > previousMonth ? "increase" : "decrease";
  const icon =
    currentMonth > previousMonth ? <MdArrowUpward /> : <MdArrowDownward />;
  return (
    <div
      className={`rounded-3xl w-full h-full bg-gray-soft shadow p-2 ${
        className || ""
      }`}
    >
      <div className="flex items-center justify-between mb-2 px-1.5 max-sm:flex-col">
        {title && (
          <div className="flex items-center gap-4 max-lg:gap-2">
            <span className="text-xl max-lg:text-lg text-charcoal font-medium capitalize mt-1">
              {title}
            </span>
            <span className="text-3xl font-bold text-charcoal">{average}%</span>
          </div>
        )}
        {trend && (
          <div
            className={cn(
              "bg-gray-dark my-2 flex items-center rounded-4xl px-2 py-1 mr-4 max-lg:mr-0",
              !title && "ml-10 max-sm:ml-0"
            )}
          >
            {icon}
            <p className="text-sm text-charcoal">
              <span className="text-base font-semibold">{percentChange}%</span>
              {` ${trend} since last month`}
            </p>
          </div>
        )}
      </div>
      <div className="w-full h-56 bg-transparent">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, left: -20 }}
            barCategoryGap={6}
          >
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              tickFormatter={(value) => `${value}%`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Bar dataKey="value" fill="#BBBBBB" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AverageKpiGraph;
