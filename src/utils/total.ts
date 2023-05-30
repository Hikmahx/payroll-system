import { Employee } from "../redux/reducers/types";

export const deductionTotal = (employee: Employee) => {
  return employee.deductions.tax + employee.deductions.pension;
};

export const earningTotal = (employee: Employee) => {
  return (
    employee.earnings.basic +
    employee.earnings.housing +
    employee.earnings.overtime +
    employee.earnings.transport
  );
};

export const overallTotal = (employee: Employee) => {
  return earningTotal(employee) - deductionTotal(employee);
};

export const formattedNumber = (number: number): string => {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
