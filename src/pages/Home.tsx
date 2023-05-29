// import React, { useEffect } from "react";
import EmployeeForm from "../components/Home/EmployeeForm";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../redux/store";

const DashBoard = () => {
  document.title = "Payroll System";

  // const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <EmployeeForm />
    </div>
  );
};

export default DashBoard;
