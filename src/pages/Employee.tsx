import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Deduction from "../components/Employee/Deductions";
import Earnings from "../components/Employee/Earnings";
import Loading from "../components/shared/Loading";
import {
  deleteEmployee,
  getSingleEmployee,
  updateEmployeeData,
} from "../redux/reducers/employeesSlice";
import { RootState } from "../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { formattedNumber, overallTotal } from "../utils/total";
import EmployeeForm from "../components/Home/EmployeeForm/EmployeeForm";
import { useReactToPrint } from "react-to-print";

const Employee = () => {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

  const { loading, error, errMsg, employee, update } = useSelector(
    (state: RootState) => state.employees
  );

  type ParamsType = {
    id: string;
  };

  const { id } = useParams<keyof ParamsType>() as ParamsType;
  const navigate = useNavigate();
  let componentRef = useRef(null);

  useEffect(() => {
    dispatch(getSingleEmployee(id));
    // eslint-disable-next-line
  }, []);

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      dispatch(deleteEmployee(id));
      navigate("/employees");
      alert("Delete successful");
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${
      employee.length > 0 && employee[0].name.replace(/\s/g, "-")
    }-Payslip`,
    onPrintError: () => alert("there is an error when printing"),
  });

  return (
    <>
      {!error ? (
        <>
          {loading ? (
            <>
              <Loading />
            </>
          ) : (
            <>
              <section className="min-h-[85vh] p-4 lg:p-8" ref={componentRef}>
                {employee.length > 0 && (
                  <>
                    {employee.map((employee) => (
                      <>
                        {!update ? (
                          // DISPLAY THE USER DETAILS IF CURRENTLY NOT BEING UPDATED
                          <div
                            key={employee.id}
                            className="bg-white rounded-md p-3 lg:p-8 relative print:mt-12"
                          >
                            <h1 className="font-bold mb-8 mt-12 lg:mt-0 print:text-3xl">
                              Employee Details
                            </h1>

                            <button
                              onClick={() => dispatch(updateEmployeeData(true))}
                              className="print:hidden"
                            >
                              <span className="sr-only">
                                Update Employee Details
                              </span>
                              <i className="fa-sharp fa-solid fa-pen absolute top-8 right-16 text-zinc-500"></i>
                            </button>
                            <button
                              onClick={handleDelete}
                              className="print:hidden"
                            >
                              <span className="sr-only">Delete Employe</span>
                              <i className="fa-solid fa-trash absolute top-8 right-8 text-zinc-500"></i>
                            </button>
                            <div className="info p-4 border border-zinc-200 rounded-md">
                              <p className="mb-4">
                                <span className="font-bold">Name:</span>{" "}
                                <span className="text-zinc-500 text-sm capitalize">
                                  {employee.name}
                                </span>
                              </p>
                              <p className="mb-4">
                                <span className="font-bold">Email:</span>{" "}
                                <span className="text-zinc-500 text-sm break-words">
                                  {employee.email}
                                </span>
                              </p>
                              <p className="mb-4">
                                <span className="font-bold">Cadre Level:</span>{" "}
                                <span className="text-zinc-500 text-sm capitalize">
                                  {employee.cadreLevel}
                                </span>
                              </p>
                              <p className="mb-4">
                                <span className="font-bold">Position:</span>{" "}
                                <span className="text-zinc-500 text-sm capitalize">
                                  {employee.position}
                                </span>
                              </p>
                            </div>
                            <div className="flex flex-col lg:flex-row gap-5 my-6">
                              <Earnings employee={employee} />
                              <Deduction employee={employee} />
                            </div>
                            <div className="info p-4 border border-zinc-200 rounded-md">
                              <h2 className="text-lg">
                                <span className="font-bold">
                                  Overall Total:
                                </span>{" "}
                                <span className="">
                                  ₦ {formattedNumber(overallTotal(employee))}
                                </span>
                              </h2>
                            </div>
                            <div className="print:hidden">
                              <button
                                onClick={handlePrint}
                                className="bg-cyan-500 px-6 py-2 text-white border border-cyan-500 font-bold rounded-md mb-3 w-full lg:w-fit my-6 max-w-sm"
                              >
                                Print Payslip
                              </button>
                            </div>
                          </div>
                        ) : (
                          // HIDE USER DETAILS AND DISPLAYS A FORM
                          <>
                            <EmployeeForm employee={employee} />
                          </>
                        )}
                      </>
                    ))}
                  </>
                )}
              </section>
            </>
          )}
        </>
      ) : (
        <>
          <p className=" mt-20 text-center text-very-dark-blue min-h-[85vh]">
            {errMsg}.
          </p>
        </>
      )}
    </>
  );
};

export default Employee;
