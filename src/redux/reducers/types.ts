export type Deductions = {
  tax: number;
  pension: number;
};

export type Earnings = {
  basic: number;
  transport: number;
  overtime: number;
  housing: number;
};

export type Employee = {
  id: number;
  name: string;
  email: string;
  position: string;
  cadreLevel: string;
  isAdmin: boolean;
  earnings: Earnings;
  deductions: Deductions;
};
