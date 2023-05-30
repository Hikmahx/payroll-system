// import React, { useEffect } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import EmployeeForm from "../components/Home/EmployeeForm";
import { updateEmployeeData } from "../redux/reducers/employeesSlice";
import { AppDispatch } from "../redux/store";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../redux/store";




const DashBoard = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(updateEmployeeData(false))
    // eslint-disable-next-line
  }, [])
  document.title = "Payroll System";

  // const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <EmployeeForm />
    </div>
  );
};

export default DashBoard;
