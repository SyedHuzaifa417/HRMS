import react from "react";
import { Employee } from "./table";
import { Switch } from "@/components/ui/switch";
export const CardView = (employees: Employee[]) => {
    const [toggleLeaveView, setToggleLeaveView] = react.useState(true);
  
      return (
          <div>
              <header className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold">Employees on Leave</h2>
              <div className="flex items-center gap-5 max-sm:gap-3">
                a
                <Switch
                  id="toggle-view=2"
                  className="data-[state=checked]:bg-[#A8A8A8] data-[state=unchecked]:bg-[#A8A8A8] cursor-pointer"
                  onClick={() => {
                    setToggleLeaveView((prev) => !prev);
                  }}
                  defaultChecked={true}
                />
                i
              </div>
            </header>
  {toggleLeaveView && (
            <div>{employees.filter((emp) => emp.onLeave).map((emp) => (
              <div key={emp.id}>{emp.name}</div>
            ))}</div>
  )}
          </div>
      )
  }