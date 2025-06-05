import React, { useState } from "react";

import { MdGridView, MdList } from "react-icons/md";
import { Switch } from "@/components/ui/switch";
import CardView from "./views/CardView";
import { attendance } from "../../../tempData";
import TableView from "./views/TableView";

const FlaggedEmployees = () => {
  const [toggleView, setToggleView] = useState(true);
  return (
    <>
      <header className="flex items-center justify-between py-10">
        <h2 className="text-3xl font-semibold">
          Flagged Employees
          <span className="text-lg font-normal pl-2 max-sm:line-clamp-1">
            (Most Recent)
          </span>
        </h2>
        <div className="flex items-center gap-5 max-sm:gap-3">
          <MdList size={25} />
          <Switch
            id="toggle-view"
            className="data-[state=checked]:bg-[#A8A8A8] data-[state=unchecked]:bg-[#A8A8A8] cursor-pointer"
            onClick={() => {
              setToggleView((prev) => !prev);
            }}
            defaultChecked={true}
          />
          <MdGridView size={25} />
        </div>
      </header>

      {toggleView ? (
        <CardView attendance={attendance} />
      ) : (
        <TableView attendance={attendance} />
      )}
    </>
  );
};

export default FlaggedEmployees;
