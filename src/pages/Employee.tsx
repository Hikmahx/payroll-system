import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Deduction from "../components/Employee/Deductions";
import Earnings from "../components/Employee/Earnings";
import Loading from "../components/shared/Loading";
import { getSingleEmployee } from "../redux/reducers/employeesSlice";
import { RootState } from "../redux/store";
import { useParams } from "react-router-dom";

const Employee = () => {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

  const { loading, error, errMsg, employee } = useSelector(
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
                      <div
                        key={employee.id}
                        className="bg-white rounded-md p-8"
                      >
                        <h1 className="font-bold">Employee</h1>

                        <div className="flex">
                          <Earnings employee={employee} />
                          <Deduction employee={employee} />
                        </div>
                      </div>
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
