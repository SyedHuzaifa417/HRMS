export interface PayrollData {
  id: string;
  month: string;
  year: number;
  userInfo: {
    name: string;
    designation: string;
  };
  salary: number;
  deductions: number;
  total: number;
  status: string;
}

export const formatCurrency = (amount: number): string => {
  return `Rs. ${amount.toLocaleString()}`;
};


export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Sample data instance - this will be replaced by API data
export const tempPayrollData: PayrollData[] = [
  {
    id: "1",
    month: "November",
    year: 2024,
    userInfo: {
      name: "Ahmad Ali",
      designation: "UX Designer",
    },
    salary: 55000,
    deductions: 0,
    total: 57400,
    status: "Pending",
  },
  {
    id: "2",
    month: "November",
    year: 2024,
    userInfo: {
      name: "Sohail Saqib",
      designation: "Graphic Designer",
    },
    salary: 55000,
    deductions: 0,
    total: 57400,
    status: "Pending",
  },
  {
    id: "3",
    month: "November",
    year: 2024,
    userInfo: {
      name: "Khumsa Khan",
      designation: "Web Designer",
    },
    salary: 55000,
    deductions: 0,
    total: 57400,
    status: "Pending",
  },
  {
    id: "4",
    month: "November",
    year: 2024,
    userInfo: {
      name: "Faiza Khan",
      designation: "Marketing",
    },
    salary: 55000,
    deductions: 0,
    total: 57400,
    status: "Pending",
  },
  {
    id: "5",
    month: "November",
    year: 2024,
    userInfo: {
      name: "Asghar Ali",
      designation: "Product Designer",
    },
    salary: 55000,
    deductions: 0,
    total: 57400,
    status: "Pending",
  },
  {
    id: "6",
    month: "October",
    year: 2024,
    userInfo: {
      name: "Ahmad Ali",
      designation: "UX Designer",
    },
    salary: 50000,
    deductions: 1000,
    total: 49000,
    status: "Paid",
  },
  {
    id: "7",
    month: "October",
    year: 2024,
    userInfo: {
      name: "Sohail Saqib",
      designation: "Graphic Designer",
    },
    salary: 52000,
    deductions: 500,
    total: 51500,
    status: "Paid",
  },
  {
    id: "9",
    month: "March",
    year: 2025,
    userInfo: {
      name: "Asghar Ali",
      designation: "Consultant",
    },
    salary: 60000,
    deductions: 2000,
    total: 58000,
    status: "Pending",
  },
  {
    id: "10",
    month: "May",
    year: 2025,
    userInfo: {
      name: "Nafay Butt",
      designation: "Consultant",
    },
    salary: 60000,
    deductions: 2000,
    total: 58000,
    status: "Processing",
  },
  {
    id: "11",
    month: "January",
    year: 2025,
    userInfo: {
      name: "Amir Agha",
      designation: "Consultant",
    },
    salary: 60000,
    deductions: 2000,
    total: 58000,
    status: "Paid",
  },
];

export const payrollSummary = [
  {
    month: "January",
    amount: 420000,
    changePercentage: 4.1,
    isIncrease: true,
  },
  {
    month: "February",
    amount: 390000,
    changePercentage: 2.3,
    isIncrease: false,
  },
  {
    month: "March",
    amount: 450000,
    changePercentage: 5.3,
    isIncrease: true,
  },
  {
    month: "April",
    amount: 470000,
    changePercentage: 3.8,
    isIncrease: true,
  },
  {
    month: "May",
    amount: 430000,
    changePercentage: 1.9,
    isIncrease: false,
  }, {
    month: "June",
    amount: 500000,
    changePercentage: 6.7,
    isIncrease: true,
  },
  {
    month: "July",
    amount: 500000,
    changePercentage: 6.7,
    isIncrease: true,
  },
  {
    month: "August",
    amount: 500000,
    changePercentage: 6.0,
    isIncrease: true,
  },
];

export const companyExpense = [
  {
    month: "January",
    amount: 460000,
    changePercentage: 2.5,
    isIncrease: true,
  },
  {
    month: "February",
    amount: 440000,
    changePercentage: 3.2,
    isIncrease: false,
  },
  {
    month: "March",
    amount: 485000,
    changePercentage: 5.3,
    isIncrease: true,
  },
  {
    month: "April",
    amount: 470000,
    changePercentage: 1.1,
    isIncrease: false,
  },
  {
    month: "May",
    amount: 500000,
    changePercentage: 6.7,
    isIncrease: true,
  },
  {
    month: "June",
    amount: 500000,
    changePercentage: 6.7,
    isIncrease: true,
  },
  {
    month: "July",
    amount: 500000,
    changePercentage: 6.7,
    isIncrease: true,
  },
  {
    month: "August",
    amount: 500000,
    changePercentage: 6.0,
    isIncrease: true,
  },
];

export const payrollPeriod = {
  currentPeriod: {
    start: "1st Nov",
    end: "13th Nov",
    label: "Today",
  },
  nextPeriod: {
    start: "14th Nov",
    end: "30th Nov",
    label: "Upcoming Biweekly payment",
  },
  upcomingPayday: "17th Nov",
  monthlyPayday: "30th Nov",
};
export const breakdown = {
  month: "November",
  workingDays: 21,
  totalHours: 168,
  totalExpense: 485000,
  baseSalary: 420000,
  nextPayday: [
    {
      type: "Biweekly",
      date: "17th Nov",
    },
    { type: "Monthly", date: "30th Nov" },
  ],
  overtime: 35000,
  other: 30000,
};
export const requests =[
  {
    title: "Mehreen Saqib",
    desc1: "Request to work overtime",
    desc2: "",
  },
  {
    title: "Mehreen Saqib",
    desc1: "Requestfor Early Payments",
    desc2: "",
  },
]

