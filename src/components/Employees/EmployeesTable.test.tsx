import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import EmployeesTable from "./EmployeesTable";
// import { RootState } from "../../redux/store";
// import { getEmployees } from "../../redux/reducers/employeesSlice";
// import { Store, AnyAction } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

const mockStore = configureStore([thunk]);

describe("Testing Employees Table", () => {
  let store: MockStoreEnhanced<unknown, {}>;

  beforeEach(() => {
    store = mockStore({
      employees: {
        employees: [
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            position: "Developer",
            cadreLevel: "Senior",
            isAdmin: false,
            earnings: {
              basic: 5000,
              transport: 200,
              overtime: 1000,
              housing: 1000,
            },
            deductions: {
              tax: 1000,
              pension: 500,
            },
          },
        ],
        loading: false,
        error: false,
      },
    });
  });

  test("renders loading state when loading is true", () => {
    // store.dispatch(getEmployees.pending);

    store = mockStore({
      employees: {
        loading: true,
        error: false,
        errMsg: "",
        employees: [],
      },
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <EmployeesTable />
        </Provider>
      </BrowserRouter>
    );

    const loadingElement = screen.getByText("Loading employees");
    expect(loadingElement).toBeInTheDocument();
  });

  test("renders error state when error is true", () => {
    const errorMessage = "Network Error";

    store = mockStore({
      employees: {
        loading: false,
        error: true,
        errMsg: errorMessage,
        employees: [],
      },
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <EmployeesTable />
        </Provider>
      </BrowserRouter>
    );

    const errorElement = screen.getByTestId("error-message");
    expect(errorElement).toHaveTextContent(errorMessage);
  });

  test("should render employees table when employees array is not empty", () => {
    const employees = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        position: "Developer",
        cadreLevel: "Senior",
        isAdmin: false,
        earnings: {
          basic: 5000,
          transport: 200,
          overtime: 1000,
          housing: 1000,
        },
        deductions: {
          tax: 1000,
          pension: 500,
        },
      }    ];
  
    store = mockStore({
      employees: {
        loading: false,
        error: false,
        errMsg: "",
        employees: employees,
      },
    });
  
    render(
      <BrowserRouter>
        <Provider store={store}>
          <EmployeesTable />
        </Provider>
      </BrowserRouter>
    );
  
    const tableElement = screen.getByTestId("employees-table");
    expect(tableElement).toBeInTheDocument();
  });

  test("should render 'No data available' message when employees array is empty", () => {
    const store = mockStore({
      employees: {
        loading: false,
        error: false,
        errMsg: "",
        employees: [],
      },
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <EmployeesTable />
        </Provider>
      </BrowserRouter>
    );

    const noDataMessage = screen.getByText("No data available");
    expect(noDataMessage).toBeInTheDocument();
  });
});
