import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Deductions = ({ employee }: any) => {
  // const { loading, error, errMsg, employee } = useSelector(
  //   (state: RootState) => state.employees
  // );
  return (
    <div className="flex-1">
      <div className="mb-4">
        <span className="font-bold">Tax:</span>{" "}
        <span className="text-zinc-500">{employee.deductions?.tax}</span>
      </div>
      <div className="mb-4">
        <span className="font-bold">Pension:</span>{" "}
        <span className="text-zinc-500">{employee.deductions?.pension}</span>
      </div>
    </div>
  );
};

export default Deductions;
