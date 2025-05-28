import {
  EmployeeFormData
} from "@/components/ui/shared/Forms/types/types";

export const requests = [
  {
    name: "Team Lead",
    message:
      "The Instagram posts and reels for retail brand will be worked on today",
  },
  {
    name: "You",
    message:
      "We will deliver Wireframes for E-commerce website by the end of the day",
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
    title: "Complete Wireframe by today",
    desc1: "25/1/24",
    desc2: "1:00pm to 2:00pm",
  },
  {
    title: "Discuss App Ideas",
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


export const rawData: EmployeeFormData = {
  name: "Khunsa Khan",
  rating: "4.2",
  employmentType: "Full-time | Remote",
  location: "Karachi",
  designation: "UX Designer",
  dateJoined: "12th August 2022",
  
  // Personal details
  fullName: "Ahmad Ali",
  email: "ahmadali@email.com",
  address: "Flat No 25, Orchid Apartments, Street 25, Hussain Chowk.",
  phone: +923223455698,
  gender: "Female",
  age: "25",
  city: "Lahore",
  state: "Punjab",
  fatherName: "Muhammad Ashraf Ali",
  motherName: "Khadija Ashraf",
  fatherPhone: +923213450987,
  motherPhone: +923234560987,
  bankName: "Meezan Bank",
  accountHolder: "Ahmad Ali",
  accountNumber: 1234567890,
  branchCode: "LHR01",
  branchAddress: "Zafar Ali Rd, Gulberg, Lahore",
  
  // Professional details
  workExperiences: [
    {
      previousDesignation: "UX Design Intern",
      companyName: "Virtual Sights",
      workExperience: "6 Month Internship",
      fromMonth: "June",
      toMonth: "November",
    }
  ],
  employeeResume: null,
  referenceLetter: null,
  linkedin: "https://linkedin.com/in/ahmadali1234",
  portfolio: "https://www.behance.net/ahmadali54",
  educations: [
    {
      degreeProgram: "BS Design",
      instituteName: "COMSATS University, Lahore Campus",
      eduFrom: "2016",
      eduTo: "2020",
    }
  ],
  certifications: [
    {
      certificationName: "Graphic Design Course",
      certificationInstitute: "Coursera",
      certificateFrom: "2021",
      certificateTo: "2022",
    }
  ],
  
  // Contract details
  department: "Design Department",
  contractUrl: null,
  from: "December 2022",
  to: "Present",
  salaryType: "Monthly",
  monthlySalary: "Rs. 150,000",
  annualSalary: "Rs. 600,000",
  paymentRate: "2000 PKR/Day",
  bonuses: "Yes",
};
