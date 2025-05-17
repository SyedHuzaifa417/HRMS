import { cn } from "@/lib/utils";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";

interface MetricCardProps {
  title: string;
  value?: string | number;
  icon?: React.ReactNode;
  arrow?: boolean;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  arrow,
  icon,
  className,
}) => (
  <div
    className={cn(
      "rounded-3xl bg-gray-soft px-4 w-[150px] h-[150px] py-4 flex flex-col justify-center gap-5 max-sm:w-full",
      className
    )}
  >
    {arrow && (
      <div className="flex justify-end">
        <GoArrowUpRight size={26} />
      </div>
    )}
    <div className="flex flex-col gap-3">
      <div className="flex items-end gap-8 justify-between">
        <div className="text-charcoal ">{icon}</div>
        <div className="text-lg text-charcoal pr-3">{value}</div>
      </div>
      <div className="text-xs text-charcoal max-w-4/5">{title}</div>
    </div>
  </div>
);

export default MetricCard;
