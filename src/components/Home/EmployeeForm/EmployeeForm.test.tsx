import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import EmployeeForm from "./EmployeeForm";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { useParams } from "react-router-dom";
import {
  updateEmployee,
  updateEmployeeData,
} from "../../../redux/reducers/employeesSlice";

const mockStore = configureStore([thunk]);

describe("Testing Employee Form", () => {
  let store: MockStoreEnhanced<unknown, {}>;

  async function wait(ms = 100): Promise<void> {
    await act(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    });
  }

  beforeEach(() => {
    store = mockStore({
      employees: {
        employees: [],
        employee: [],
        loading: false,
        error: false,
        update: false,
      },
    });
  });

  test("Testing form functionality", async () => {
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

    render(
      <BrowserRouter>
        <Provider store={store}>
          <EmployeeForm />
        </Provider>
      </BrowserRouter>
    );

    await wait();

    userEvent.type(screen.getByPlaceholderText(/Full Name/i), formData.name);
    userEvent.type(screen.getByPlaceholderText(/Email/i), formData.email);
    userEvent.selectOptions(
      screen.getByLabelText("position"),
      formData.position
    );
    userEvent.selectOptions(
      screen.getByLabelText("cadreLevel"),
      formData.cadreLevel
    );
    userEvent.type(
      screen.getByPlaceholderText(/Basic Earnings/i),
      formData.earnings.basic.toString()
    );
    userEvent.type(
      screen.getByPlaceholderText(/Transport/i),
      formData.earnings.transport.toString()
    );
    userEvent.type(
      screen.getByPlaceholderText(/Over time/i),
      formData.earnings.overtime.toString()
    );
    userEvent.type(
      screen.getByPlaceholderText(/Housing/i),
      formData.earnings.housing.toString()
    );
    userEvent.type(
      screen.getByPlaceholderText(/Tax/i),
      formData.deductions.tax.toString()
    );
    userEvent.type(
      screen.getByPlaceholderText(/Pension/i),
      formData.deductions.pension.toString()
    );

    userEvent.click(screen.getByText("Submit"));
  });

  test("renders 'Update' when 'update' state is true", () => {
    store = mockStore({
      employees: {
        update: true,
      },
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <EmployeeForm />
        </Provider>
      </BrowserRouter>
    );

    const updateText = screen.getByText(/Update Employee/i);
    expect(updateText).toBeInTheDocument();
  });

  test("renders 'Add' when 'update' state is false", () => {
    store = mockStore({
      employees: {
        update: false,
      },
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <EmployeeForm />
        </Provider>
      </BrowserRouter>
    );

    const addText = screen.getByText(/Add Employee/i);
    expect(addText).toBeInTheDocument();
  });

  test("updates select option value on change", () => {
    const employee = {
      id: "123",
      name: "John Doe",
      email: "johndoe@example.com",
      position: "developer",
      cadreLevel: "Mid Level",
      earnings: {
        basic: 1000,
        transport: 200,
        overtime: 50,
        housing: 300,
      },
      deductions: {
        tax: 100,
        pension: 50,
      },
    };
    store = mockStore({
      employees: {
        update: true,
      },
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <EmployeeForm employee={employee} id={employee.id} store={store} />
        </Provider>
      </BrowserRouter>
    );
    const positionSelect = screen.getByLabelText(
      "position"
    ) as HTMLSelectElement;

    expect(positionSelect).toBeInTheDocument();
    expect(positionSelect.value).toBe(employee.position);

    userEvent.selectOptions(positionSelect, "manager");

    expect(positionSelect.value).toBe("manager");
  });

  test("update employee", async () => {
    const employee = {
      id: 123,
      name: "John Doe",
      email: "johndoe@example.com",
      position: "developer",
      cadreLevel: "Mid Level",
      earnings: {
        basic: 1000,
        transport: 200,
        overtime: 50,
        housing: 300,
      },
      deductions: {
        tax: 100,
        pension: 50,
      },
    };

    let updatedEmployee = {
      id: 123,
      name: "John Doe 1",
      email: "johndoe@example.com",
      position: "developer",
      cadreLevel: "Junior Level",
      earnings: {
        basic: 2000,
        transport: 200,
        overtime: 50,
        housing: 300,
      },
      deductions: {
        tax: 100,
        pension: 50,
      },
    };

    store = mockStore({
      employees: {
        employees: [],
        employee: employee,
        loading: false,
        error: false,
        update: true,
      },
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <EmployeeForm employee={employee} />
        </Provider>
      </BrowserRouter>
    );

    userEvent.clear(screen.getByPlaceholderText(/Full Name/i));
    userEvent.type(
      screen.getByPlaceholderText(/Full Name/i),
      updatedEmployee.name
    );

    userEvent.selectOptions(
      screen.getByLabelText("cadreLevel"),
      updatedEmployee.cadreLevel
    );

    userEvent.clear(screen.getByPlaceholderText(/Basic Earnings/i));
    userEvent.type(
      screen.getByPlaceholderText(/Basic Earnings/i),
      updatedEmployee.earnings.basic.toString()
    );

    userEvent.click(screen.getByText("Submit"));

    const mockDispatch = {
      type: "employees/updateEmployee/fulfilled",
      payload: updatedEmployee,
    };

    await act(async () => {
      store.dispatch(mockDispatch);
    });

    store = mockStore({
      employees: {
        employees: [],
        employee: updatedEmployee,
        loading: false,
        error: false,
        update: false,
      },
    });

    const state = store.getState() as any;
    expect(state).toEqual({
      employees: {
        employees: [],
        employee: updatedEmployee,
        loading: false,
        error: false,
        update: false,
      },
    });
  });
});
