import React from "react";
import { LeaveRequest } from "../../tempData";
import moment from "moment";
import ResponsiveModal from "@/components/ui/shared/ResponsiveModal";

interface LeaveApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  leaveRequest?: LeaveRequest;
  employeeName?: string;
}

const LeaveApplicationModal: React.FC<LeaveApplicationModalProps> = ({
  isOpen,
  onClose,
  leaveRequest,
  employeeName,
}) => {
  if (!leaveRequest) return null;

  return (
    <ResponsiveModal
      open={isOpen}
      onOpenChange={onClose}
      title={`Leave Application - ${employeeName}`}
    >
      <div className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">From</p>
            <p className="text-sm">
              {moment(leaveRequest.from).format("Do MMM YYYY")}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">To</p>
            <p className="text-sm">
              {moment(leaveRequest.to).format("Do MMM YYYY")}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Type</p>
            <p className="text-sm capitalize">{leaveRequest.reason}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Status</p>
            <p className="text-sm capitalize">{leaveRequest.status}</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Application</p>
          <div className="p-3 bg-gray-100 rounded-md mt-1">
            <p className="text-sm whitespace-pre-line">
              {leaveRequest.application}
            </p>
          </div>
        </div>
      </div>
    </ResponsiveModal>
  );
};

export default LeaveApplicationModal;
