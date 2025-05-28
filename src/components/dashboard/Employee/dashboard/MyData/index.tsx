import React from "react";
import Forms from "@/components/ui/shared/Forms";
import { EmployeeFormData } from "@/components/ui/shared/Forms/types/types";
import { rawData } from "../../tempData";

export default function MyData() {
  const handleSubmit = (formData: EmployeeFormData) => {
    console.log("Submitted data:", formData);
    // Here we save the data to a database or API
  };

  return (
    <Forms
      mode="edit"
      data={rawData}
      onSubmit={handleSubmit}
      editButton
    />
  );
}
