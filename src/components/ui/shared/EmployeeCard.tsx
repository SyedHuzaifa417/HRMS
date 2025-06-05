"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CgGirl } from "react-icons/cg";

interface EmployeeCardContextValue {
  status?: {
    text: string;
    alternateText?: string;
    colorClass: string;
  };
}

interface EmployeeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: {
    text: string;
    alternateText?: string;
    colorClass: string;
  };
  children: React.ReactNode;
}

interface EmployeeAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

interface EmployeeNameProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

interface EmployeeDetail1Props extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

interface EmployeeDetail2Props extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

interface EmployeeContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface EmployeeDesc1Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface EmployeeDesc2Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface EmployeeActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface EmployeeActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}


const EmployeeCardContext = React.createContext<EmployeeCardContextValue>({});


const EmployeeCard = React.forwardRef<HTMLDivElement, EmployeeCardProps>(
  ({ status, className, children, ...props }, ref) => {
    return (
      <EmployeeCardContext.Provider value={{ status }}>
        <div
          ref={ref}
          className={cn(
            "relative flex flex-col justify-between w-full max-w-lg p-2 bg-gray-soft rounded-xl",
            className
          )}
          {...props}
        >
          {status && (
            <div className="absolute -top-4 -right-6 transform -translate-x-1/2">
              <div className={cn("px-6 py-2 text-white text-center rounded-full", status.colorClass)}>
                {status.text}
              </div>
            </div>
          )}
          {children}
        </div>
      </EmployeeCardContext.Provider>
    );
  }
);
EmployeeCard.displayName = "EmployeeCard";


const EmployeeAvatar = React.forwardRef<HTMLDivElement, EmployeeAvatarProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref} 
        className={cn(
          "flex items-center justify-center bg-white w-14 h-14 rounded-full border-2 border-black ",
          className
        )}
        {...props}
      >
       <CgGirl className="w-full h-full text-charcoal" /> 
      </div>
    );
  }
);
EmployeeAvatar.displayName = "EmployeeAvatar";


const EmployeeName = React.forwardRef<HTMLHeadingElement, EmployeeNameProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn("text-xl font-semibold text-charcoal", className)}
        {...props}
      >
        {children}
      </h3>
    );
  }
);
EmployeeName.displayName = "EmployeeName";

const EmployeeDetail1 = React.forwardRef<HTMLParagraphElement, EmployeeDetail1Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-lg text-charcoal", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
EmployeeDetail1.displayName = "EmployeeDetail1";

const EmployeeDetail2 = React.forwardRef<HTMLParagraphElement, EmployeeDetail2Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-lg text-charcoal", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
EmployeeDetail2.displayName = "EmployeeDetail2";

const EmployeeContainer = React.forwardRef<HTMLDivElement, EmployeeContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-full space-y-1 p-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
EmployeeContainer.displayName = "EmployeeContainer";

const EmployeeDesc1 = React.forwardRef<HTMLDivElement, EmployeeDesc1Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
EmployeeDesc1.displayName = "EmployeeDesc1";

const EmployeeDesc2 = React.forwardRef<HTMLDivElement, EmployeeDesc2Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-4", className)}
        {...props}
      >
    {children}
      </div>
    );
  }
);
EmployeeDesc2.displayName = "EmployeeDesc2";

const EmployeeActions = React.forwardRef<HTMLDivElement, EmployeeActionsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex gap-2 w-full my-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
EmployeeActions.displayName = "EmployeeActions";

const EmployeeAction = React.forwardRef<HTMLButtonElement, EmployeeActionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "flex-1 py-1.5 px-4 justify-center max-xl:px-1.5 max-lg:px-4 rounded-full bg-white text-charcoal text-lg",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
EmployeeAction.displayName = "EmployeeAction";

export {
  EmployeeCard,
  EmployeeAvatar,
  EmployeeName,
  EmployeeDetail1,
  EmployeeDetail2,
  EmployeeContainer,
  EmployeeDesc1,
  EmployeeDesc2,
  EmployeeActions,
  EmployeeAction,
};