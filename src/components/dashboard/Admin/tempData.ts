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

export interface Employee {
  id: string;
  name: string;
  position: string;
  location: string;
  phone: string;
  rating?:string;
  email: string;
  isOffline: boolean;
  onLeave?: boolean;
}

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
