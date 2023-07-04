import { configureStore } from "@reduxjs/toolkit";
// import { act } from "react-dom/test-utils";
// import { AppDispatch } from "../store";
import employeesReducer, {
  addEmployee,
  deleteEmployee,
  // EmployeesState,
  getEmployees,
  getSingleEmployee,
  updateEmployee,
  // getEmployees,
  // updateEmployee,
  // updateEmployeeData,
} from "./employeesSlice";
import reducer from "./employeesSlice";
// import { Employee } from "./types";
import { rest } from "msw";
import { setupServer } from "msw/node";
// import { render } from "../../utils/test-utils";
import axios from "axios";

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
const server = setupServer(
  rest.get("/api/employees", (req, res, ctx) => {
    const employeesData = [
      {
        id: Date.now(),
        name: "John Doe",
        email: "johndoe@gmail.com",
        position: "accountant",
        cadreLevel: "Consultant",
        isAdmin: false,
        earnings: {
          basic: 5000,
          transport: 1000,
          overtime: 370,
          housing: 700,
        },
        deductions: {
          tax: 500,
          pension: 200,
        },
      },
    ];
    return res(ctx.json(employeesData));
  })
);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

const initialState = {
  employees: [],
  employee: [],
  error: false,
  loading: false,
  errMsg: "",
  update: false,
};

describe("employeesSlice", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        employees: employeesReducer,
      },
    });
  });

  test("should return the initial state", () => {
    const state = store.getState() as any;
    expect(state.employees).toEqual({
      employees: [],
      employee: [],
      error: false,
      loading: false,
      errMsg: "",
      update: false,
    });
  });

  test("render getEmployees from slice", async () => {
    jest.spyOn(getEmployees, "pending");
    // jest.spyOn(getEmployees, 'fulfilled');
    const store = configureStore({ reducer: employeesReducer });
    await store.dispatch(getEmployees());

    expect(await store.getState().employees.length).toBeGreaterThan(0);

    // expect(store.getState().employees).toEqual([formData]);
    // console.log(store.getState().employees);
    jest.spyOn(getEmployees, "pending").mockRestore();
  });

  test("sets state when getEmployees is pending", () => {
    const action = { type: getEmployees.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      employees: [],
      employee: [],
      error: false,
      loading: true,
      errMsg: "",
      update: false,
    });
  });

  test("sets state when getEmployees is fulfilled", () => {
    const formData = {
      id: Date.now(),
      name: "John Doe",
      email: "johndoe@gmail.com",
      position: "accountant",
      cadreLevel: "Consultant",
      isAdmin: false,
      earnings: {
        basic: 5000,
        transport: 1000,
        overtime: 370,
        housing: 700,
      },
      deductions: {
        tax: 500,
        pension: 200,
      },
    };

    const action = { type: getEmployees.fulfilled.type, payload: formData };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      employees: formData,
      employee: [],
      error: false,
      loading: false,
      errMsg: "",
      update: false,
    });
  });

  test("sets state when getEmployees is rejected", () => {
    const rejectedAction = {
      type: getEmployees.rejected.type,
      error: { message: "Error message" }, // Provide an error object with the message property
    };
    const state = reducer(initialState, rejectedAction);
    // console.log(state);
    expect(state).toEqual({
      employees: [],
      employee: [],
      error: true,
      loading: false,
      errMsg: "Error message",
      update: false,
    });
  });

  test("render addEmployee from slice", async () => {
    const formData = {
      id: Date.now(),
      name: "John Doe",
      email: "johndoe@gmail.com",
      position: "accountant",
      cadreLevel: "Consultant",
      isAdmin: false,
      earnings: {
        basic: 5000,
        transport: 1000,
        overtime: 370,
        housing: 700,
      },
      deductions: {
        tax: 500,
        pension: 200,
      },
    };
    jest.spyOn(addEmployee, "pending");
    // jest.spyOn(addEmployee, 'fulfilled');
    const store = configureStore({ reducer: employeesReducer });
    await store.dispatch(addEmployee(formData));

    expect(await store.getState().employees.length).toBeGreaterThan(0);
    jest.spyOn(addEmployee, "pending").mockRestore();
  });

  test("render addEmployee from slice with error handling", async () => {
    const formData = {
      id: Date.now(),
      name: "John Doe",
      email: "johndoe@gmail.com",
      position: "accountant",
      cadreLevel: "Consultant",
      isAdmin: false,
      earnings: {
        basic: 5000,
        transport: 1000,
        overtime: 370,
        housing: 700,
      },
      deductions: {
        tax: 500,
        pension: 200,
      },
    };

    // Mock the axios.post method to simulate an error response
    jest
      .spyOn(axios, "post")
      .mockRejectedValue(new Error("Some error message"));
    jest.spyOn(addEmployee, "pending");
    // console.log(jest.spyOn(addEmployee, "pending"));
    // jest.spyOn(addEmployee, "rejected");
    const store = configureStore({ reducer: employeesReducer });

    try {
      await store.dispatch(addEmployee(formData));

      expect(await store.getState().employees.length).toBe(0);
      jest.spyOn(addEmployee, "pending").mockRestore();
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
    }
  });

  test("render getSingleEmployee from slice", async () => {
    jest.spyOn(getSingleEmployee, "pending");
    jest.spyOn(getSingleEmployee, "fulfilled");
    const store = configureStore({ reducer: employeesReducer });
    await store.dispatch(getSingleEmployee("1685328248504"));
    expect(await store.getState().employee.length).toBeGreaterThan(0);
    jest.spyOn(getSingleEmployee, "pending").mockRestore();
  });

  test("render getSingleEmployee from slice with error handling", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error("Some error message"));
    jest.spyOn(getSingleEmployee, "pending");
    const store = configureStore({ reducer: employeesReducer });

    try {
      await store.dispatch(getSingleEmployee("1685328248504"));

      expect(await store.getState().employees.length).toBe(0);
      // expect(await store.getState().errMsg.toBe("Some error message"))
      jest.spyOn(getSingleEmployee, "pending").mockRestore();
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
    }
  });

  test("render updateEmployee from slice", async () => {
    const formData = {
      id: 1685328248504,
      name: "John Doe",
      email: "johndoe@gmail.com",
      position: "developer",
      cadreLevel: "Director",
      isAdmin: false,
      earnings: {
        basic: 5450,
        transport: 1000,
        overtime: 370,
        housing: 700,
      },
      deductions: {
        tax: 500,
        pension: 200,
      },
    };

    jest.spyOn(updateEmployee, "pending");
    jest.spyOn(updateEmployee, "fulfilled");
    const store = configureStore({ reducer: employeesReducer });
    await store.dispatch(
      updateEmployee({ dataInfo: formData, id: "1685328248504" })
    );
    expect(await store.getState().employee.length).toBeGreaterThan(0);
    jest.spyOn(updateEmployee, "pending").mockRestore();
  });

  test("render updateEmployee from slice with error handling", async () => {
    jest.spyOn(axios, "put").mockRejectedValue(new Error("Some error message"));
    jest.spyOn(updateEmployee, "pending");
    const store = configureStore({ reducer: employeesReducer });

    try {
      await store.dispatch(updateEmployee({ id: "1685328248504" }));

      expect(await store.getState().employees.length).toBe(0);
      jest.spyOn(updateEmployee, "pending").mockRestore();
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
    }
  });


  test("render deleteEmployee from slice", async () => {
    jest.spyOn(deleteEmployee, "pending");
    jest.spyOn(deleteEmployee, "fulfilled");
    const store = configureStore({ reducer: employeesReducer });
    await store.dispatch(deleteEmployee("1685328248504"));
    expect(await store.getState().employee.length).toBe(0);
    jest.spyOn(deleteEmployee, "pending").mockRestore();
  });

  test("render deleteEmployee from slice with error handling", async () => {
    jest.spyOn(axios, "delete").mockRejectedValue(new Error("Some error message"));
    jest.spyOn(deleteEmployee, "pending");
    const store = configureStore({ reducer: employeesReducer });

    try {
      await store.dispatch(deleteEmployee("1685328248504"));

      expect(await store.getState().employees.length).toBe(0);
      jest.spyOn(deleteEmployee, "pending").mockRestore();
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
    }
  });
});
