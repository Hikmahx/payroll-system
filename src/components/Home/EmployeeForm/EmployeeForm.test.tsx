import React from "react";
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import EmployeeForm from "./EmployeeForm";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

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
      id: 1685328248504,
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
});
