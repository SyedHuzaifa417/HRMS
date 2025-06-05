import React from "react";
import {
  breakdown,
  companyExpense,
  formatCurrency,
  payrollSummary,
  requests,
} from "../utils/utils";
import ScheduleCard from "@/components/ui/shared/ScheduleCard";
import { ArrowDown, ArrowUp } from "lucide-react";
import PayrollProgressBar from "./ProgressBar";

interface PayrollBreakdown {
  month: string;
  workingDays: number;
  totalHours: number;
  totalExpense: number;
  baseSalary: number;
  nextPayday: {
    type: string;
    date: string;
  }[];
  overtime: number;
  other: number;
}

interface MetricData {
  month: string;
  amount: number;
  changePercentage: number;
  isIncrease: boolean;
}

const MetricCard: React.FC<{ data: MetricData }> = ({ data }) => {
  return (
    <div
      className={`bg-gray-soft rounded-2xl p-6 flex flex-col gap-5 h-44 justify-center`}
    >
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold text-charcoal flex items-center gap-2">
          {data.month}
          <span>{new Date().getFullYear()} </span>
        </div>
        <div className="text-sm font-light">Current Month</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold text-charcoal">
          {formatCurrency(data.amount)}
        </div>
        <div className="flex items-center gap-0.5 text-sm font-medium text-charcoal px-2 py-0.5 rounded-full bg-[#afafaf]">
          {data.isIncrease ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          {`${data.changePercentage}%`}
        </div>
      </div>
    </div>
  );
};

const BreakdownCard: React.FC<{ data: PayrollBreakdown }> = ({ data }) => {
  return (
    <div className="bg-gray-soft h-full rounded-3xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-4 text-xl text-charcoal max-xl:text-lg max-xl:space-y-2 max-lg:text-xl">
          <div>
            <div className="mb-4 max-xl:mb-1.5">{data.month}</div>
            <div className="mb-2 max-xl:mb-1">
              {data.workingDays} working days
            </div>
            <div>{data.totalHours} hours</div>
          </div>

          <div>
            <div className=" mb-1">
              Total Expense: {formatCurrency(data.totalExpense)}
            </div>
            <div>Base Salary: {formatCurrency(data.baseSalary)}</div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8 text-xl max-xl:text-lg text-charcoal max-xl:space-y-4 max-lg:text-xl">
          <div>
            <div className="mb-1">Next Payday:</div>
            <div>
              {data.nextPayday[0].type} {data.nextPayday[0].date} | Monthly{" "}
              {data.nextPayday[1].date}
            </div>
          </div>

          <div>
            <div className="mb-1">
              Overtime: {formatCurrency(data.overtime)}
            </div>
            <div>Other: {formatCurrency(data.other)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PayRollTopCards = () => {
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  return (
    <>
      <div className="grid grid-cols-[1fr_1fr_479px] max-xl:grid-cols-2 max-sm:grid-cols-1 gap-3 mb-6">
        <div className="flex flex-col gap-5 w-full">
          <h2 className="text-xl font-semibold text-charcoal underline">
            Monthly Pay Roll
          </h2>
          <MetricCard
            data={
                payrollSummary.find((item) => item.month === currentMonth) ||
                payrollSummary[payrollSummary.length - 1]
              }
          />
        </div>
        <div className="flex flex-col gap-5 w-full">
          <h2 className="text-xl font-semibold text-charcoal underline">
            Monthly Company Expense
          </h2>
          <MetricCard
           data={
            companyExpense.find((item) => item.month === currentMonth) ||
            companyExpense[companyExpense.length - 1]
          }
           
          />
        </div>
        <div className="max-xl:col-span-2 max-sm:col-span-1">
        <PayrollProgressBar/>
      </div>
      </div>
      <div className="grid grid-cols-[1fr_518px] max-xl:grid-cols-[1fr_400px] gap-x-5 max-lg:grid-cols-1 max-lg:gap-y-5 max-lg:gap-x-0 mb-4">
        <div className="flex flex-col gap-5 w-full">
          <h2 className="text-xl font-semibold text-charcoal underline">
            Breakdown
          </h2>
          <BreakdownCard data={breakdown} />
        </div>

        <div className="flex flex-col gap-5 w-full">
          <h2 className="text-xl font-semibold text-charcoal underline">
            Requests
          </h2>
          <ScheduleCard
            icon
            items={requests}
            buttonTitle="View Request"
            linkToMore="view more requests"
            className="flex flex-col items-center justify-center gap-1 w-full h-[267px] max-sm:h-max max-xl:h-[320px] max-lg:h-[267px]"
            gridClassName="w-full"
            cellClassName="h-20 w-full max-sm:flex-col max-sm:h-max max-sm:gap-2 "
          />
        </div>
      </div>
    </>
  );
};

export default PayRollTopCards;
