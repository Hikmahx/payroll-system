import React from "react";

const Deductions = ({ employee }: any) => {
  return (
    <div className="flex-1">
      <div className="mb-4">
        <span className="font-bold">Basic:</span>{" "}
        <span className="text-zinc-500">{employee.earnings.basic}</span>
      </div>
      <div className="mb-4">
        <span className="font-bold">Transport:</span>{" "}
        <span className="text-zinc-500">{employee.earnings.transport}</span>
      </div>
      <div className="mb-4">
        <span className="font-bold">Overtime:</span>{" "}
        <span className="text-zinc-500">{employee.earnings.overtime}</span>
      </div>
      <div className="mb-4">
        <span className="font-bold">Housing:</span>{" "}
        <span className="text-zinc-500">{employee.earnings.housing}</span>
      </div>
    </div>
  );
};

export default Deductions;
