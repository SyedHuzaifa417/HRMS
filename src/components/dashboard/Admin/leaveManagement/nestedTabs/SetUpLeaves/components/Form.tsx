import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { LeaveData } from "..";

interface LeaveFormProps {
  editingLeave: LeaveData | null;
  onSave: (data: Omit<LeaveData, "id">) => void;
  onCancel: () => void;
}

export const LeaveForm: React.FC<LeaveFormProps> = ({
  editingLeave,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    allowancePerYear: "",
    employeeType: "",
    employeeLevel: "",
  });

  useEffect(() => {
    if (editingLeave) {
      setFormData({
        name: editingLeave.name,
        allowancePerYear: editingLeave.allowancePerYear,
        employeeType: editingLeave.employeeType,
        employeeLevel: editingLeave.employeeLevel,
      });
    } else {
      setFormData({
        name: "",
        allowancePerYear: "",
        employeeType: "",
        employeeLevel: "",
      });
    }
  }, [editingLeave]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (editingLeave) {
      console.log("Editing leave:", {
        id: editingLeave.id,
        ...formData,
      });
    } else {
      console.log("Creating new leave:", formData);
    }

    onSave(formData);
  };

  const isFormValid =
    formData.name &&
    formData.allowancePerYear &&
    formData.employeeType &&
    formData.employeeLevel;

  return (
    <Card className="border border-charcoal gap-2">
      <CardHeader>
        <CardTitle className="text-charcoal text-3xl font-semibold my-3 max-sm:text-xl">
          {editingLeave ? `Edit ${editingLeave.name}` : "Set up a new leave"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-2 max-sm:flex-col max-sm:items-start">
            <Label htmlFor="name" className="text-xl font-normal">
              Name
            </Label>
            <Input
              id="name"
              placeholder="e.g annual sick leaves"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            className="w-5/6 max-xl:w-4/6 max-lg:w-3/5 max-sm:w-full border border-charcoal outline-none"
            />
          </div>

           <div className="flex items-center justify-between gap-2 max-sm:flex-col max-sm:items-start">
            <Label htmlFor="allowance" className="text-xl font-normal">
              Allowance per year
            </Label>
            <Input
              id="allowance"
              placeholder="e.g 15"
              value={formData.allowancePerYear}
              onChange={(e) =>
                handleInputChange("allowancePerYear", e.target.value)
              }
             className="w-5/6 max-xl:w-4/6 max-lg:w-3/5 max-sm:w-full border border-charcoal outline-none"
            />
          </div>

           <div className="flex items-center justify-between gap-2 max-sm:flex-col max-sm:items-start">
            <Label htmlFor="employeeType" className="text-xl font-normal">
              Employee Type
            </Label>
            <Input
              id="employeeType"
              placeholder="e.g Full-time, Part-time etc"
              value={formData.employeeType}
              onChange={(e) =>
                handleInputChange("employeeType", e.target.value)
              }
            className="w-5/6 max-xl:w-4/6 max-lg:w-3/5 max-sm:w-full border border-charcoal outline-none"
            />
          </div>

          <div className="flex items-center justify-between gap-2 max-sm:flex-col max-sm:items-start">
            <Label htmlFor="employeeLevel" className="text-xl font-normal">
              Employee Level
            </Label>
            <Input
              id="employeeLevel"
              placeholder="e.g Management, executive etc"
              value={formData.employeeLevel}
              onChange={(e) =>
                handleInputChange("employeeLevel", e.target.value)
              }
               className="w-5/6 max-xl:w-4/6 max-lg:w-3/5 max-sm:w-full border border-charcoal outline-none"
            />
          </div>

          <div className="flex gap-3 pt-4 justify-end max-sm:flex-col ">
            <Button
            variant={"ghost"}
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="bg-gray-dark hover:bg-gray-soft px-12 text-charcoal text-lg font-normal"
            >
              Save
            </Button>
            {editingLeave && (
              <Button variant="outline" onClick={onCancel} className="bg-gray-soft hover:bg-gray-dark px-12 text-charcoal text-lg font-normal">
                Cancel
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
