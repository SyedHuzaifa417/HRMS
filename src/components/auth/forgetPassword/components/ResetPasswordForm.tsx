import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

type ResetPasswordFormProps = {
  onSubmit: (password: string) => void;
  isSubmitting: boolean;
};

export function ResetPasswordForm({
  onSubmit,
  isSubmitting,
}: ResetPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const handleFormSubmit = (data: ResetPasswordFormData) => {
    onSubmit(data.password);
  };

  return (
    <>
      <h1 className="text-2xl text-gray-900 pt-6">
        Create New Password
      </h1>
      <p className="text-gray-800 text-base py-3">
        Your new password must be unique from those previously used.
      </p>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-2"
      >
   

        <div>
          <label
            htmlFor="password"
            className="block text-sm text-gray-700 mb-1"
          >
            New Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Enter new password"
            className="w-full px-3 py-2 border !bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-none"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm text-gray-700 mb-1"
          >
            Confirm New Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            className="w-full px-3 py-2 border !bg-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-none"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="pt-3 ">
          <Button
            type="submit"
            className="w-full bg-gray-300 hover:bg-gray-500 text-gray-800 font-normal py-3 px-4 rounded-2xl transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Update Password"}
          </Button>
        </div>
      </form>
    </>
  );
}
