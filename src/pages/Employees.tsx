import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import EmployeesTable from "../components/Employees/EmployeesTable";
import { updateEmployeeData } from "../redux/reducers/employeesSlice";
import { AppDispatch } from "../redux/store";

const Employees = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(updateEmployeeData(false));
    // eslint-disable-next-line
  }, []);

  return (
    <section className="min-h-[80vh]">
      <h1 className="font-bold my-12 px-8">All Employees</h1>
      <EmployeesTable />
    </section>
  );
};

export default Employees;
