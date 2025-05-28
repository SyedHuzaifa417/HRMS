"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CgGirl } from "react-icons/cg";
import { MdMailOutline, MdOutlinePhone } from "react-icons/md";


interface EmployeeCardContextValue {
  isOffline?: boolean;
}

interface EmployeeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  isOffline?: boolean;
  children: React.ReactNode;
}

interface EmployeeAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

interface EmployeeNameProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

interface EmployeePositionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

interface EmployeeLocationProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

interface EmployeeContactProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface EmployeePhoneProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface EmployeeEmailProps extends React.HTMLAttributes<HTMLDivElement> {
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
  ({ isOffline = false, className, children, ...props }, ref) => {
    return (
      <EmployeeCardContext.Provider value={{ isOffline }}>
        <div
          ref={ref}
          className={cn(
            "relative flex flex-col justify-between w-full max-w-lg p-2 bg-gray-soft rounded-xl",
            className
          )}
          {...props}
        >
       
            <div className="absolute -top-4 -right-6 transform -translate-x-1/2">
              <div className={cn("px-6 py-2 text-white text-center rounded-full",isOffline ?"bg-black":"bg-[#585757]")}>
              {isOffline ? "Offline" :"Online"}
              </div>
            </div>
      
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

const EmployeePosition = React.forwardRef<HTMLParagraphElement, EmployeePositionProps>(
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
EmployeePosition.displayName = "EmployeePosition";

const EmployeeLocation = React.forwardRef<HTMLParagraphElement, EmployeeLocationProps>(
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
EmployeeLocation.displayName = "EmployeeLocation";

const EmployeeContact = React.forwardRef<HTMLDivElement, EmployeeContactProps>(
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
EmployeeContact.displayName = "EmployeeContact";

const EmployeePhone = React.forwardRef<HTMLDivElement, EmployeePhoneProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-4", className)}
        {...props}
      >
      <MdOutlinePhone size={25}/>
        <div className="text-lg">{children}</div>
      </div>
    );
  }
);
EmployeePhone.displayName = "EmployeePhone";

const EmployeeEmail = React.forwardRef<HTMLDivElement, EmployeeEmailProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-4", className)}
        {...props}
      >
      <MdMailOutline size={25}/>
        <div className="text-lg truncate w-48">{children}</div>
      </div>
    );
  }
);
EmployeeEmail.displayName = "EmployeeEmail";

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
  EmployeePosition,
  EmployeeLocation,
  EmployeeContact,
  EmployeePhone,
  EmployeeEmail,
  EmployeeActions,
  EmployeeAction,
};