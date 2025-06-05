import { cn } from "@/lib/utils";
import React from "react";
import { CgGirl } from "react-icons/cg";
import { Button } from "../button";

interface ScheduleItem {
  title: string;
  desc1: string;
  desc2: string;
}

interface ScheduleCardProps {
  title?: string;
  items: ScheduleItem[];
  icon?: boolean;
  className?: string;
  cellClassName?: string;
  gridClassName?: string;
  buttonTitle?: string;
  linkToMore?:string
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
  title,
  items,
  icon,
  className,
  cellClassName,
  gridClassName,
  buttonTitle,
  linkToMore
}) => (
  <div className={cn("rounded-3xl bg-gray-soft w-full h-full p-4 ", className)}>
    {title && <div className=" text-xl font-semibold mt-2">{title}</div>}
    <div
      className={cn(
        "flex flex-col gap-3 justify-center max-h-96 pt-2",
        gridClassName
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className={cn("flex items-center justify-between bg-gray-lite rounded-lg p-2 h-28", cellClassName)}
        >
          <div className="flex items-center gap-3">
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

          {buttonTitle && (
            <Button
              variant={"ghost"}
              className="bg-[#585757] hover:bg-gray-dark px-5 text-sm text-white rounded-4xl mr-2 cursor-pointer"
            >
              {buttonTitle}
            </Button>
          )}
        </div>
      ))}
    </div>
    {linkToMore && (
      <Button
        variant={"ghost"}
        className="text-sm text-chrcoal cursor-pointer hover:bg-transparent underline"
      >
        {linkToMore}
      </Button>
    )}
  </div>
);

export default ScheduleCard;
