import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Deduction from "../components/Employee/Deductions";
import Earnings from "../components/Employee/Earnings";
import Loading from "../components/shared/Loading";
import {
  getSingleEmployee,
  updateEmployeeData,
} from "../redux/reducers/employeesSlice";
import { RootState } from "../redux/store";
import { useParams } from "react-router-dom";
import { formattedNumber, overallTotal } from "../utils/total";
import EmployeeForm from "../components/Home/EmployeeForm";

const Employee = () => {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

  const { loading, error, errMsg, employee, update } = useSelector(
    (state: RootState) => state.employees
  );

  type ParamsType = {
    id: string;
  };

  const { id } = useParams<keyof ParamsType>() as ParamsType;

  // const { pickedDate, submitted } = useSelector((state) => state.calendar);

  useEffect(() => {
    dispatch(getSingleEmployee(id));
    // eslint-disable-next-line
  }, []);

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
              <section className="min-h-[85vh] p-8">
                {employee.length > 0 && (
                  <>
                    {employee.map((employee) => (
                      <>
                        {!update ? (
                          // DISPLAY THE USER DETAILS IF CURRENTLY NOT BEING UPDATED
                          <div
                            key={employee.id}
                            className="bg-white rounded-md p-8 relative"
                          >
                            <h1 className="font-bold mb-8">Employee Details</h1>

                            <button
                              onClick={() => dispatch(updateEmployeeData(true))}
                            >
                              <span className="sr-only">
                                Update Employee Details
                              </span>
                              <i className="fa-sharp fa-solid fa-pen absolute top-8 right-8 text-zinc-500"></i>
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
          <p className=" mt-20 text-center text-very-dark-blue min-h-[30vh]">
            {errMsg}.
          </p>
        </>
      )}
    </>
  );
};

export default Employee;
