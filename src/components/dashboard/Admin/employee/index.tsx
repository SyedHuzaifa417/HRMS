"use client";

import React, { useState } from "react";
import { allEmployees } from "../tempData";

import { Switch } from "@/components/ui/switch";
import { MdGridView, MdList } from "react-icons/md";
import { HiPlus } from "react-icons/hi2";
import Forms from "@/components/ui/shared/Forms";
import { EmployeeFormData } from "@/components/ui/shared/Forms/types/types";
import { Button } from "@/components/ui/button";
import { IoChevronBack } from "react-icons/io5";
import { CardView } from "./view/cardView";
import { TableView } from "./view/tableView";

export default function AdminEmployees() {
  const [toggleLeaveView, setToggleLeaveView] = useState(true);
  const [toggleAllView, setToggleAllView] = useState(true);

  const [toggleEmployeeForm, setToggleEmployeeForm] = useState<{
    render: boolean;
    mode: "add" | "edit";
    data?: EmployeeFormData;
  }>({ render: false, mode: "add" });

  // const mapEmployeeToFormData = (
  //   employee: (typeof allEmployees)[0]
  // ): EmployeeFormData => {
  //   return {
  //     name: employee.name,
  //     employmentType: employee.location?.includes("Remote")
  //       ? "Remote"
  //       : "In-house",
  //     location: employee.location,
  //     rating: employee.rating,
  //     designation: employee.position,
  //     fullName: employee.name,
  //     email: employee.email,
  //     phone: parseInt(employee.phone?.replace(/\D/g, "") || "0"),

  //     // to ensure at least one entry exists for each array
  //     workExperiences: [
  //       {
  //         previousDesignation: "",
  //         companyName: "",
  //         workExperience: "",
  //         fromMonth: "",
  //         toMonth: "",
  //       },
  //     ],
  //     educations: [
  //       {
  //         degreeProgram: "",
  //         instituteName: "",
  //         eduFrom: "",
  //         eduTo: "",
  //       },
  //     ],
  //     certifications: [
  //       {
  //         certificationName: "",
  //         certificationInstitute: "",
  //         certificateFrom: "",
  //         certificateTo: "",
  //       },
  //     ],
  //   };
  // };

  const handleSubmit = (formData: EmployeeFormData) => {
    console.log("Submitted data:", formData);
    // Here we save the data to the database
  };

  return (
    <>
      {toggleEmployeeForm.render === false && (
        <section className="space-y-10">
          <div
            className="justify-self-end py-2 px-4 bg-gray-dark flex items-center rounded-4xl gap-2 mb-5 mt-3 cursor-pointer"
            onClick={() =>
              setToggleEmployeeForm({
                render: true,
                mode: "add",
              })
            }
          >
            <span className="text-base font-medium text-charcoal">
              Add New Employee
            </span>
            <span className="size-5 bg-gray-soft rounded-full flex items-center justify-center">
              <HiPlus />
            </span>
          </div>
          <header className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Employees on Leave</h2>
            <div className="flex items-center gap-5 max-sm:gap-3">
              <MdList size={25} />
              <Switch
                id="toggle-view=2"
                className="data-[state=checked]:bg-[#A8A8A8] data-[state=unchecked]:bg-[#A8A8A8] cursor-pointer"
                onClick={() => {
                  setToggleLeaveView((prev) => !prev);
                }}
                defaultChecked={true}
              />
              <MdGridView size={25} />
            </div>
          </header>
          {toggleLeaveView ? (
            CardView(allEmployees.filter((emp) => emp.onLeave))
          ) : (
            <TableView
              // data={allEmployees.filter((emp) => emp.onLeave)}
              // onRowClick={(row) =>
              //   setToggleEmployeeForm({
              //     render: true,
              //     mode: "edit",
              //     data: mapEmployeeToFormData(row),
              //   })
              // }
            />
          )}

          <header className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">All Employees</h2>
            <div className="flex items-center gap-5 max-sm:gap-3">
              <MdList size={25} />
              <Switch
                id="toggle-view"
                className="data-[state=checked]:bg-[#A8A8A8] data-[state=unchecked]:bg-[#A8A8A8] cursor-pointer"
                onClick={() => {
                  setToggleAllView((prev) => !prev);
                }}
                defaultChecked={true}
              />
              <MdGridView size={25} />
            </div>
          </header>
          {toggleAllView ? (
            CardView(allEmployees.filter((emp) => !emp.onLeave))
          ) : (
            <TableView
              // data={allEmployees.filter((emp) => !emp.onLeave)}
              // onRowClick={(row) =>
              //   setToggleEmployeeForm({
              //     render: true,
              //     mode: "edit",
              //     data: mapEmployeeToFormData(row),
              //   })
              // }
            />
          )}
        </section>
      )}
      {toggleEmployeeForm.render && (
        <>
          <div className="flex items-center justify-between py-6">
            <div className="text-3xl font-semibold">
              {toggleEmployeeForm.mode === "add"
                ? "Add New Employee"
                : "View/Edit Employee"}
            </div>
            <Button
              onClick={() =>
                setToggleEmployeeForm({ render: false, mode: "add" })
              }
              className="px-4 py-2 bg-gray-dark rounded-2xl text-base font-normal hover:bg-gray-soft transition-colors cursor-pointer"
              variant={"ghost"}
            >
              <IoChevronBack size={20} />
            </Button>
          </div>
          <Forms
            mode={toggleEmployeeForm.mode}
            data={toggleEmployeeForm.data}
            editButton={toggleEmployeeForm.mode === "edit" ? true : false}
            onSubmit={(allData) => {
              handleSubmit(allData);
              setToggleEmployeeForm({ render: false, mode: "add" });
            }}
          />
        </>
      )}
    </>
  );
}
