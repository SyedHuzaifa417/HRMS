import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useEffect, useState } from "react";

const formSchema = z.object({
  otp0: z.string().regex(/^[0-9]$/, "Must be a number"),
  otp1: z.string().regex(/^[0-9]$/, "Must be a number"),
  otp2: z.string().regex(/^[0-9]$/, "Must be a number"),
  otp3: z.string().regex(/^[0-9]$/, "Must be a number"),
});

type FormValues = z.infer<typeof formSchema>;
type OtpField = keyof FormValues;

type OtpVerificationProps = {
  onSubmit: (otp: string) => void;
  isSubmitting: boolean;
  email: string;
};

export function OtpVerification({
  onSubmit,
  isSubmitting,
  email,
}: OtpVerificationProps) {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleFormSubmit = (data: FormValues) => {
    const otp = Object.values(data).join("");
    onSubmit(otp);
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    const hasNonNumericError = Object.values(errors).some((error) =>
      error?.message?.includes("Must be a number")
    );

    if (hasNonNumericError) {
      setErrorMessage("Please write correct OTP code");
    } else if (Object.keys(errors).length > 0) {
      setErrorMessage("Please enter the complete 6-digit code");
    } else {
      setErrorMessage("");
    }
  }, [errors]);

  return (
    <>
      <h1 className="text-2xl text-gray-900 pt-7">
        Enter Code
      </h1>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-2"
      >
       
          <label className="block text-sm font-medium text-gray-700 my-4">
            Enter the 4-digit code sent to {email}
          </label>
          <div className="flex justify-between gap-2 w-2/3 mx-auto max-sm:w-full">
            {Array.from({ length: 4 }).map((_, index) => {
              const fieldName = `otp${index}` as OtpField;
              return (
                <Input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="
                  w-12 h-12 text-center text-xl font-bold
                  bg-inherit border-0 border-b-4 border-gray-300
                  rounded-none shadow-none outline-none
                  focus-visible:border-0 focus-visible:border-b-4 focus-visible:border-gray-400 focus-visible:ring-0
                "
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  {...register(fieldName)}
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                    register(fieldName).ref(el);
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!/^[0-9]$/.test(value) && value !== "") {
                      e.target.value = "";
                      return;
                    }

                    if (value && index < 3) {
                      inputRefs.current[index + 1].focus();
                    }
                    register(fieldName).onChange(e);
                  }}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Backspace" &&
                      !e.currentTarget.value &&
                      index > 0
                    ) {
                      inputRefs.current[index - 1].focus();
                    }
                  }}
                />
              );
            })}
          </div>
          {errorMessage && (
            <p className="mt-1 text-sm text-red-600 text-center">
              {errorMessage}
            </p>
          )}
       
        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-gray-400 hover:bg-gray-500 text-gray-800 font-normal py-3 px-4 rounded-2xl transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Verify Code"}
          </Button>
        </div>
      </form>
    </>
  );
}
