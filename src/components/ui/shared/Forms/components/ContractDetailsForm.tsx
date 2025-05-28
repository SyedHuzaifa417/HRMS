import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ContractDetailsFormProps,
  EmployeeFormData,
} from "../types/types";
import {
  TextField,
  FileField,
  CalendarField,
} from "./FormField";

export const ContractDetailsForm: React.FC<ContractDetailsFormProps> = ({
  editButton,
  onEdit,
  mode,
  defaultValues = {},
  onSubmit,
  readOnly = false,
  hideSubmitButton = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm<EmployeeFormData>({
    defaultValues,
    mode: "onBlur",
  });
  
  // Checkbox group for employment type
  const employmentTypes = ["Full-time", "Part-time", "Remote"];
  
  return (
    <form
      id="contract-form"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full grid grid-cols-2 max-sm:grid-cols-1 gap-5"
    >
      <div className="col-span-2 max-sm:col-span-1 flex justify-between items-center mb-2 p-3">
        <h2 className="text-3xl font-semibold">Contract Details</h2>
        {editButton && (
          <Button
            type="button"
            variant="secondary"
            onClick={onEdit}
            className="rounded-4xl bg-gray-dark px-6 text-sm font-normal hover:bg-muted-foreground hover:text-gray-lite"
          >
            Edit
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-5 max-sm:col-span-2">
        <span className="text-2xl font-medium">Employment Type</span>
        <div className="flex gap-4">
          {employmentTypes.map((type) => (
            <label
              key={type}
              className="flex items-center bg-gray-soft disabled:bg-[#ececec] justify-evenly h-16 rounded-md w-full"
            >
              <span>{type}</span>
              <Controller
                name="employmentType"
                control={control}
                render={({ field }) => (
                  <Checkbox
                  checked={Array.isArray(field.value) ? field.value.includes(type) : field.value === type}
                    onCheckedChange={(checked) => {
                      if (readOnly) return;
                      if (checked) {
                        field.onChange(type);
                      }
                    }}
                    disabled={readOnly}
                  />
                )}
              />
            </label>
          ))}
        </div>
        {errors.employmentType && (
          <span className="text-xs text-red-500">
            {String(errors.employmentType.message)}
          </span>
        )}
        <div>
          <TextField
            id="designation"
            label="Designation"
            placeholder="Designation"
            register={register("designation", {
              required: "Designation is required",
            })}
            error={errors.designation?.message}
            readOnly={readOnly}
          />
        </div>
        <div>
          <TextField
            id="department"
            label="Department"
            placeholder="Department"
            register={register("department", {
              required: "Department is required",
            })}
            error={errors.department?.message}
            readOnly={readOnly}
          />
        </div>
        <div>
        <CalendarField
            id="from"
            label="From"
            value={watch("from") ||""}
            onValueChange={(val: string) => setValue("from", val)}
            placeholder="From"
            error={errors.from?.message}
            readOnly={readOnly}
          />
        </div>
        <div>
        <CalendarField
            id="to"
            label="To"
            value={watch("to") ||""}
            onValueChange={(val: string) => setValue("to", val)}
            placeholder="To"
            error={errors.to?.message}
            readOnly={readOnly}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 max-sm:col-span-2 mt-7">
        <div>
          <FileField
            id="contractUrl"
            label="Contract"
            register={register("contractUrl")}
            readOnly={readOnly}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 col-span-2">
        <span className="text-2xl font-medium">Salary Type</span>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 col-span-2 max-sm:col-span-1 gap-5 ">
          <div>
            <TextField
              id="monthlySalary"
              label="Monthly Salary"
              placeholder="Monthly Salary"
              register={register("monthlySalary", {
                required: "Monthly Salary is required",
              })}
              error={errors.monthlySalary?.message}
              readOnly={readOnly}
            />
          </div>
          <div>
            <TextField
              id="annualSalary"
              label="Annual Salary"
              placeholder="Annual Salary"
              register={register("annualSalary", {
                required: "Annual Salary is required",
              })}
              error={errors.annualSalary?.message}
              readOnly={readOnly}
            />
          </div>
          <div>
            <TextField
              id="paymentRate"
              label="Payment Rate"
              placeholder="Payment Rate"
              register={register("paymentRate", {
                required: "Payment Rate is required",
              })}
              error={errors.paymentRate?.message}
              readOnly={readOnly}
            />
          </div>
          <div>
          <div className="flex items-center justify-between bg-gray-soft disabled:bg-[#ececec] h-16 rounded-md pl-4 mt-6">
            <span>Bonuses/Overtime</span>
              <Controller
                name="bonuses"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={!!field.value}
                    onCheckedChange={(checked) => {
                      if (readOnly) return;
                      field.onChange(checked);
                    }}
                    disabled={readOnly}
                    className="mr-4"
                  />
                )}
              />
            </div>
            {errors.bonuses && (
              <span className="text-xs text-red-400">{String(errors.bonuses.message)}</span>
            )}
          </div>
        </div>
      </div>
      {(!readOnly || mode === "add") && !hideSubmitButton && (
         <div className="col-span-2 max-sm:col-span-1 flex justify-center mb-4">
                 <Button
                   type="submit"
                   className="!bg-gray-dark p-5 rounded-4xl text-lg text-charcoal font-medium"
                 >
                   Update
                 </Button>
               </div>
      )}
    </form>
  );
};

export default ContractDetailsForm;
