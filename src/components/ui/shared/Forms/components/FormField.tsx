import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaRegFileLines } from "react-icons/fa6";
import { format } from "date-fns";
import { enUS } from 'date-fns/locale';
import { CalendarFieldProps, FileFieldProps, SelectFieldProps, TextFieldProps } from "../types/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDown } from "lucide-react";



// TextField: For text, email, number, etc.
export const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  placeholder,
  type = "text",
  error,
  readOnly = false,
  register,
  ...rest
}) => (
  <div className="flex flex-col gap-1">
    <Label htmlFor={id} className="text-lg font-normal leading-5 ml-3">
      {label}
    </Label>
    <Input
      id={id}
      placeholder={placeholder}
      type={type}
      {...register}
      className="bg-gray-soft h-16 text-lg shadow-none read-only:bg-[#ececec] read-only:text-[#898989] read-only:cursor-not-allowed focus-visible:ring-0"
      readOnly={readOnly}
      {...rest}
    />
    {error && <span className="text-xs text-red-400">{error}</span>}
  </div>
);

// SelectField: For dropdowns
export const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  value,
  onValueChange,
  placeholder,
  options = [],
  error,
  readOnly = false,
}) => (
  <div>
    <Label htmlFor={id} className="text-lg font-normal leading-5 ml-3">
      {label}
    </Label>
    <Select value={value} onValueChange={onValueChange} disabled={readOnly}>
      <SelectTrigger className="bg-gray-soft h-16 text-lg focus:ring-0 shadow-none [&>svg]:text-[#898989] [&>svg]:size-5 [&>svg]:ml-3 [&>svg]:opacity-100 [&>svg]:border-2 [&>svg]:rounded-full [&>svg]:border-[#898989]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="text-base">
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {error && <span className="text-xs text-red-400">{error}</span>}
  </div>
);

// FileField: For file uploads
export const FileField: React.FC<FileFieldProps> = ({
  id,
  label,
  error,
  readOnly = false,
  register,
  ...rest
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (register?.onChange) {
        register.onChange(event);
      }
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current && !readOnly) {
      fileInputRef.current.click();
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = selectedFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="w-full">
      <Label className="text-lg font-normal leading-5 ml-3">
        {label || "Contract"}
      </Label>

      <div className="w-full flex flex-col justify-start gap-5">
        {selectedFile ? (
          <div className="bg-gray-soft rounded-md p-3 min-w-[243px] w-full min-h-[50px] flex flex-col disabled:bg-[#ececec] justify-between">
            <div className=" self-end">
              <button
                type="button"
                className="text-blue-500 text-xm hover:underline"
                onClick={handleDownload}
              >
                Download
              </button>
            </div>
            <div className="flex items-end w-full">
              <div className="mr-4">
                <FaRegFileLines size={35} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm">{selectedFile.name}</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-gray-soft rounded-md w-[243px] min-h-16 flex flex-col disabled:bg-[#ececec]" />
            <p className="text-charcoal text-sm">
              Upload word or PDF document minimum size 3mb{" "}
            </p>
          </>
        )}
        <button
          type="button"
          onClick={handleUploadClick}
          className="bg-gray-dark disabled:bg-[#ececec] disabled:text-[#898989] disabled:cursor-not-allowed text-lg text-charcoal px-7 py-2 rounded-full hover:bg-muted-foreground w-max"
          disabled={readOnly}
        >
          Upload
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={(e) => {
          fileInputRef.current = e;
          // If register exists, call its ref function
          if (register && typeof register.ref === "function") {
            register.ref(e);
          }
        }}
        id={id}
        type="file"
        className="hidden"
        disabled={readOnly}
        {...rest}
        {...(register ? { name: register.name } : {})}
        onChange={(e) => {
          handleFileChange(e);
          if (register && register.onChange) {
            register.onChange(e);
          }
        }}
      />

      {error && <span className="text-xs text-red-400 mt-2">{error}</span>}
    </div>
  );
};


export const CalendarField: React.FC<CalendarFieldProps> = ({
  id,
  label,
  value,
  onValueChange,
  placeholder,
  error,
  readOnly = false,
}) => {
  const dateValue = value ? new Date(value) : undefined;

  const isValidDate = dateValue instanceof Date && !isNaN(dateValue.getTime());

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id} className="text-lg font-normal leading-5 ml-3">
        {label}
      </Label>
      <Popover>
        <PopoverTrigger asChild disabled={readOnly}>
          <button
            id={id}
            type="button"
            className={`bg-gray-soft h-16 w-full rounded-md border border-input text-left pl-3 pr-3 text-lg focus:ring-0 shadow-none flex items-center justify-between disabled:bg-[#ececec] disabled:text-[#898989] disabled:cursor-not-allowed`}
          >
         {isValidDate ? (
              format(dateValue!, "PPP", { locale: enUS })
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          <ChevronDown className="text-[#898989] size-5 ml-3 opacity-100 border-2 rounded-full border-[#898989]"/>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
        <Calendar
            mode="single"
            selected={isValidDate ? dateValue : undefined}
            onSelect={(newDate) => {
              if (newDate) {
                onValueChange(newDate.toISOString());
              }
            }}
          />
        </PopoverContent>
      </Popover>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
};