import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  EmployeeFormData,
  PersonalDetailsFormProps,
  SelectFieldOption,
} from "../types/types";
import { TextField, SelectField } from "./FormField";

const ageOptions = [
  { value: String(18), label: "18" },
  { value: String(19), label: "19" },
  { value: String(20), label: "20" },
  { value: String(21), label: "21" },
  { value: String(22), label: "22" },
  { value: String(23), label: "23" },
  { value: String(24), label: "24" },
  { value: String(25), label: "25" },
  { value: String(26), label: "26" },
  { value: String(27), label: "27" },
  { value: String(28), label: "28" },
  { value: String(29), label: "29" },
  { value: String(30), label: "30" },
  { value: String(31), label: "31" },
  { value: String(32), label: "32" },
  { value: String(33), label: "33" },
  { value: String(34), label: "34" },
  { value: String(35), label: "35" },
  { value: String(36), label: "36" },
  { value: String(37), label: "37" },
  { value: String(38), label: "38" },
  { value: String(39), label: "39" },
  { value: String(40), label: "40" },
  { value: String(41), label: "41" },
  { value: String(42), label: "42" },
  { value: String(43), label: "43" },
  { value: String(44), label: "44" },
  { value: String(45), label: "45" },
  { value: String(46), label: "46" },
  { value: String(47), label: "47" },
  { value: String(48), label: "48" },
  { value: String(49), label: "49" },
  { value: String(50), label: "50" },
  { value: String(51), label: "51" },
  { value: String(52), label: "52" },
  { value: String(53), label: "53" },
  { value: String(54), label: "54" },
  { value: String(55), label: "55" },
  { value: String(56), label: "56" },
  { value: String(57), label: "57" },
  { value: String(58), label: "58" },
  { value: String(59), label: "59" },
  { value: String(60), label: "60" },
  { value: String(61), label: "61" },
  { value: String(62), label: "62" },
  { value: String(63), label: "63" },
  { value: String(64), label: "64" },
  { value: String(65), label: "65" },
  { value: String(66), label: "66" },
  { value: String(67), label: "67" },
  { value: String(68), label: "68" },
  { value: String(69), label: "69" },
  { value: String(70), label: "70" },
  { value: String(71), label: "71" },
  { value: String(72), label: "72" },
  { value: String(73), label: "73" },
  { value: String(74), label: "74" },
  { value: String(75), label: "75" },
  { value: String(76), label: "76" },
  { value: String(77), label: "77" },
  { value: String(78), label: "78" },
  { value: String(79), label: "79" },
  { value: String(80), label: "80" },
  { value: String(81), label: "81" },
  { value: String(82), label: "82" },
  { value: String(83), label: "83" },
] as SelectFieldOption[];

export const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
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
    formState: { errors },
    watch,
  } = useForm<EmployeeFormData>({
    defaultValues,
    mode: "onBlur",
  });
  

  return (
    <form
      id="personal-form"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full grid grid-cols-2 max-sm:grid-cols-1 gap-5"
    >
      <div className="col-span-2 max-sm:col-span-1 flex justify-between items-center mb-2 p-3">
        <h2 className="text-3xl font-semibold">Personal Details</h2>
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
      <div>
        <TextField
          id="fullName"
          label="Full Name"
          placeholder="Full Name"
          register={register("fullName", { required: "Full Name is required" })}
          error={errors.fullName?.message}
          readOnly={readOnly}
        />
      </div>
      <div>
        <TextField
          id="email"
          label="Email Address"
          placeholder="Email Address"
          type="email"
          register={register("email", { required: "Email is required" })}
          error={errors.email?.message}
          readOnly={readOnly}
        />
      </div>
      <div>
        <TextField
          id="address"
          label="Address"
          placeholder="Address"
          register={register("address", { required: "Address is required" })}
          error={errors.address?.message}
          readOnly={readOnly}
        />
      </div>
      <div>
        <TextField
          id="phone"
          type="number"
          label="Phone Number"
          placeholder="Phone Number"
          register={register("phone", { required: "Phone Number is required" })}
          error={errors.phone?.message}
          readOnly={readOnly}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <SelectField
            id="gender"
            label="Gender"
            value={watch("gender") || ""}
            onValueChange={(val: string) => setValue("gender", val)}
            placeholder="Select Gender"
            options={
              [
                { value: "Female", label: "Female" },
                { value: "Male", label: "Male" },
                { value: "Other", label: "Other" },
              ] 
            }
            error={errors.gender?.message}
            readOnly={readOnly}
          />
        </div>
        <div>
          <SelectField
            id="age"
            label="Age"
            value={watch("age") || ""}
            onValueChange={(val: string) => setValue("age", val)}
            placeholder="Select Age"
            options={ageOptions}
            error={errors.age?.message}
            readOnly={readOnly}
          />
        </div>
      </div>{" "}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <SelectField
            id="city"
            label="City"
            value={watch("city") || ""}
            onValueChange={(val: string) => setValue("city", val)}
            placeholder="Select City"
            options={
              [
                { value: "Lahore", label: "Lahore" },
                { value: "Karachi", label: "Karachi" },
                { value: "Islamabad", label: "Islamabad" },
              ] as SelectFieldOption[]
            }
            error={errors.city?.message}
            readOnly={readOnly}
          />
        </div>
        <div>
          <SelectField
            id="state"
            label="State"
            value={watch("state") || ""}
            onValueChange={(val: string) => setValue("state", val)}
            placeholder="Select State"
            options={
              [
                { value: "Punjab", label: "Punjab" },
                { value: "Sindh", label: "Sindh" },
                { value: "KPK", label: "KPK" },
                { value: "Balochistan", label: "Balochistan" },
              ] as SelectFieldOption[]
            }
            error={errors.state?.message}
            readOnly={readOnly}
          />
        </div>
      </div>
      <div>
        <TextField
          id="fatherName"
          label="Father Name"
          placeholder="Father Name"
          register={register("fatherName", {
            required: "Father Name is required",
          })}
          error={errors.fatherName?.message}
          readOnly={readOnly}
        />
      </div>
      <div>
        <TextField
          id="motherName"
          label="Mother Name"
          placeholder="Mother Name"
          register={register("motherName", {
            required: "Mother Name is required",
          })}
          error={errors.motherName?.message}
          readOnly={readOnly}
        />
      </div>
      <div>
        <TextField
          id="fatherPhone"
          label="Father Phone"
          type="number"
          placeholder="Father Phone"
          register={register("fatherPhone", {
            required: "Father Phone is required",
          })}
          error={errors.fatherPhone?.message}
          readOnly={readOnly}
        />
      </div>
      <div>
        <TextField
          id="motherPhone"
          label="Mother Phone"
          type="number"
          placeholder="Mother Phone"
          register={register("motherPhone", {
            required: "Mother Phone is required",
          })}
          error={errors.motherPhone?.message}
          readOnly={readOnly}
        />
      </div>
      <div className="col-span-2 max-sm:col-span-1 mt-4">
        <h3 className="font-medium mb-4 text-xl">Banking Details</h3>
        <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-4">
          <div>
            <TextField
              id="bankName"
              label="Bank Name"
              placeholder="Bank Name"
              register={register("bankName", {
                required: "Bank Name is required",
              })}
              error={errors.bankName?.message}
              readOnly={readOnly}
            />
          </div>
          <div>
            <TextField
              id="accountHolder"
              label="Account Holder Name"
              placeholder="Account Holder Name"
              register={register("accountHolder", {
                required: "Account Holder Name is required",
              })}
              error={errors.accountHolder?.message}
              readOnly={readOnly}
            />
          </div>
          <div>
            <TextField
              id="accountNumber"
              label="Account Number"
              type="number"
              placeholder="Account Number"
              register={register("accountNumber", {
                required: "Account Number is required",
              })}
              error={errors.accountNumber?.message}
              readOnly={readOnly}
            />
          </div>
          <div>
            <TextField
              id="branchCode"
              label="Branch Code"
              placeholder="Branch Code"
              register={register("branchCode", {
                required: "Branch Code is required",
              })}
              error={errors.branchCode?.message}
              readOnly={readOnly}
            />
          </div>
          <div>
            <TextField
              id="branchAddress"
              label="Branch Address"
              placeholder="Branch Address"
              register={register("branchAddress", {
                required: "Branch Address is required",
              })}
              error={errors.branchAddress?.message}
              readOnly={readOnly}
            />
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

export default PersonalDetailsForm;
