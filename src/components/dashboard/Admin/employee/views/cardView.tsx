// import { EmployeeAction, EmployeeActions, EmployeeAvatar, EmployeeCard, EmployeeContainer, EmployeeDesc1, EmployeeDesc2, EmployeeDetail1, EmployeeDetail2, EmployeeName, } from "@/components/ui/shared/EmployeeCard";

// import { MdMailOutline, MdOutlinePhone } from "react-icons/md";

// export const renderGrid = (employees: Employee[]) => (
//     <div className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-x-5 gap-y-7">
//       {employees.map(emp => (
//         <EmployeeCard key={emp.id} status={emp.isOffline ? { text: "Offline", colorClass: "bg-black" } : { text: "Online", colorClass: "bg-[#585757]" }}>
//        <div className='flex items-center justify-self-start gap-2 mt-4 px-2'>
//           <EmployeeAvatar />
//             <div className='flex flex-col items-start'>
//                 <EmployeeName>{emp.name}</EmployeeName>
//                 <EmployeeDetail1>{emp.position}</EmployeeDetail1>
//                 <EmployeeDetail2>{emp.location}</EmployeeDetail2>
//             </div>
//             </div>
//             <EmployeeContainer>
//               <EmployeeDesc1><MdOutlinePhone size={25}/> <div className="text-lg">{emp.phone}</div></EmployeeDesc1>
//               <EmployeeDesc2><MdMailOutline size={25}/><div className="text-lg truncate w-48">{emp.email}</div></EmployeeDesc2>
//             </EmployeeContainer>
//             <EmployeeActions>
//               <EmployeeAction>Message</EmployeeAction>
//               {!emp.onLeave && <EmployeeAction>Performance</EmployeeAction>}
//             </EmployeeActions>
//         </EmployeeCard>
//       ))}
//     </div>
//   );
