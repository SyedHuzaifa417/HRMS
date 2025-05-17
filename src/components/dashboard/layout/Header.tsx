"use client";

import React from "react";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { RiMenuFold4Fill } from "react-icons/ri";
import { CgGirl, CgProfile } from "react-icons/cg";
import { FiChevronDown } from "react-icons/fi";
import { Search, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = (props: HeaderProps) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 640);
      };

      checkMobile();

      window.addEventListener("resize", checkMobile);

      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  return isMobile ? <MobileHeader {...props} /> : <DesktopHeader />;
};

export default Header;

const MobileHeader = ({ toggleSidebar }: HeaderProps) => {
  const router = useRouter();

  const handleLogout = () => {
    // Add logout logic here
    router.push("/login");
  };

  return (
    <header className="bg-white flex flex-col items-center gap-3 pt-1">
      <div className="flex items-center gap-3 w-full justify-between">
        <div className="flex items-center gap-3">
          <Button
            onClick={toggleSidebar}
            className="text-gray-700 focus:outline-none py-0 px-2 h-9"
            aria-label={"Open sidebar"}
            variant={"outline"}
          >
            <RiMenuFold4Fill
              size={20}
              className="transition-all duration-300"
            />
          </Button>
          <h1 className="font-bold text-xl">Flexify</h1>
        </div>

        <Select>
          <SelectTrigger className="rounded-4xl bg-gray-dark border-none [&>svg]:hidden w-min pr-2 pl-0">
            <div className="flex items-center p-1 w-fit gap-2">
              <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
                {/* <Image src="/auth/done.png" alt="user" width={30} height={30} /> */}
                <CgGirl size={30} />
              </div>
              <span className="max-w-24 truncate">Hello userassssddd</span>
              <FiChevronDown size={20} />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-gray-dark">
            <SelectItem
              value="profile"
              className="!bg-gray-dark px-0 pl-2 py-2.5"
            >
              <div className="flex items-center gap-4">
                <CgProfile size={16} />
                <span>Profile</span>
              </div>
            </SelectItem>
            <SelectItem
              value="logout"
              onClick={handleLogout}
              className="!bg-gray-dark px-0 pl-2 py-2.5 border-t border-gray-400 rounded-none"
            >
              <div className="flex items-center gap-4">
                <LogOut size={16} />
                <span>Logout</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div
        className={cn(
          "w-full flex items-center justify-self-center",
          "border focus-within:border-primary-accent rounded-4xl px-4 bg-gray-soft"
        )}
      >
        <Input
          type="search"
          className="w-full text-sm border-none bg-transparent py-2 outline-none shadow-none focus-visible:ring-0 placeholder:text-charcoal"
          placeholder="Search by name"
        />
        <Search className="size-4 text-400" />
      </div>

      <div className="text-charcoal leading-7 flex flex-col items-start">
        <h1 className="text-2xl font-semibold capitalize">
          Good morning, User
        </h1>
        <p className="text-base">
          Track and manage your team&apos; progress effectively here.
        </p>
      </div>
    </header>
  );
};

const DesktopHeader = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Add logout logic here
    router.push("/login");
  };

  return (
    <header className="bg-white flex items-center justify-between py-3">
      <div className="text-charcoal leading-7 flex flex-col items-start">
        <h1 className="text-3xl font-semibold capitalize">
          Good morning, User
        </h1>
        <p className="text-base">
          Track and manage your team&apos; progress effectively here.
        </p>
      </div>

      <div className="flex items-center gap-2 w-2/5 justify-end">
        <div
          className={cn(
            "w-72 flex items-center justify-self-center",
            "border focus-within:border-primary-accent rounded-4xl py-0.5 px-4 bg-gray-soft"
          )}
        >
          <Input
            type="search"
            className="w-full text-sm border-none bg-transparent py-2 outline-none shadow-none focus-visible:ring-0 placeholder:text-charcoal"
            placeholder="Search by name"
          />
          <Search className="size-4 text-400" />
        </div>

        <Select>
          <SelectTrigger className="rounded-4xl bg-gray-dark border-none [&>svg]:hidden w-min pr-2 pl-0">
            <div className="flex items-center p-1 w-fit gap-2">
              <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center">
                <CgGirl size={30} />
              </div>
              <span className={cn("max-w-24 truncate", "max-lg:hidden")}>
                Hello Userdfghyt
              </span>
              <FiChevronDown size={20} />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-gray-dark">
            <SelectItem
              value="profile"
              className="!bg-gray-dark px-0 pl-2 py-2.5"
            >
              <div className="flex items-center gap-4">
                <CgProfile size={16} />
                <span>Profile</span>
              </div>
            </SelectItem>
            <SelectItem
              value="logout"
              onClick={handleLogout}
              className="!bg-gray-dark px-0 pl-2 py-2.5 border-t border-gray-400 rounded-none"
            >
              <div className="flex items-center gap-4">
                <LogOut size={16} />
                <span>Logout</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};
