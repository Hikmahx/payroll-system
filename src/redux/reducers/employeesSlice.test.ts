import { configureStore } from "@reduxjs/toolkit";
// import { act } from "react-dom/test-utils";
// import { AppDispatch } from "../store";
import employeesReducer, {
  addEmployee, EmployeesState,
  // getEmployees,
  // updateEmployee,
  // updateEmployeeData,
} from "./employeesSlice";
import reducer from './employeesSlice'
import { Employee } from "./types";

describe("employeesSlice", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        employees: employeesReducer,
      },
    });
    
  });

  test('should return the initial state', () => {
    const state = store.getState() as any;
    expect(state.employees).toEqual(
      {
        employees: [],
        employee: [],
        error: false,
        loading: false,
        errMsg: "" ,
        update: false,
      }
    )
  })
});
