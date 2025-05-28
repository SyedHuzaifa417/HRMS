import { SubmitHandler, UseFormRegisterReturn } from "react-hook-form";

export type FormSectionType = "personal" | "professional" | "contract";


export interface WorkExperience {
  previousDesignation: string;
  companyName: string;
  workExperience: string;
  fromMonth: string;
  toMonth: string;
}

export interface Education {
  degreeProgram: string;
  instituteName: string;
  eduFrom: string;
  eduTo: string;
}

export interface Certification {
  certificationName: string;
  certificationInstitute: string;
  certificateFrom: string;
  certificateTo: string;
}


export interface EmployeeFormData {
  // Basic info 
  name?: string;
  rating?: string;
  employmentType?: string;
  location?: string;
  designation?: string;
  dateJoined?: string;
  
  // Personal details
  fullName?: string;
  email?: string;
  address?: string;
  phone?: number;
  gender?: string;
  age?: string;
  city?: string;
  state?: string;
  fatherName?: string;
  motherName?: string;
  fatherPhone?: number;
  motherPhone?: number;
  bankName?: string;
  accountHolder?: string;
  accountNumber?: number;
  branchCode?: string;
  branchAddress?: string;
  
  // Professional details
  workExperiences?: WorkExperience[];
  employeeResume?: File | null;
  referenceLetter?: File | null;
  linkedin?: string;
  portfolio?: string;
  educations?: Education[];
  certifications?: Certification[];
  
  // Contract details
  department?: string;
  contractUrl?: File | null;
  from?: string;
  to?: string;
  salaryType?: string;
  monthlySalary?: string;
  annualSalary?: string;
  paymentRate?: string;
  bonuses?: string;
}

export interface FormsProps {
  mode: "edit" | "add";
  data?: EmployeeFormData;
  onSubmit: (data: EmployeeFormData) => void;
  editButton?: boolean;
}

export interface FormSectionProps {
  editButton?: boolean;
  onEdit?: () => void;
  mode: "edit" | "add";
  defaultValues?: EmployeeFormData;
  onSubmit: SubmitHandler<EmployeeFormData>;
  readOnly?: boolean;
  hideSubmitButton?: boolean;
}

export interface PersonalDetailsFormProps {
  editButton?: boolean;
  onEdit?: () => void;
  mode: "edit" | "add";
  defaultValues?: EmployeeFormData;
  onSubmit: (data: EmployeeFormData) => void;
  readOnly?: boolean;
  hideSubmitButton?: boolean;
}

export interface ProfessionalDetailsFormProps {
  editButton?: boolean;
  onEdit?: () => void;
  mode: "edit" | "add";
  defaultValues?: EmployeeFormData;
  onSubmit: (data: EmployeeFormData) => void;
  readOnly?: boolean;
  hideSubmitButton?: boolean;
}

export interface ContractDetailsFormProps {
  editButton?: boolean;
  onEdit?: () => void;
  mode: "edit" | "add";
  defaultValues?: EmployeeFormData;
  onSubmit: (data: EmployeeFormData) => void;
  readOnly?: boolean;
  hideSubmitButton?: boolean;
}

//formfields
export type FormValues = Record<
  string,
  string | number | boolean | File | null
>;

export interface TextFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  error?: string;
  readOnly?: boolean;
  register?: UseFormRegisterReturn;
  [key: string]: unknown;
}

export interface SelectFieldOption {
  value: string;
  label: string;
}

export interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onValueChange: (val: string) => void;
  placeholder?: string;
  options: SelectFieldOption[];
  error?: string;
  readOnly?: boolean;
}

export interface FileFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  error?: string;
  readOnly?: boolean;
  register?: UseFormRegisterReturn;
}

export interface CalendarFieldProps {
  id: string;
  label: string;
  value: string;
  onValueChange: (val: string) => void;
  placeholder?: string;
  error?: string;
  readOnly?: boolean;
}