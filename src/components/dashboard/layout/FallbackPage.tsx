import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-xl font-semibold">Loading your dashboard...</h1>
      <p className="text-gray-500 mt-2">
        Please wait while we fetch your profile
      </p>
    </div>
  </div>
);

const AccessDeniedScreen = ({
  onBackToLogin,
}: {
  onBackToLogin: () => void;
}) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex items-center gap-8 max-sm:flex-col max-sm:px-6 ">
      <Image
        src="/dashboard/access-denied.png"
        alt="Access Denied"
        width={150}
        height={150}
        className="object-cover"
      />
      <div className=" max-w-md flex flex-col items-start justify-center max-sm:items-center">
        <h1 className="text-2xl font-semibold text-gray-700">
          You&apos;ve stumbled on a restricted space
        </h1>
        <p className="text-gray-500 mt-2">
          You don&apos;t have permission to access this page. So let&apos;s go
          back to the login page.
        </p>
        <Button
          className="mt-4 w-1/4 max-sm:w-full bg-gray-400 hover:bg-gray-500 text-gray-800 font-normal p-4 rounded-2xl transition-colors"
          onClick={onBackToLogin}
        >
          Back to Login
        </Button>
      </div>
    </div>
  </div>
);

export { LoadingScreen, AccessDeniedScreen };
