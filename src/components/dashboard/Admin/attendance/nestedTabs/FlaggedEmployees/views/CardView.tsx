import React, { useState } from 'react'
import {
    EmployeeAction,
    EmployeeActions,
    EmployeeAvatar,
    EmployeeCard,
    EmployeeContainer,
    EmployeeDesc1,
    EmployeeDesc2,
    EmployeeDetail1,
    EmployeeDetail2,
    EmployeeName,
} from "@/components/ui/shared/EmployeeCard";
import moment from "moment";
import { Attendance } from '../../..';
import Paginations from '@/components/ui/shared/Paginations';
import WarningModal from './Modal';

interface WarningFormData {
    subject: string;
    to: string;
    cc: string;
    date: string;
    message: string;
  }

const CardView = ({ attendance }: { attendance: Attendance[] }) => {
const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Attendance | null>(null);

  const handleIssueWarning = (employee: Attendance) => {
    setSelectedEmployee(employee);
    setIsWarningModalOpen(true);
  };

  const handleSendWarning = (employee: Attendance, formData: WarningFormData) => {
    console.log('Warning data:', formData);
    
    //  update the employee's warning status here
    // and refresh the data
    
    // For demo purposes, we'll just log it
    alert(`Warning sent to ${employee.name}`);
  };

  const handleCloseModal = () => {
    setIsWarningModalOpen(false);
    setSelectedEmployee(null);
  };

    return (
        <>
      <Paginations 
      data={attendance} 
      itemsPerPage={10}
      dataLabel="employees"
  >
      {(currentAttendance) => (
        //if we remove the pagination we delete above lines
            <div className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-x-5 gap-y-7">
                {currentAttendance.map((atten) => (
                    <EmployeeCard key={atten.id}>
                        <div className="flex items-center justify-self-start gap-2 mt-4 px-2">
                            <EmployeeAvatar />
                            <div className="flex flex-col items-start">
                                <EmployeeName>{atten.name}</EmployeeName>
                                <EmployeeDetail1 className="text-sm">
                                    {atten.title}
                                </EmployeeDetail1>
                                <EmployeeDetail2 className="text-sm">
                                    {atten.location}
                                </EmployeeDetail2>
                            </div>
                        </div>
                        <EmployeeContainer>
                            <EmployeeDesc1>
                                <div>Incidents:</div>
                                <div className="text-sm max-lg:max-w-[150px] max-w-48 truncate">
                                    {atten.incidents.length === 0
                                        ? "None"
                                        : atten.incidents.map((i) => i.type).join(", ")}
                                </div>
                            </EmployeeDesc1>
                            <EmployeeDesc2>
                                <div>Dated:</div>
                                <div className="text-sm max-lg:max-w-[150px] max-w-48 truncate">
                                    {atten.incidents.length === 0
                                        ? "-- -- --"
                                        : atten.incidents.map((i) => moment(i.date).format("DD/MM/YY")).join(" and ")}
                                </div>
                            </EmployeeDesc2>
                        </EmployeeContainer>
                        <EmployeeActions>
                            {atten.warningIssued ? (
                                <EmployeeAction
                                    disabled
                                    className="cursor-not-allowed bg-gray-dark"
                                >
                                    Warning Issued
                                </EmployeeAction>
                            ) : (
                                <EmployeeAction onClick={() => handleIssueWarning(atten)}  className="cursor-pointer">Issue Warning</EmployeeAction>
                            )}
                        </EmployeeActions>
                    </EmployeeCard>
                ))}
            </div>
      )}

        </Paginations>
      <WarningModal
             isOpen={isWarningModalOpen}
             onClose={handleCloseModal}
             employee={selectedEmployee}
             onSendWarning={handleSendWarning}
           />
        </>
    )
}

export default CardView