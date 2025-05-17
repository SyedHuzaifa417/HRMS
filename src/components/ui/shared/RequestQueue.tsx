import Image from "next/image";
import React from "react";
import { BiSolidEdit } from "react-icons/bi";
import { CgGirl } from "react-icons/cg";
import { MdKeyboardArrowRight } from "react-icons/md";

interface Request {
  name: string;
  department?: string;
  message: string;
  avatar?: string;
}

interface RequestQueueProps {
  title: string;
  requests: Request[];
  className?: string;
  arrow?: boolean;
  editIcon?: boolean;
}

const truncateMessage = (message: string) => {
  const words = message.split(" ");
  return words.length > 20 ? words.slice(0, 20).join(" ") + "..." : message;
};

const RequestQueue: React.FC<RequestQueueProps> = ({
  title,
  requests,
  arrow,
  editIcon,
  className,
}) => (
  <div
    className={`rounded-3xl bg-gray-soft p-2 w-full h-full ${className || ""}`}
  >
    <div className="flex items-center justify-between p-2">
      <div className="text-center text-xl font-semibold">{title}</div>
      {editIcon && <BiSolidEdit className="size-5 cursor-pointer" />}
    </div>
    <div className="flex flex-col gap-y-4 h-56 justify-center">
      {requests.slice(0, 2).map((req, idx) => (
        <div
          key={idx}
          className="flex items-center bg-[#AFAFAF] rounded-full p-2 justify-between"
        >
          <div className="flex items-center gap-1.5">
            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center">
              {req.avatar ? (
                <div className="w-11 h-11 flex items-center justify-center overflow-hidden">
                  <Image
                    src={req.avatar}
                    alt="user"
                    width={40}
                    height={40}
                    className="rounded-full object-cover w-full h-full"
                  />
                </div>
              ) : (
                <CgGirl size={48} />
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="text-charcoal text-xs flex flex-col items-start w-[84px] truncate">
                <span> {req.name}</span>
                {req.department && <span>{req.department}</span>}
              </div>
              <div className="text-xs text-charcoal line-clamp-2 w-fit">
                {truncateMessage(req.message)}
              </div>
            </div>
          </div>
          {arrow && (
            <MdKeyboardArrowRight className="w-5 h-5 justify-self-end" />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default RequestQueue;
