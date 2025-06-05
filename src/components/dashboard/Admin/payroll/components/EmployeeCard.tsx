import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tempPayrollData, months, formatCurrency } from "../utils/utils";
import { CgGirl } from "react-icons/cg";
import { cn } from "@/lib/utils";

const EmployeeCard = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("November");

  const filteredPayrollData = tempPayrollData.filter(
    (payroll) => payroll.month === selectedMonth
  );

  const onMonthChange = (value: string) => {
    setSelectedMonth(value);
  };


  return (
    <>
      

      <div className="flex flex-col gap-5 w-full">
        <div className="flex items-center justify-between ">
          <div className="font-medium text-charcoal border-b-2 border-charcoal text-2xl">
            Recent
          </div>
          <Select value={selectedMonth} onValueChange={onMonthChange}>
            <SelectTrigger className="w-auto py-6 bg-black text-white rounded-full text-base [&>svg]:text-white [&>svg]:size-5 [&>svg]:ml-3 [&>svg]:opacity-100 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:border-white cursor-pointer focus:ring-0 outline-none">
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

        <div className="space-y-3">
          {filteredPayrollData.length > 0 ? (
            filteredPayrollData.map((payrollData, index) => (
              <div
                key={payrollData.id}
                className={cn(
                  "rounded-full p-2 flex items-center gap-4 max-xl:rounded-xl max-xl:flex-col max-xl:gap-5",
                  index % 2 === 0 ? "bg-[#afafaf]" : "bg-[#d2d2d2]"
                )}
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center">
                  <CgGirl className="w-full h-full text-charcoal" />
                </div>
                <div className="flex flex-wrap items-start justify-around w-full gap-4 max-xl:justify-between max-xl:p-3">
                  <div className="flex flex-col  text-charcoal w-36">
                    <span>{payrollData.userInfo.name}</span>
                    <span>{payrollData.userInfo.designation}</span>
                  </div>
                  <div className="flex flex-col min-w-[120px]">
                    <span>Salary: </span>
                    {formatCurrency(payrollData.salary)}
                  </div>
                  <div className="flex flex-col min-w-[120px]">
                    <span>Emp/Deductions: </span>
                    {formatCurrency(payrollData.deductions)}
                  </div>
                  <div className="flex flex-col min-w-[120px]">
                    <span>Total: </span>
                    {formatCurrency(payrollData.total)}
                  </div>
                  <div className="flex flex-col min-w-[120px]">
                    <span>Status: </span>
                    {payrollData.status}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No payroll data found for {selectedMonth}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployeeCard;
