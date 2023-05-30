import React from "react";
import { deductionTotal, formattedNumber } from "../../utils/total";

const Deductions = ({ employee }: any) => {
  return (
    <div className="flex-1 p-4 border border-zinc-200 rounded-md flex flex-col justify-between">
      <div className="">
        <h2 className="font-bold mb-6 text-lg lg:text-xl">Deductions</h2>
        <div className="mb-4">
          <span className="font-bold">Tax:</span>{" "}
          <span className="text-zinc-500 text-sm">
            {employee.deductions?.tax}
          </span>
        </div>
        <div className="mb-4">
          <span className="font-bold">Pension:</span>{" "}
          <span className="text-zinc-500 text-sm">
            {employee.deductions?.pension}
          </span>
        </div>
      </div>
      <div className="">
        <h2 className="text-lg">
          <span className="font-bold">Total:</span>{" "}
          <span className="">
            ₦ {formattedNumber(deductionTotal(employee))}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default Deductions;
