import { EmployeeAction, EmployeeActions, EmployeeAvatar, EmployeeCard, EmployeeContact, EmployeeEmail, EmployeeLocation, EmployeeName, EmployeePhone, EmployeePosition } from "@/components/ui/shared/EmployeeCard";
import { Employee } from "../../tempData";

export const renderGrid = (employees: Employee[]) => (
    <div className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-x-5 gap-y-7">
      {employees.map(emp => (
        <EmployeeCard key={emp.id} isOffline={emp.isOffline}>
       <div className='flex items-center justify-self-start gap-2 mt-4 px-2'>
          <EmployeeAvatar />
            <div className='flex flex-col items-start'>
                <EmployeeName>{emp.name}</EmployeeName>
                <EmployeePosition>{emp.position}</EmployeePosition>
                <EmployeeLocation>{emp.location}</EmployeeLocation>
            </div>
            </div>
            <EmployeeContact>
              <EmployeePhone>{emp.phone}</EmployeePhone>
              <EmployeeEmail>{emp.email}</EmployeeEmail>
            </EmployeeContact>
            <EmployeeActions>
              <EmployeeAction>Message</EmployeeAction>
              {!emp.onLeave && <EmployeeAction>Performance</EmployeeAction>}
            </EmployeeActions>
        </EmployeeCard>
      ))}
    </div>
  );