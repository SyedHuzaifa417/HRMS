import React, { useState } from "react";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import ProfessionalDetailsForm from "./components/ProfessionalDetailsForm";
import ContractDetailsForm from "./components/ContractDetailsForm";
import {
  FormsProps,
  EmployeeFormData,
  FormSectionType,
  WorkExperience,
  Education,
  Certification,
} from "./types/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RiStarSmileLine } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Default empty work experience, education, and certification for new forms
const defaultWorkExperience: WorkExperience = {
  previousDesignation: "",
  companyName: "",
  workExperience: "",
  fromMonth: "",
  toMonth: "",
};

const defaultEducation: Education = {
  degreeProgram: "",
  instituteName: "",
  eduFrom: "",
  eduTo: "",
};

const defaultCertification: Certification = {
  certificationName: "",
  certificationInstitute: "",
  certificateFrom: "",
  certificateTo: "",
};

// Default employee data with required fields and empty arrays for professional section
const defaultEmployeeData: EmployeeFormData = {
  workExperiences: [defaultWorkExperience],
  educations: [defaultEducation],
  certifications: [defaultCertification],
  employeeResume: null,
  referenceLetter: null,
};

const Forms: React.FC<FormsProps> = ({
  mode,
  data = {},
  onSubmit,
  editButton,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialData = React.useMemo(() => {
    const formData = {
      ...defaultEmployeeData,
      ...data,
      // Ensure arrays have at least one empty item
      workExperiences: data.workExperiences?.length
        ? data.workExperiences
        : [defaultWorkExperience],
      educations: data.educations?.length
        ? data.educations
        : [defaultEducation],
      certifications: data.certifications?.length
        ? data.certifications
        : [defaultCertification],
    };
    return formData;
  }, [data]);

  const [formState, setFormState] = useState<EmployeeFormData>(initialData);
  const [activeTab, setActiveTab] = useState<FormSectionType>("personal");
  const [editModes, setEditModes] = useState({
    personal: mode === "add",
    professional: mode === "add",
    contract: mode === "add",
  });

  const handleSectionSubmit = (
    section: FormSectionType,
    sectionData: EmployeeFormData
  ) => {
    const updatedFormState = {
      ...formState,
      ...sectionData,
    };

    setFormState(updatedFormState);

    if (mode === "edit") {
      // In edit mode: submit the data immediately
      setEditModes((prev) => ({ ...prev, [section]: false }));
      onSubmit(updatedFormState);
      toast(
        `${section.charAt(0).toUpperCase() + section.slice(1)} details updated`
      );
    } else {
      // In add mode: advance to next tab
      if (section === "personal") {
        setActiveTab("professional");
      } else if (section === "professional") {
        setActiveTab("contract");
      }
    }
  };

  // Final submit for add mode (when all sections are complete)
  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 500);
    onSubmit(formState);
    toast("Employee added successfully");
  };

  const handleEdit = (form: FormSectionType) => {
    setEditModes((prev) => ({ ...prev, [form]: true }));
  };

  return (
    <div className="w-full flex flex-col gap-10 mb-2">
      {mode === "edit" && formState.name && (
        <div className="w-full p-4 flex flex-col gap-5">
          <div className=" gap-3 items-center flex">
            <span className="text-2xl leading-5 text-charcoal">
              {formState.name}
            </span>
            {formState.rating && (
              <div className="rounded-sm bg-gray-soft flex items-center gap-1 px-3 py-0.5 font-normal">
                {`${formState.rating}/5`}
                <RiStarSmileLine size={20} />
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-4 text-xl text-charcoal justify-between max-w-2/3 max-xl:max-w-full">
            {formState.employmentType && (
              <span className="flex flex-col gap-2 leading-5">
                Employee Type:{" "}
                <span className="text-lg">{formState.employmentType}</span>
              </span>
            )}
            {formState.location && (
              <span className="flex flex-col gap-2 leading-5">
                Location: <span className="text-lg">{formState.location}</span>
              </span>
            )}
            {formState.designation && (
              <span className="flex flex-col gap-2 leading-5">
                Designation:{" "}
                <span className="text-lg">{formState.designation}</span>
              </span>
            )}
            {formState.dateJoined && (
              <span className="flex flex-col gap-2 leading-5">
                Date Joined:{" "}
                <span className="text-lg">{formState.dateJoined}</span>
              </span>
            )}
          </div>
        </div>
      )}
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as FormSectionType)}
        className="w-full"
      >
        <TabsList className="flex w-full max-w-3xl mx-auto items-center justify-between mb-4 bg-transparent h-16 max-sm:flex-col max-sm:h-max max-sm:gap-0">
          <TabsTrigger
            value="personal"
            disabled={mode === "add"}
            className={cn(
              "flex text-center !bg-gray-soft border !border-[#969696] text-[#969696] font-normal text-base p-3 rounded-4xl cursor-pointer",
              activeTab === "personal" && "!border-black text-charcoal"
            )}
          >
            Personal Details
          </TabsTrigger>
          <hr
            className={cn(
              "flex-1 border max-sm:hidden",
              activeTab === "professional" && "border border-gray-dark"
            )}
          />
          <span className="hidden max-sm:inline-block w-px h-6 bg-[#969696]" />
          <TabsTrigger
            value="professional"
            disabled={mode === "add"}
            className={cn(
              "flex text-center !bg-gray-soft border !border-[#969696] text-[#969696] font-normal text-base p-3 rounded-4xl cursor-pointer",
              activeTab === "professional" && "!border-black text-charcoal"
            )}
          >
            Professional Details
          </TabsTrigger>
          <hr
            className={cn(
              "flex-1 border max-sm:hidden",
              activeTab === "contract" && "border border-gray-dark"
            )}
          />
          <span className="hidden max-sm:inline-block w-px h-6 bg-[#969696]" />
          <TabsTrigger
            value="contract"
            disabled={mode === "add"}
            className={cn(
              "flex text-center !bg-gray-soft border !border-[#969696] text-[#969696] font-normal text-base p-3 rounded-4xl cursor-pointer",
              activeTab === "contract" && "!border-black text-charcoal"
            )}
          >
            Contract Details
          </TabsTrigger>
        </TabsList>
        <div className="flex-1 overflow-hidden relative">
          <TabsContent value="personal">
            <div className="flex flex-col">
              <PersonalDetailsForm
                editButton={mode === "edit" && editButton}
                onEdit={() => handleEdit("personal")}
                mode={mode}
                defaultValues={formState}
                onSubmit={(data) => handleSectionSubmit("personal", data)}
                readOnly={mode === "edit" && !editModes.personal}
                hideSubmitButton={mode === "add"}
              />

              {mode === "add" && (
                <div className="flex justify-end mt-4">
                  <Button
                    type="button"
                    onClick={() => {
                      document
                        .getElementById("personal-form")
                        ?.dispatchEvent(
                          new Event("submit", {
                            cancelable: true,
                            bubbles: true,
                          })
                        );
                    }}
                    className="bg-gray-dark px-6 py-2 rounded-4xl text-base text-charcoal hover:bg-gray-soft"
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="professional">
            <div className="flex flex-col">
              <ProfessionalDetailsForm
                editButton={mode === "edit" && editButton}
                onEdit={() => handleEdit("professional")}
                mode={mode}
                defaultValues={formState}
                onSubmit={(data) => handleSectionSubmit("professional", data)}
                readOnly={mode === "edit" && !editModes.professional}
                hideSubmitButton={mode === "add"}
              />

              {mode === "add" && (
                <div className="flex justify-between mt-4">
                  <Button
                    type="button"
                    onClick={() => setActiveTab("personal")}
                    className="bg-gray-dark px-6 py-2 rounded-4xl text-base text-charcoal  hover:bg-gray-soft"
                  >
                    Previous
                  </Button>

                  <Button
                    type="button"
                    onClick={() => {
                      document
                        .getElementById("professional-form")
                        ?.dispatchEvent(
                          new Event("submit", {
                            cancelable: true,
                            bubbles: true,
                          })
                        );
                    }}
                    className="bg-gray-dark px-6 py-2 rounded-4xl text-base text-charcoal hover:bg-gray-soft"
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="contract">
            <div className="flex flex-col">
              <ContractDetailsForm
                editButton={mode === "edit" && editButton}
                onEdit={() => handleEdit("contract")}
                mode={mode}
                defaultValues={formState}
                onSubmit={(data) => handleSectionSubmit("contract", data)}
                readOnly={mode === "edit" && !editModes.contract}
                hideSubmitButton={mode === "add"}
              />

              {mode === "add" && (
                <div className="flex justify-between mt-4">
                  <Button
                    type="button"
                    onClick={() => setActiveTab("professional")}
                    className="bg-gray-dark px-6 py-2 rounded-4xl text-base text-charcoal hover:bg-gray-soft"
                  >
                    Previous
                  </Button>

                  <Button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="bg-gray-dark px-6 py-2 rounded-4xl text-base text-charcoal hover:bg-gray-soft"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Adding..." : "Add"}
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Forms;
