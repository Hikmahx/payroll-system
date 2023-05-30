import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../redux/store";
import Loading from "../shared/Loading";
import { getEmployees } from "../../redux/reducers/employeesSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { deductionTotal, earningTotal, formattedNumber } from "../../utils/total";

const EmployeesTable = () => {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

  const { loading, error, errMsg, employees } = useSelector(
    (state: RootState) => state.employees
  );

  // const { pickedDate, submitted } = useSelector((state) => state.calendar);

  useEffect(() => {
    dispatch(getEmployees());
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
              <section className="w-full px-6 xl:pr-0 py-4 lg:rounded-md lg:flex-1 lg:overflow-scroll scrollbar-hide">
                <h2 className="sr-only">data table</h2>
                <div className="bg-white w-full overflow-x-auto rounded-md p-4">
                  <table
                    className="table-auto text-left w-full overflow-x-scroll scroll-smooth text-xs"
                    // tabIndex="0"
                  >
                    <thead className="text-bright-navy whitespace-nowrap font-light ">
                      <tr className="font-bold border-b border-gray">
                        <th className="px-2 py-4"></th>
                        <th className="px-2 py-4">Name</th>
                        <th className="px-2 py-4">Email</th>
                        <th className="px-2 py-4">Earnings</th>
                        <th className="px-2 py-4">Deductions</th>
                      </tr>
                      <tr className="h-6"></tr>
                    </thead>
                    <tbody className="mt-4  whitespace-nowrap">
                      {employees.length > 0 ? (
                        <>
                          {employees.map((employee, index) => (
                            <tr
                              key={employee.id}
                              className="relative even:bg-white odd:bg-cyan-800 odd:bg-opacity-5 border-b border-gray"
                            >
                              <td className="px-2 py-2">{index + 1}</td>
                              <td className="px-2 py-2 capitalize">
                                {employee.name}
                                <Link
                                  to={`${employee.id}`}
                                  className=" absolute inset-0"
                                >
                                  <span className="sr-only">
                                    {employee.id} employee detail
                                  </span>
                                </Link>
                              </td>
                              <td className="px-2 py-2">{employee.email}</td>
                              <td className="px-2 py-2 capitalize ">
                                ₦{" "}
                                <span className="text-green-600">
                                  {formattedNumber(earningTotal(employee))}
                                </span>
                              </td>
                              <td className="px-2 py-2 capitalize ">
                                ₦{" "}
                                <span className="text-red-600">
                                  {formattedNumber(deductionTotal(employee))}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <>
                          <tr className="">
                            <td className="">No data available</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
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

export default EmployeesTable;
