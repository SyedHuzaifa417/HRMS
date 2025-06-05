import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { tempPayrollData } from "./tempData";
import { CgGirl } from "react-icons/cg";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";

export const Payroll = () => {
  const months = Object.keys(tempPayrollData);
  const [selectedMonth, setSelectedMonth] = useState<string>(months[0]);
  const summaryCards = tempPayrollData[selectedMonth];

  const onMonthChange = (value: string) => {
    setSelectedMonth(value);
  };

  const total = summaryCards[0].incomeChart.data.reduce(
    (sum, item) => sum + item.value,
    0
  );
  const average = (
    total /
    summaryCards[0].incomeChart.data.length /
    100
  ).toFixed(2);

  const currentMonth =
    summaryCards[0].incomeChart.data[
      summaryCards[0].incomeChart.data.length - 1
    ].value;
  const previousMonth =
    summaryCards[0].incomeChart.data[
      summaryCards[0].incomeChart.data.length - 2
    ].value;

  const percentChange = (
    ((currentMonth - previousMonth) / previousMonth) *
    100
  ).toFixed(1);
  const trend = currentMonth > previousMonth ? "increase" : "decrease";
  const icon =
    currentMonth > previousMonth ? (
      <MdArrowUpward className="size-4" />
    ) : (
      <MdArrowDownward className="size-4" />
    );

  const maxValue = Math.max(
    ...summaryCards[0].incomeChart.data.map((item) => item.value)
  );

  const dataWithPercentages = summaryCards[0].incomeChart.data.map((item) => ({
    ...item,
    percentage: (item.value / maxValue) * 100,
  }));

  const formatCurrency = (amount: number): string => {
    return `Rs. ${amount.toLocaleString()}`;
  };

  return (
    <>
      {/* Header section */}
      <div className="flex items-center justify-between my-4 max-sm:flex-col gap-4">
        <h1 className="text-3xl font-medium text-charcoal">Payroll</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => {}}
            className="px-4 py-2 bg-gray-dark rounded-4xl text-base font-normal hover:bg-gray-soft transition-colors cursor-pointer"
            variant={"ghost"}
          >
            View History
          </Button>
          <Button
            onClick={() => {}}
            className="px-4 py-2 bg-gray-dark rounded-4xl text-base font-normal hover:bg-gray-soft transition-colors cursor-pointer"
            variant={"ghost"}
          >
            Download Payslip
          </Button>
        </div>
      </div>

      <div className="flex justify-between max-xl:flex-col gap-4">
        {/* Navigation and Month Selector */}
        <div className="flex flex-col gap-5 w-full">
          <div className="flex items-center justify-between ">
            <div className="font-medium text-charcoal border-b-2 border-charcoal text-2xl">
              Recent
            </div>
            <Select value={selectedMonth} onValueChange={onMonthChange}>
              <SelectTrigger className="w-auto py-6 bg-black text-white rounded-full text-base [&>svg]:text-white [&>svg]:size-5 [&>svg]:ml-3 [&>svg]:opacity-100 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:border-white">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Summary Cards for selected month */}
          {summaryCards.map((payrollData, idx) => (
            <div
              key={idx}
              className="bg-[#AFAFAF] rounded-full p-2 mb-4 flex items-center gap-2 max-xl:rounded-xl max-xl:flex-col max-xl:gap-5"
            >
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center">
                <CgGirl className="w-full h-full text-charcoal" />
              </div>
              <div className="flex flex-wrap items-start justify-between gap-4 max-xl:justify-between max-xl:p-3">
                <div className="flex flex-col text-sm text-charcoal items-start w-36">
                  <span>{payrollData.userInfo.name}</span>
                  <span>{payrollData.userInfo.designation}</span>
                </div>
                <div className="flex flex-col min-w-[120px]">
                  <span>Salary: </span>
                  {formatCurrency(payrollData.summary.salary)}
                </div>
                <div className="flex flex-col min-w-[120px]">
                  <span>Emp/Deductions: </span>
                  {formatCurrency(payrollData.summary.deductions)}
                </div>
                <div className="flex flex-col min-w-[120px]">
                  <span>Total: </span>
                  {formatCurrency(payrollData.summary.total)}
                </div>
                <div className="flex flex-col min-w-[120px]">
                  <span>Status: </span>
                  {payrollData.summary.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard Content (only for the first summary card) */}
        <div className="flex flex-col min-w-[350px] max-xl:flex-row max-lg:flex-col mt-6 max-xl:mt-0 gap-5 max-xl:min-w-full">
          <div className=" max-xl:w-full flex flex-col gap-4">
            <span className="inline-block w-max font-medium text-charcoal border-b-2 border-charcoal text-2xl">
              Breakdown
            </span>
            <div className="bg-gray-soft h-full rounded-xl text-xl text-charcoal p-5 leading-6 flex flex-col gap-5">
              <div className="space-y-2">
                <h2>{summaryCards[0].breakdown.month}</h2>
                <p>
                  {summaryCards[0].breakdown.workingDays} working days ·
                  {summaryCards[0].breakdown.workingHours} hours
                </p>
              </div>
              <div className="space-y-2">
                <p>Next Payday:</p>
                <p>
                  {summaryCards[0].breakdown.nextPayday.day},
                  {summaryCards[0].breakdown.nextPayday.date}
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  Total Expense:
                  {formatCurrency(summaryCards[0].breakdown.expenses.total)}
                </p>
                <p>
                  Base Salary:
                  {formatCurrency(
                    summaryCards[0].breakdown.expenses.baseSalary
                  )}
                </p>
                <p>
                  Overtime:
                  {formatCurrency(summaryCards[0].breakdown.expenses.overtime)}
                </p>
                <p>
                  Other:{" "}
                  {formatCurrency(summaryCards[0].breakdown.expenses.other)}
                </p>
              </div>
            </div>
          </div>

          <div className=" max-xl:w-full flex flex-col gap-4">
            <span className="inline-block w-max font-medium text-charcoal border-b-2 border-charcoal text-2xl">
              This Months Income Chart
            </span>
            <div className="bg-gray-soft h-full rounded-xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xl font-bold">{average}%</div>
                <div className="text-xs bg-gray-dark px-2 py-1 rounded-full flex items-center">
                  {icon}
                  <p className="text-sm text-charcoal">
                    <span className="text-base font-semibold">
                      {percentChange}%
                    </span>
                    {` ${trend} since last month`}
                  </p>
                </div>
              </div>
              <div className="w-full h-64 bg-transparent">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dataWithPercentages}
                    margin={{ top: 5, left: -20 }}
                    barCategoryGap={0}
                  >
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      padding={{ left: 20, right: 20 }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      ticks={[0, 20, 40, 60, 80, 100]}
                      tickFormatter={(value) => `${value}%`}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value, name) => {
                        if (name === "percentage") {
                          return [`${value}%`, "Percentage"];
                        }
                        return [`${value}`, "Value"];
                      }}
                    />
                    <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
                      {summaryCards[0].incomeChart.data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index % 2 === 0 ? "#9D9D9D" : "#BBBBBB"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payroll;
