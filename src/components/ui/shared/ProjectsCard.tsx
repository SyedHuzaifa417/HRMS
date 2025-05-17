import { cn } from "@/lib/utils";
import React from "react";
import { GoArrowUpRight } from "react-icons/go";

interface ProjectsCardProps {
  title: string;
  value?: string | number;
  arrow?: boolean;
  className?: string;
}

const ProjectsCard: React.FC<ProjectsCardProps> = ({
  title,
  value,
  arrow,
  className,
}) => (
  <div
    className={cn(
      "rounded-xl bg-gray-dark px-4 w-full h-24 py-2 flex justify-between",
      className
    )}
  >
    <div className="flex flex-col gap-4">
      <div className="text-sm font-medium text-charcoal">{title}</div>
      <div className="text-xl text-charcoal">{value}</div>
    </div>
    {arrow && <GoArrowUpRight size={26} />}
  </div>
);

export default ProjectsCard;
