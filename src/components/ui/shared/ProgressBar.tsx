import { cn } from "@/lib/utils";
import React from "react";

interface ProjectProgressProps {
  percentage: number;
  label: string;
  className?: string;
}

const ProjectProgress = ({
  percentage,
  className,
  label,
}: ProjectProgressProps) => {
  return (
    <div
      className={cn(
        "bg-[#F7F7F7] rounded-xl h-20 flex items-center relative overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "absolute left-5 z-20 text-charcoal text-lg flex items-center",
          percentage <= 10 && "  left-3",
          (percentage > 65 || percentage < 6) && "left-25"
        )}
      >
        <span>{percentage}%</span>
        <span
          className={cn(
            percentage >= 65
              ? " ml-35 block max-w-24 capitalize text-base  break-words z-20 text-charcoal"
              : "hidden",
            percentage >= 75 && "ml-20"
          )}
        >
          {label}
        </span>
      </div>

      <div
        className={cn(
          "absolute right-0 top-0 z-10 h-full rounded-xl bg-[#BBBBBB] flex items-center justify-center transition-[width] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
        )}
        style={{
          width: `${100 - percentage}%`,
        }}
      >
        <span
          className={cn(
            "w-full text-center text-charcoal text-lg z-20",
            percentage > 65 ? "hidden" : "block"
          )}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export default ProjectProgress;
