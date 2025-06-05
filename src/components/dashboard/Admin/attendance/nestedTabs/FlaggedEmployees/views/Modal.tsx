import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Attendance } from "../../..";
import ResponsiveModal from "@/components/ui/shared/ResponsiveModal";

interface WarningFormData {
  subject: string;
  to: string;
  cc: string;
  date: string;
  message: string;
}

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Attendance | null;
  onSendWarning: (employee: Attendance, formData: WarningFormData) => void;
}

const WarningModal: React.FC<WarningModalProps> = ({
  isOpen,
  onClose,
  employee,
  onSendWarning,
}) => {
  const [preview, setPreview] = useState(false);
  const [warningForm, setWarningForm] = useState<WarningFormData>({
    subject: "Incomplete Attendance Log",
    to: "",
    cc: "",
    date: new Date().toISOString().split("T")[0],
    message: ``,
  });

  useEffect(() => {
    if (employee) {
      setWarningForm((prev) => ({
        ...prev,
        to: employee.name.toLowerCase().replace(" ", "_"),
        message: `Dear ${employee.name},


        

Regards,
ABC, Manager
Devsort Services`,
      }));
    }
  }, [employee]);

  const handleSendWarning = () => {
    if (employee) {
      onSendWarning(employee, warningForm);
      handleClose();
    }
  };

  const handlePreview = () => {
    setPreview((prev) => !prev);
  };

  const handleClose = () => {
    onClose();
    setWarningForm({
      subject: "Incomplete Attendance Log",
      to: "",
      cc: "",
      date: new Date().toISOString().split("T")[0],
      message: ``,
    });
  };

  const modalFooter = (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      <Button
        variant="outline"
        onClick={handlePreview}
        className="flex-1 bg-[#AAA9A9] text-charcoal hover:bg-gray-soft rounded-sm !py-1 text-lg font-normal"
      >
        Preview
      </Button>
      <Button
        onClick={handleSendWarning}
        className="flex-1 bg-[#323232] text-white hover:bg-gray-800  rounded-sm !py-1 text-lg font-normal "
      >
        Send
      </Button>
    </div>
  );

  return (
    <ResponsiveModal
      open={isOpen}
      onOpenChange={handleClose}
      title={" "}
      description="  "
      className="sm:max-w-[600px]"
      footer={modalFooter}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="space-y-2 w-full">
            <Label
              htmlFor="subject"
              className="text-lg text-charcoal font-light ml-2"
            >
              Subject
            </Label>
            <Input
              id="subject"
              value={warningForm.subject}
              onChange={(e) =>
                setWarningForm((prev) => ({ ...prev, subject: e.target.value }))
              }
              placeholder="Warning subject"
              disabled={preview}
              className="bg-gray-soft p-0 shadow-none text-xs border border-muted-foreground rounded-md px-2"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date" className="text-lg text-charcoal font-light ml-2">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={warningForm.date}
              onChange={(e) =>
                setWarningForm((prev) => ({ ...prev, date: e.target.value }))
              }
              disabled={preview}
              className="bg-gray-soft p-0 shadow-none text-xs border border-muted-foreground rounded-md px-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="to" className="text-lg text-charcoal font-light ml-2">
              To
            </Label>
            <Input
              id="to"
              value={warningForm.to}
              onChange={(e) =>
                setWarningForm((prev) => ({ ...prev, to: e.target.value }))
              }
              placeholder="Employee Name"
              disabled={preview}
              className="bg-gray-soft p-0 shadow-none text-xs border border-muted-foreground rounded-md px-2"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cc" className="text-lg text-charcoal font-light ml-2">
              CC
            </Label>
            <Input
              id="cc"
              value={warningForm.cc}
              onChange={(e) =>
                setWarningForm((prev) => ({ ...prev, cc: e.target.value }))
              }
              placeholder="team_lead"
              disabled={preview}
              className="bg-gray-soft p-0 shadow-none text-xs border border-muted-foreground rounded-md px-2"
            />
          </div>
        </div>

        <Textarea
          id="message"
          value={warningForm.message}
          onChange={(e) =>
            setWarningForm((prev) => ({ ...prev, message: e.target.value }))
          }
          placeholder="Warning message"
          className="h-96 max-sm:h-64 resize-none overflow-auto scrollbar-hide border border-muted-foreground"
          disabled={preview}
        />
      </div>
    </ResponsiveModal>
  );
};

export default WarningModal;
