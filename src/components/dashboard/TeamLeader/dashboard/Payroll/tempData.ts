export interface PayrollData {
  breakdown: {
    month: string;
    workingDays: number;
    workingHours: number;
    nextPayday: {
      day: string;
      date: string;
    };
    expenses: {
      total: number;
      baseSalary: number;
      overtime: number;
      other: number;
    };
  };
  summary: {
    salary: number;
    deductions: number;
    total: number;
    status: string;
  };
  incomeChart: {
    data: Array<{
      name: string;
      value: number;
    }>;
  };
  userInfo: {
    name: string;
    designation: string;
  };
}

const months = [
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

const generateMonthlyData = (): PayrollData[] => [
  {
    breakdown: {
      month: months[9],
      workingDays: 22,
      workingHours: 176,
      nextPayday: {
        day: "Friday",
        date: "January 28",
      },
      expenses: {
        total: 8500,
        baseSalary: 7000,
        overtime: 1000,
        other: 500,
      },
    },
    summary: {
      salary: 7000,
      deductions: 1500,
      total: 5500,
      status: "Paid",
    },
    incomeChart: {
      data: [
        { name: "Week 1", value: 1500 },
        { name: "Week 2", value: 1800 },
        { name: "Week 3", value: 1600 },
        { name: "Week 4", value: 2000 },
      ],
    },
    userInfo: {
      name: "John Doe",
      designation: "Senior Developer",
    },
  },
];

export const tempPayrollData: Record<string, PayrollData[]> = months.reduce(
  (acc, month) => {
    acc[month] = generateMonthlyData();
    return acc;
  },
  {} as Record<string, PayrollData[]>
);
