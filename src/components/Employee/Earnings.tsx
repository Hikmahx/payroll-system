import React from "react";
import { earningTotal, formattedNumber, overallTotal } from "../../utils/total";

const Deductions = ({ employee }: any) => {
  return (
    <div className="flex-1 p-4 border border-zinc-200 rounded-md flex flex-col justify-between">
      <div className="">
        <h2 className="font-bold mb-6  text-lg lg:text-xl">Earnings</h2>

        <div className="mb-4">
          <span className="font-bold">Basic:</span>{" "}
          <span className="text-zinc-500 text-sm">
            {employee.earnings.basic}
          </span>
        </div>
        <div className="mb-4">
          <span className="font-bold">Transport:</span>{" "}
          <span className="text-zinc-500 text-sm">
            {employee.earnings.transport}
          </span>
        </div>
        <div className="mb-4">
          <span className="font-bold">Overtime:</span>{" "}
          <span className="text-zinc-500 text-sm">
            {employee.earnings.overtime}
          </span>
        </div>
        <div className="mb-4">
          <span className="font-bold">Housing:</span>{" "}
          <span className="text-zinc-500 text-sm">
            {employee.earnings.housing}
          </span>
        </div>
      </div>
      <div className="">
        <h2 className="text-lg">
          <span className="font-bold">Total:</span>{" "}
          <span className="">
            {" "}
            ₦ {formattedNumber(earningTotal(employee))}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default Deductions;
