import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  ProfessionalDetailsFormProps,
  EmployeeFormData,
} from "../types/types";
import {
  TextField,
  FileField,
  CalendarField,
} from "./FormField";
import { Plus, Minus } from "lucide-react";

export const ProfessionalDetailsForm: React.FC<
  ProfessionalDetailsFormProps
> = ({
  editButton,
  onEdit,
  mode,
  defaultValues = {},
  onSubmit,
  readOnly = false,
  hideSubmitButton = false,
}) => {

  const defaultFormValues = {
    workExperiences: defaultValues?.workExperiences || [{
      previousDesignation: defaultValues?.workExperiences?.[0]?.previousDesignation || '',
      companyName: defaultValues?.workExperiences?.[0]?.companyName || '',
      workExperience: defaultValues?.workExperiences?.[0]?.workExperience || '',
      fromMonth: defaultValues?.workExperiences?.[0]?.fromMonth || '',
      toMonth: defaultValues?.workExperiences?.[0]?.toMonth || '',
    }],
    educations: defaultValues?.educations || [{
      degreeProgram: defaultValues?.educations?.[0]?.degreeProgram || '',
      instituteName: defaultValues?.educations?.[0]?.instituteName || '',
      eduFrom: defaultValues?.educations?.[0]?.eduFrom || '',
      eduTo: defaultValues?.educations?.[0]?.eduTo || '',
    }],
    certifications: defaultValues?.certifications || [{
      certificationName: defaultValues?.certifications?.[0]?.certificationName || '',
      certificationInstitute: defaultValues?.certifications?.[0]?.certificationInstitute || '',
      certificateFrom: defaultValues?.certifications?.[0]?.certificateFrom || '',
      certificateTo: defaultValues?.certifications?.[0]?.certificateTo || '',
    }],
    employeeResume: defaultValues?.employeeResume || null,
    referenceLetter: defaultValues?.referenceLetter || null,
    linkedin: defaultValues?.linkedin || '',
    portfolio: defaultValues?.portfolio || '',
  };

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm<EmployeeFormData>({
    defaultValues: defaultFormValues,
    mode: "onBlur",
  });

  const { fields: workFields, append: appendWork, remove: removeWork } = useFieldArray({
    control,
    name: "workExperiences",
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: "educations",
  });

  const { fields: certificationFields, append: appendCertification, remove: removeCertification } = useFieldArray({
    control,
    name: "certifications",
  });

  const addWorkExperience = () => {
    appendWork({
      previousDesignation: "",
      companyName: "",
      workExperience: "",
      fromMonth: "",
      toMonth: "",
    });
  };

  const addEducation = () => {
    appendEducation({
      degreeProgram: "",
      instituteName: "",
      eduFrom: "",
      eduTo: "",
    });
  };

  const addCertification = () => {
    appendCertification({
      certificationName: "",
      certificationInstitute: "",
      certificateFrom: "",
      certificateTo: "",
    });
  };



  return (
    <form
      id="professional-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div  className="w-full grid grid-cols-2 max-sm:grid-cols-1 gap-5">
      <div className="col-span-2 max-sm:col-span-1 flex justify-between items-center mb-2 p-3">
        <h2 className="text-3xl font-semibold">Professional Details</h2>
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
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-medium">Work Experience</span>
          <span 
            className="size-5 rounded-full bg-gray-soft flex items-center justify-center cursor-pointer hover:bg-gray-dark"
            onClick={() => !readOnly && addWorkExperience()}
          >
            <Plus />
          </span>
        </div>
        
        {workFields.map((field, index) => (
          <div key={field.id} >
            {index > 0 && (
              <div className="flex items-center justify-between my-6">
                <div className="text-lg font-medium">Work Experience {index + 1}</div>
                {!readOnly && (
                  <span 
                    className="size-5 rounded-full bg-gray-soft flex items-center justify-center cursor-pointer hover:bg-gray-dark"
                    onClick={() => removeWork(index)}
                  >
                    <Minus size={16}  />
                  </span>
                )}
              </div>
            )}
            <div className="grid grid-cols-1 gap-5">
              <div>
                <TextField
                  id={`workExperiences.${index}.previousDesignation`}
                  label="Previous Designation"
                  register={register(`workExperiences.${index}.previousDesignation` as const, {
                    required: "Previous Designation is required",
                  })}
                  error={errors.workExperiences?.[index]?.previousDesignation?.message}
                  readOnly={readOnly}
                />
              </div>
              <div>
                <TextField
                  id={`workExperiences.${index}.companyName`}
                  label="Company Name"
                  register={register(`workExperiences.${index}.companyName` as const, {
                    required: "Company Name is required",
                  })}
                  error={errors.workExperiences?.[index]?.companyName?.message}
                  readOnly={readOnly}
                />
              </div>
              <div>
                <TextField
                  id={`workExperiences.${index}.workExperience`}
                  label="Work Experience"
                  register={register(`workExperiences.${index}.workExperience` as const, {
                    required: "Work Experience is required",
                  })}
                  error={errors.workExperiences?.[index]?.workExperience?.message}
                  readOnly={readOnly}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
              
                  <CalendarField
                                  id={`workExperiences.${index}.fromMonth`}
                                  label="From"
                                  value={watch(`workExperiences.${index}.fromMonth`)}
                                  onValueChange={(val: string) => setValue(`workExperiences.${index}.fromMonth`, val)}
                              placeholder="From"
                              error={errors.workExperiences?.[index]?.fromMonth?.message}
                              readOnly={readOnly}
                            />
                </div>
                <div>
                
                    <CalendarField
                              id={`workExperiences.${index}.toMonth`}
                              label="To"
                              value={watch(`workExperiences.${index}.toMonth`)}
                              onValueChange={(val: string) => setValue(`workExperiences.${index}.toMonth`, val)}
                              placeholder="To"
                              error={errors.workExperiences?.[index]?.toMonth?.message}
                              readOnly={readOnly}
                            />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className=" flex flex-col gap-5 justify-start mt-16 max-sm:mt-0">
        <div className="flex items-start gap-5 max-xl:flex-col">
          <div>
            <FileField
              id="employeeResume"
              label="Employee Resume"
              register={register("employeeResume")}
              readOnly={readOnly}
            />
          </div>
          <div>
            <FileField
              id="referenceLetter"
              label="Reference Letter"
              register={register("referenceLetter")}
              readOnly={readOnly}
            />
          </div>
        </div>
        <div>
          <TextField
            id="linkedin"
            label="LinkedIn Link"
            register={register("linkedin", {
              required: "LinkedIn Link is required",
            })}
            error={errors.linkedin?.message}
            readOnly={readOnly}
          />
        </div>
        <div>
          <TextField
            id="portfolio"
            label="Portfolio Link"
            register={register("portfolio", {
              required: "Portfolio Link is required",
            })}
            error={errors.portfolio?.message}
            readOnly={readOnly}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 max-sm:grid-cols-1 col-span-2 max-sm:col-span-1 gap-5 ">
        <div className="col-span-1 flex flex-col gap-5">
          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl font-medium">Education</span>
            <span 
              className="size-5 rounded-full bg-gray-soft flex items-center justify-center cursor-pointer hover:bg-gray-dark"
              onClick={() => !readOnly && addEducation()}
            >
              <Plus />
            </span>
          </div>
          {educationFields.map((field, index) => (
            <div key={field.id}>
              {index > 0 && (
                <div className="flex items-center justify-between my-6">
                  <div className="text-lg font-medium">Education {index + 1}</div>
                  {!readOnly && (
                    <span 
                      className="size-5 rounded-full bg-gray-soft flex items-center justify-center cursor-pointer hover:bg-gray-dark"
                      onClick={() => removeEducation(index)}
                    >
                      <Minus size={16}  />
                    </span>
                  )}
                </div>
              )}
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <TextField
                    id={`educations.${index}.degreeProgram`}
                    label="Degree Program"
                    register={register(`educations.${index}.degreeProgram` as const, {
                      required: "Degree Program is required",
                    })}
                    error={errors.educations?.[index]?.degreeProgram?.message}
                    readOnly={readOnly}
                  />
                </div>
                <div>
                  <TextField
                    id={`educations.${index}.instituteName`}
                    label="Institute Name"
                    register={register(`educations.${index}.instituteName` as const, {
                      required: "Institute Name is required",
                    })}
                    error={errors.educations?.[index]?.instituteName?.message}
                    readOnly={readOnly}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                 
                      <CalendarField
                              id={`education.${index}.eduFrom`}
                              label="From"
                              value={watch(`educations.${index}.eduFrom`)}
                              onValueChange={(val: string) => setValue(`educations.${index}.eduFrom`, val)}
                              placeholder="From"
                              error={errors.educations?.[index]?.eduFrom?.message}
                              readOnly={readOnly}
                            />
                  </div>
                  <div>
                  
                    <CalendarField
                              id={`education.${index}.eduTo`}
                              label="To"
                              value={watch(`educations.${index}.eduTo`)}
                              onValueChange={(val: string) => setValue(`educations.${index}.eduTo`, val)}
                              placeholder="To"
                              error={errors.educations?.[index]?.eduTo?.message}
                              readOnly={readOnly}
                            />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-1 flex flex-col gap-5">
          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl font-medium">Certifications</span>
            <span 
              className="size-5 rounded-full bg-gray-soft flex items-center justify-center cursor-pointer hover:bg-gray-dark"
              onClick={() => !readOnly && addCertification()}
            >
              <Plus />
            </span>
          </div>
          {certificationFields.map((field, index) => (
            <div key={field.id}>
              {index > 0 && (
                <div className="flex items-center justify-between my-6">
                  <div className="text-lg font-medium">Certification {index + 1}</div>
                  {!readOnly && (
                    <span 
                      className="size-5 rounded-full bg-gray-soft flex items-center justify-center cursor-pointer hover:bg-gray-dark"
                      onClick={() => removeCertification(index)}
                    >
                      <Minus size={16} />
                    </span>
                  )}
                </div>
              )}
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <TextField
                    id={`certifications.${index}.certificationName`}
                    label="Name of certification"
                    register={register(`certifications.${index}.certificationName` as const, {
                      required: "Certification Name is required",
                    })}
                    error={errors.certifications?.[index]?.certificationName?.message}
                    readOnly={readOnly}
                  />
                </div>
                <div>
                  <TextField
                    id={`certifications.${index}.certificationInstitute`}
                    label="Institute/Platform Name"
                    register={register(`certifications.${index}.certificationInstitute` as const, {
                      required: "Certification Institute is required",
                    })}
                    error={errors.certifications?.[index]?.certificationInstitute?.message}
                    readOnly={readOnly}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                      <CalendarField
                                id={`certifications.${index}.certificateFrom`}
                      label="From"
                              value={watch(`certifications.${index}.certificateFrom`)}
                              onValueChange={(val: string) => setValue(`certifications.${index}.certificateFrom`, val)}
                              placeholder="From"
                              error={errors.certifications?.[index]?.certificateFrom?.message}
                              readOnly={readOnly}
                            />
                  </div>
                  <div>
                  
                      <CalendarField
                                id={`certifications.${index}.certificateTo`}
                      label="To"
                              value={watch(`certifications.${index}.certificateTo`)}
                              onValueChange={(val: string) => setValue(`certifications.${index}.certificateTo`, val)}
                              placeholder="To"
                              error={errors.certifications?.[index]?.certificateTo?.message}
                              readOnly={readOnly}
                            />
                  </div>
                </div>
              </div>
            </div>
          ))}
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
      </div>
    </form>
  );
};

export default ProfessionalDetailsForm;