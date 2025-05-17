import { cn } from "@/lib/utils";
import React from "react";
import { CgGirl } from "react-icons/cg";

interface ScheduleItem {
  title: string;
  desc1: string;
  desc2: string;
}

interface ScheduleCardProps {
  title: string;
  items: ScheduleItem[];
  icon?: boolean;
  className?: string;
  cellClassName?: string;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  title,
  items,
  icon,
  className,
  cellClassName,
}) => (
  <div className={cn("rounded-3xl bg-gray-soft w-full h-full p-4 ", className)}>
    <div className=" text-xl font-semibold mt-2">{title}</div>
    <div
      className={cn(
        "flex flex-col gap-3 justify-center max-h-96 pt-2",
        cellClassName
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className={cn(
            "flex items-center gap-3 bg-gray-lite rounded-lg p-2 h-28"
          )}
        >
          {icon && (
            <div className="bg-white rounded-full size-16 border border-black flex items-center justify-center">
              <CgGirl className="size-16" />
            </div>
          )}
          <div className="flex-1 max-w-36 max-lg:max-w-24">
            <div className="font-semibold text-charcoal text-base line-clamp-2 ">
              {item.title}
            </div>
            <div className="text-sm text-charcoal truncate">{item.desc1}</div>
            <div className="text-sm text-charcoal truncate">{item.desc2}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ScheduleCard;
