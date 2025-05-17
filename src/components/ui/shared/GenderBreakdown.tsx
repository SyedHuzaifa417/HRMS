import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface GenderDataPoint {
  label: string;
  value: number;
}

interface GenderBreakdownProps {
  title: string;
  data: GenderDataPoint[];
  className?: string;
}

const GenderBreakdown: React.FC<GenderBreakdownProps> = ({
  title,
  data,
  className,
}) => {
  return (
    <div
      className={`rounded-3xl w-full h-full bg-gray-soft shadow p-2 ${
        className || ""
      }`}
    >
      <div className="text-center text-xl font-semibold mt-2">{title}</div>

      <div className="w-full h-56 bg-transparent">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, left: -30, right: 10 }}
            barCategoryGap={25}
          >
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis
              domain={[0, 10]}
              ticks={[0, 2, 4, 6, 8, 10]}
              tickFormatter={(value) => `${value}%`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              <Cell fill="#454545" />
              <Cell fill="#7D7D7D" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GenderBreakdown;
