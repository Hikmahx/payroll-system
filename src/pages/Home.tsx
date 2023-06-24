import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../components/Home/EmployeeForm/EmployeeForm";
import Success from "../components/Home/Success";
import { updateEmployeeData } from "../redux/reducers/employeesSlice";
import { AppDispatch, RootState } from "../redux/store";

const DashBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { employees } = useSelector((state: RootState) => state.employees);
  const navigate = useNavigate();
  const isFirstRender = useRef(true);
  const [newEmployee, setNewEmployee] = useState(false);

  useEffect(() => {
    dispatch(updateEmployeeData(false));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      // THIS EFFECT WILL BE TRIGGERED ONLY WHEN THE EMPLOYEES STATE INCREASES
      setNewEmployee(true);

      const timeout = setTimeout(() => {
        setNewEmployee(false);
        // WILL REDIRECT AFTER TO EMPLOYEES PAGE
        navigate("employees");
      }, 3000);

      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line
  }, [employees]);

  document.title = "Payroll System";

  return (
    <>
      {!newEmployee ? (
        <>
          <EmployeeForm />
        </>
      ) : (
        <>
          <Success />
        </>
      )}
    </>
  );
};

export default DashBoard;
