import React from "react";
import { months } from "../utils/utils";
import { cn } from "@/lib/utils";

const PayrollProgressBar = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();

  const currentMonthName = months[currentMonth];
  const nextMonthName = months[(currentMonth + 1) % 12];

  const progressValue = (currentDay / 30) * 100;

  return (
    <div className="flex flex-col gap-5 w-full h-full">
      <h2 className="text-xl font-semibold text-charcoal underline">
        Payroll Period Breakdown
      </h2>
      <div className="w-full h-44 bg-gray-soft rounded-2xl p-6 flex flex-col justify-start gap-4">
       
       <div className="flex items-center justify-between">
          <div className="text-lg font-medium text-charcoal">
            {currentMonthName} (Current Month)
          </div>
          <div className="text-lg font-medium text-charcoal mr-2">
            {nextMonthName}
          </div>
          </div>

        <div className="relative mb-4 h-12 flex items-center gap-2">
          <div
            className={cn(
              "bg-[#F7F7F7] rounded-4xl h-14 w-4/5 flex items-center relative overflow-hidden"
            )}
          >
            <div
              className={cn(
                "absolute left-0 top-0 z-10 h-full rounded-lg bg-[#BBBBBB] flex items-center justify-center transition-[width] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
              )}
              style={{
                width: `${progressValue}%`,
              }}
            />
            <div className="absolute right-1/2 -bottom-0 z-10 h-full flex flex-col gap-0 items-center justify-center transition-[width] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] text-[8px] text-center">
              Upcoming
              <br />
              Biweekly payday
              <span className="text-xs font-semibold">
                17 {currentMonthName.slice(0, 3)}
              </span>
            </div>
            <div className="absolute right-6 -bottom-0 z-10 h-full flex flex-col gap-0 items-center justify-center transition-[width] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] text-[8px] text-center">
              Monthly
              <br />
              Payday
              <span className="text-xs font-semibold">
                30 {currentMonthName.slice(0, 3)}
              </span> {" "}
            </div>
          </div>
          <div
            className="absolute left-0 -bottom-11 z-10 h-full flex items-center justify-between transition-[width] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] text-xs"
            style={{
              width: `${progressValue - 3}%`,
            }}
          >
            <span className={cn(progressValue <= 50 ? "invisible" : "")}>
              1st {currentMonthName.slice(0, 3)}
            </span>
            <span className="relative flex flex-col items-center mt-1 break-words max-w-2">
              <span className="w-0.5 h-6 bg-black mb-0" />
              Today {currentDay} {currentMonthName.slice(0, 3)}
            </span>
          </div>
          <div
          className={cn(
              "bg-[#F7F7F7] rounded-4xl h-14 flex-1 flex items-center relative overflow-hidden"
            )}
          >
          
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default PayrollProgressBar;
