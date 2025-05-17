import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type EmailFormProps = {
  onSubmit: (email: string) => void;
  isSubmitting: boolean;
};

export type EmailFormData = z.infer<typeof emailSchema>;

export function EmailForm({ onSubmit, isSubmitting }: EmailFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const handleFormSubmit = (data: EmailFormData) => {
    onSubmit(data.email);
  };

  return (
    <>
      <h1 className="text-2xl text-gray-900 pt-7">
        Forgot Password?
      </h1>
      <p className=" text-sm text-gray-900 py-2">
        Don&apos;t worry, we&apos;ll help you access your account
      </p>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4 pt-4"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-normal text-gray-700 mb-1"
          >
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border !bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-none"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-full bg-gray-400 hover:bg-gray-500 text-gray-800 font-normal p-4 rounded-2xl transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Reset Password"}
          </Button>
        </div>
      </form>
    </>
  );
}
