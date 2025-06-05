
import { Attendance } from "./attendance/index";
import { Employee } from "./employee/views/TableView";

///////////////////////////////// Dashboard ///////////////////////////////////////////

export const kpiData = [
  { label: "Jan", value: 24 },
  { label: "Feb", value: 12 },
  { label: "Mar", value: 65 },
  { label: "Apr", value: 35 },
  { label: "May", value: 78 },
  { label: "Jun", value: 57 },
  { label: "Jul", value: 95 },
  { label: "Aug", value: 38 },
  { label: "Sep", value: 42 },
  { label: "Oct", value: 56 },
  { label: "Nov", value: 23 },
  { label: "Dec", value: 33 },
];
export const attendanceData = [
  { label: "Jan", onTime: 40, late: 15, absent: 15 },
  { label: "Feb", onTime: 62, late: 24, absent: 44 },
  { label: "Mar", onTime: 73, late: 33, absent: 34 },
  { label: "Apr", onTime: 44, late: 41, absent: 22 },
  { label: "May", onTime: 85, late: 67, absent: 35 },
  { label: "Jun", onTime: 96, late: 15, absent: 19 },
  { label: "Jul", onTime: 57, late: 21, absent: 44 },
  { label: "Aug", onTime: 98, late: 35, absent: 17 },
  { label: "Sep", onTime: 75, late: 26, absent: 32 },
  { label: "Oct", onTime: 63, late: 33, absent: 21 },
  { label: "Nov", onTime: 83, late: 28, absent: 16 },
  { label: "Dec", onTime: 40, late: 43, absent: 24 },
];
export const genderData = [
  { label: "Women", value: 3 },
  { label: "Men", value: 9 },
];
export const requests = [
  {
    name: "Ahmad Ali",
    department: "UX Designer",
    message:
      "I would like to request for would like to request for for would like to request for for would like to request for",
    avatar: "/auth/done.png",
  },
  {
    name: "Faiza Khan",
    department: "Marketing",
    message:
      "I would like to request for would like to request for for would like to request forfor would like to request for",
  },
];

export const upcomingInterviews = [
  {
    title: "Mehreen Saqib",
    desc1: "Digital Marketing",
    desc2: "Lahore",
  },
  {
    title: "Fahad Mustafa",
    desc1: "Sr. Developer",
    desc2: "Karachi",
  },
  {
    title: "Omer Iqbal",
    desc1: "Full-Stack Developer",
    desc2: "Karachi",
  },
  {
    title: "Fahad Mustafa",
    desc1: "Sr. Developer",
    desc2: "Karachi",
  },
  {
    title: "Omer Iqbal",
    desc1: "Full-Stack Developer",
    desc2: "Karachi",
  },
];

export const scheduleItems = [
  {
    title: "ZOOM Meet with all Teams",
    desc1: "25/1/24",
    desc2: "10:30am to 11:15am",
  },
  {
    title: "Meeting with Dev Team",
    desc1: "25/1/24",
    desc2: "12:00pm to 1:00pm",
  },
  {
    title: "Break Time",
    desc1: "25/1/24",
    desc2: "1:00pm to 2:00pm",
  },
  {
    title: "Add event",
    desc1: "25/1/24",
    desc2: "2:00pm to 3:00pm",
  },
  {
    title: "ZOOM Meet with all Teams",
    desc1: "25/1/24",
    desc2: "10:30am to 11:15am",
  },
  {
    title: "Meeting with Dev Team",
    desc1: "25/1/24",
    desc2: "12:00pm to 1:00pm",
  },
];

export const mockMessages = [
  {
    id: "1",
    sender: "Aisha Khalid",
    content: "Someone Kindly share Zoom link with me",
    timestamp: new Date(),
    status: "sent" as const,
  },
  {
    id: "2",
    sender: "Shahid Usman",
    content: "Team lunch today @everyone?",
    timestamp: new Date(),
    status: "sent" as const,
  },
  {
    id: "3",
    sender: "Hamza Ali",
    content: "This months pay will be sent out by Tuesday @everyone",
    timestamp: new Date(),
    status: "sent" as const,
  },
];

///////////////////////////////// employee ///////////////////////////////////////////

export const allEmployees: Employee[] = [
  {
    id: '1',
    name: 'Ahmad Ali',
    position: 'UX Designer',
    rating: "4.5",
    location: 'Remote | Lahore',
    phone: '+92 232 345 5698',
    email: 'ahmadali@email.com',
    isOffline: true,
    onLeave: true,
  },
  {
    id: '2',
    name: 'Hamza Farhan',
    position: 'Accounts Manager',
    location: 'Remote | Gujranwala',
    phone: '+92 232 345 5698',
    email: 'hamzaf@email.com',
    isOffline: true,
    onLeave: true,
  },
  {
    id: '3',
    name: 'Sohail Saqib',
    position: 'Graphic Designer',
    location: 'Remote | Lahore',
    phone: '+92 232 345 5698',
    email: 'saqibsohail@email.com',
    isOffline: true,
    onLeave: false,
  },
  {
    id: '4',
    name: 'Khunsa Khan',
    position: 'Web Designer',
    location: 'Remote | Karachi',
    phone: '+92 232 345 5698',
    email: 'khunsakhan@email.com',
    isOffline: false,
    onLeave: false,
  },
  {
    id: '5',
    name: 'Asghar Ali',
    position: 'Product Developer',
    location: 'In-house | Islamabad',
    phone: '+92 232 345 5698',
    email: 'asgharali@email.com',
    isOffline: false,
    onLeave: false,
  },
  {
    id: '6',
    name: 'Faiza Khan',
    position: 'Marketing',
    location: 'In-house | Islamabad',
    phone: '+92 232 345 5698',
    email: 'faizakhan@email.com',
    isOffline: false,
    onLeave: false,
  },
  {
    id: '7',
    name: 'Farhan Agha',
    position: 'Consultant',
    location: 'In-house | Islamabad',
    phone: '+92 232 345 5698',
    email: 'farhanagha@email.com',
    isOffline: false,
    onLeave: false,
  },
  {
    id: '8',
    name: 'Zarik Shehzad',
    position: 'Sr. Designer',
    location: 'In-house | Islamabad',
    phone: '+92 232 345 5698',
    email: 'zarikshehzad@email.com',
    isOffline: false,
    onLeave: false,
  },
  {
    id: '9',
    name: 'Shahid Usman',
    position: 'Product Developer',
    location: 'In-house | Islamabad',
    phone: '+92 232 345 5698',
    email: 'shahidusman@email.com',
    isOffline: false,
    onLeave: false,
  },
  {
    id: '10',
    name: 'Nafay Butt',
    position: 'Marketing',
    location: 'In-house | Islamabad',
    phone: '+92 232 345 5698',
    email: 'nafaybutt@email.com',
    isOffline: false,
    onLeave: false,
  },
];


///////////////////////////////// attendance ///////////////////////////////////////////

export const attendance: Attendance[] = [
  {
    id: "1",
    name: "Alice Johnson",
    title: "Software Engineer",
    date: "2025-05-27T00:00:00.000Z",
    checkIn: "2025-05-27T09:05:00.000Z",
    checkOut: "2025-05-27T17:15:00.000Z",
    status: "Present",
    location: "Remote | Lahore",
    department: "Development",
    incidents: [
      { date: "2025-05-25T00:00:00.000Z", type: "Late Check-In" },
      { date: "2025-05-22T00:00:00.000Z", type: "Missing Attendance" }
    ],
    warningIssued: true,
    warningLetter: {
      status: "Acknowledged",
      content: "Repeated late check-ins."
    }
  },
  {
    id: "2",
    name: "Mark Davis",
    title: "Project Manager",
    date: "2025-05-27T00:00:00.000Z",
    checkIn: "2025-05-27T08:45:00.000Z",
    status: "On-Leave",
    location: "In-house | Islamabad",
    department: "Management",
    incidents: [],
    warningIssued: false,
    warningLetter: {
      status: "Pending",
      content: ""
    }
  },
  {
    id: "3",
    name: "Sandra Lee",
    title: "QA Analyst",
    date: "2025-05-27T00:00:00.000Z",
    checkIn: "2025-05-27T09:30:00.000Z",
    checkOut: "2025-05-27T16:50:00.000Z",
    status: "Present",
    location: "Remote | Multan",
    department: "Quality Assurance",
    incidents: [
      { date: "2025-05-20T00:00:00.000Z", type: "Late Check-In" }
    ],
    warningIssued: true,
    warningLetter: {
      status: "Pending",
      content: "Frequent late check-ins."
    }
  },
  {
    id: "4",
    name: "Tom Hanks",
    title: "DevOps Engineer",
    date: "2025-05-27T00:00:00.000Z",
    checkIn: "2025-05-27T10:00:00.000Z",
    status: "Absent",
    location: "In-house | Karachi",
    department: "Development",
    incidents: [
      { date: "2025-05-18T00:00:00.000Z", type: "Dress Code" }
    ],
    warningIssued: true,
    warningLetter: {
      status: "Acknowledged",
      content: "Dress code."
    }
  },
  {
    id: "5",
    name: "Elena Gilbert",
    title: "UI/UX Designer",
    date: "2025-05-27T00:00:00.000Z",
    checkIn: "2025-05-27T09:10:00.000Z",
    checkOut: "2025-05-27T18:00:00.000Z",
    status: "Present",
    location: "Remote | Islamabad",
    department: "Design",
    incidents: [],
    warningIssued: false,
    warningLetter: {
      status: "Pending",
      content: "Incomplete Attendance"
    }
  },
  {
    id: "6",
    name: "Nathan Drake",
    title: "Backend Developer",
    date: "2025-05-27T00:00:00.000Z",
    checkIn: "2025-05-27T08:55:00.000Z",
    checkOut: "2025-05-27T17:45:00.000Z",
    status: "Present",
    location: "In-house | Lahore",
    department: "Development",
    incidents: [],
    warningIssued: false,
    warningLetter: {
      status: "Pending",
      content: "Dress Code"
    }
  },
  {
    id: "7",
    name: "Chloe Price",
    title: "Frontend Developer",
    date: "2025-05-27T00:00:00.000Z",
    checkIn: "2025-05-27T09:20:00.000Z",
    status: "On-Leave",
    location: "Remote | Quetta",
    department: "Development",
    incidents: [],
    warningIssued: false,
    warningLetter: {
      status: "Pending",
      content: "Incomplete Attendance"
    }
  },
  {
    id: "8",
    name: "Bruce Wayne",
    title: "CTO",
    date: "2025-05-27T00:00:00.000Z",
    checkIn: "2025-05-27T07:30:00.000Z",
    checkOut: "2025-05-27T15:00:00.000Z",
    status: "Half Day",
    location: "In-house | Islamabad",
    department: "Executive",
    incidents: [
      { date: "2025-05-10T00:00:00.000Z", type: "Missing Attendance" }
    ],
    warningIssued: true,
    warningLetter: {
      status: "Acknowledged",
      content: "Missing full-day attendance."
    }
  },
  {
    id: "9",
    name: "Diana Prince",
    title: "HR Manager",
    date: "2025-05-27T00:00:00.000Z",
    checkIn: "2025-05-27T08:15:00.000Z",
    checkOut: "2025-05-27T16:30:00.000Z",
    status: "Present",
    location: "In-house | Lahore",
    department: "Human Resources",
    incidents: [],
    warningIssued: false,
    warningLetter: {
      status: "Pending",
      content: "Incomplete Attendance"
    }
  },
  {
    id: "10",
    name: "Clark Kent",
    title: "Content Strategist",
    date: "2025-05-27T00:00:00.000Z",
    checkIn: "2025-05-27T09:50:00.000Z",
    status: "Absent",
    location: "Remote | Karachi",
    department: "Marketing",
    incidents: [
      { date: "2025-05-24T00:00:00.000Z", type: "Dress Code" },
      { date: "2025-05-26T00:00:00.000Z", type: "Late Check-In" }
    ],
    warningIssued: true,
    warningLetter: {
      status: "Pending",
      content: "Multiple observed recently."
    }
  },
  {
    id: "11",
    name: "Barry Allen",
    title: "Intern",
    date: "2025-05-27T00:00:00.000Z",
    checkIn: "2025-05-27T10:30:00.000Z",
    checkOut: "2025-05-27T16:00:00.000Z",
    status: "Absent",
    location: "Remote | Lahore",
    incidents: [{date:"2025-05-26T00:00:00.000Z",type:"Late Check-In"},{date:"2025-05-26T00:00:00.000Z",type: "Dress Code"}],
    department: "Development",
    warningIssued: true,
    warningLetter: { status:"Acknowledged",
    content:"Intern requires re-orientation."}
  },
  {
    id: "12",
    name: "Rachel Green",
    title: "Marketing Executive",
    date: "2025-05-27T00:00:00.000Z",
    checkIn: "2025-05-27T09:40:00.000Z",
    checkOut: "2025-05-27T17:10:00.000Z",
    status: "Present",
    location: "Remote | Multan",
    incidents: [],
    department: "Marketing",
    warningIssued: false,
    warningLetter: { status:"Acknowledged",
      content:"Intern requires re-orientation."}
  },
  {
    id: "13",
    name: "Ross Geller",
    title: "Data Scientist",
    date: "2025-05-27T00:00:00.000Z",
    checkIn: "2025-05-27T10:00:00.000Z",
    status: "On-Leave",
    location: "In-house | Islamabad",
    incidents: [{date:"2025-05-26T00:00:00.000Z",type:"Missing Attendance"}],
    department: "Research",
    warningIssued: true,
    warningLetter: { status:"Pending",
      content:"Incomplete logs for last 3 days."}
  },
  {
    id: "14",
    name: "Joey Tribbiani",
    title: "Sales Associate",
    date: "2025-05-27T00:00:00.000Z",
    checkIn: "2025-05-27T09:05:00.000Z",
    checkOut: "2025-05-27T17:00:00.000Z",
    status: "Present",
    location: "Remote | Karachi",
    incidents: [],
    department: "Sales",
    warningIssued: false,
    warningLetter: { status:"Acknowledged",
      content:"Intern requires re-orientation."}
  },
  {
    id: "15",
    name: "Monica Geller",
    title: "Office Manager",
    date: "2025-05-27T00:00:00.000Z",
    checkIn: "2025-05-27T08:50:00.000Z",
    checkOut: "2025-05-27T17:25:00.000Z",
    status: "Present",
    location: "In-house | Lahore",
    incidents: [{date:"2025-05-26T00:00:00.000Z",type:"Dress Code"}],
    department: "Operations",
    warningIssued: true,
    warningLetter: { status:"Acknowledged",
      content:"Intern requires re-orientation."}
  }
];

export type LeaveReason = "sick" | "family" | "holiday" | "casual";
export type LeaveStatus = "approved" | "pending" | "declined";

export interface LeaveRequest {
  status: LeaveStatus;
  from: string;  
  to: string;
  application: string;
  reason: LeaveReason;
}

export interface AllowedLeaves {
  sick: number;
  family: number;
  holiday: number;
  casual: number;
}

export interface LeaveManagement {
  name: string;
  employmentType: "full-time" | "part-time" | "contract";
  title: string;
  allowedLeaves: AllowedLeaves;
  leaveRequests: LeaveRequest[];
}


export const employeesLeaves: LeaveManagement[] = [
  {
    name: "Syed Huzaifa",
    employmentType: "full-time",
    title: "Software Engineer",
    allowedLeaves: {
      sick: 8,
      family: 5,
      holiday: 10,
      casual: 7,
    },
    leaveRequests: [
      {
        status: "approved",
        from: "2025-06-15T00:00:00.000Z",
        to: "2025-06-17T00:00:00.000Z",
        reason: "family",
        application: `Dear Manager,

I would like to request leave from 15th to 17th June due to a family emergency.

There are some urgent matters I need to attend to, and I assure you I will ensure knowledge transfer before leaving.

Thanks & Regards,
Huzaifa`
      }
    ]
  },
  {
    name: "Ayesha Khan",
    employmentType: "part-time",
    title: "UI/UX Designer",
    allowedLeaves: {
      sick: 5,
      family: 4,
      holiday: 8,
      casual: 5,
    },
    leaveRequests: [
      {
        status: "pending",
        from: "2025-07-03T00:00:00.000Z",
        to: "2025-07-05T00:00:00.000Z",
        reason: "holiday",
        application: `Hi Team,

Planning a short trip with family over the weekend.
Requesting leave for 3rd to 5th July.

Will ensure all designs are submitted before I leave.

Thanks,
Ayesha`
      }, {
        status: "approved",
        from: "2025-06-15T00:00:00.000Z",
        to: "2025-06-17T00:00:00.000Z",
        reason: "family",
        application: `Dear Manager,

I would like to request leave from 15th to 17th June due to a family emergency.

There are some urgent matters I need to attend to, and I assure you I will ensure knowledge transfer before leaving.

Thanks & Regards,
Ayesha`
      }
    ]
  },
  {
    name: "Ali Raza",
    employmentType: "contract",
    title: "DevOps Engineer",
    allowedLeaves: {
      sick: 6,
      family: 3,
      holiday: 6,
      casual: 4,
    },
    leaveRequests: [
      {
        status: "declined",
        from: "2025-04-20T00:00:00.000Z",
        to: "2025-04-21T00:00:00.000Z",
        reason: "casual",
        application: `Dear Sir,

I had requested casual leave for personal reasons, but I understand it has been declined due to project deadlines.

Regards,
Ali`
      },
      {
        status: "pending",
        from: "2025-07-03T00:00:00.000Z",
        to: "2025-07-05T00:00:00.000Z",
        reason: "holiday",
        application: `Hi Team,

Planning a short trip with family over the weekend.
Requesting leave for 3rd to 5th July.

Will ensure all designs are submitted before I leave.

Thanks,
Ali`
      }, {
        status: "approved",
        from: "2025-06-15T00:00:00.000Z",
        to: "2025-06-17T00:00:00.000Z",
        reason: "family",
        application: `Dear Manager,

I would like to request leave from 15th to 17th June due to a family emergency.

There are some urgent matters I need to attend to, and I assure you I will ensure knowledge transfer before leaving.

Thanks & Regards,
Ali`
      }
    ]
  },
  {
    name: "Zainab Fatima",
    employmentType: "full-time",
    title: "QA Engineer",
    allowedLeaves: {
      sick: 8,
      family: 5,
      holiday: 10,
      casual: 6,
    },
    leaveRequests: [
      {
        status: "approved",
        from: "2025-08-01T00:00:00.000Z",
        to: "2025-08-03T00:00:00.000Z",
        reason: "sick",
        application: `Hi,

Was down with flu and fever, needed some rest and medication.

Leave request for 1st to 3rd August has been approved.

Regards,
Zainab`
      },
      {
        status: "declined",
        from: "2025-04-20T00:00:00.000Z",
        to: "2025-04-21T00:00:00.000Z",
        reason: "casual",
        application: `Dear Sir,

I had requested casual leave for personal reasons, but I understand it has been declined due to project deadlines.

Regards,
Zainab`
      },
      {
        status: "pending",
        from: "2025-07-03T00:00:00.000Z",
        to: "2025-07-05T00:00:00.000Z",
        reason: "holiday",
        application: `Hi Team,

Planning a short trip with family over the weekend.
Requesting leave for 3rd to 5th July.

Will ensure all designs are submitted before I leave.

Thanks,
Zainab`
      }, {
        status: "approved",
        from: "2025-06-15T00:00:00.000Z",
        to: "2025-06-17T00:00:00.000Z",
        reason: "family",
        application: `Dear Manager,

I would like to request leave from 15th to 17th June due to a family emergency.

There are some urgent matters I need to attend to, and I assure you I will ensure knowledge transfer before leaving.

Thanks & Regards,
Zainab`
      }
    ]
  },

];


export const leavesSetUp =[
    {
      id: '1',
      name: 'Annual Leaves per Employee',
      allowancePerYear: '14',
      employeeType: 'Full-time',
      employeeLevel: 'All Levels'
    },
    {
      id: '2',
      name: 'Sick Leaves per Employee',
      allowancePerYear: '16',
      employeeType: 'Full-time',
      employeeLevel: 'All Levels'
    },
    {
      id: '3',
      name: 'Casual Leaves per Employee',
      allowancePerYear: '10',
      employeeType: 'Full-time',
      employeeLevel: 'All Levels'
    },
    {
      id: '4',
      name: 'Festivities Leaves per Employee',
      allowancePerYear: '10',
      employeeType: 'Full-time',
      employeeLevel: 'All Levels'
    },
    {
      id: '5',
      name: 'Maternity Leave Women',
      allowancePerYear: '3 months',
      employeeType: 'Full-time',
      employeeLevel: 'All Levels'
    },
    {
      id: '6',
      name: 'Maternity Leave Men',
      allowancePerYear: '1 month',
      employeeType: 'Full-time',
      employeeLevel: 'All Levels'
    }
  ]