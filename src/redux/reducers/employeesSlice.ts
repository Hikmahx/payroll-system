import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Employee } from "./types";
import axios, { AxiosError } from "axios";

interface EmployeesState {
  employees: Employee[] | [];
  employee: Employee[] | [];
  error: boolean;
  loading: boolean;
  errMsg: string | undefined;
  // deduction: number;
  update: boolean;
}

interface KnownError {
  errMessage: string;
}

const JSON_API_LINK = "http://localhost:3004/employees";

// CREATE A NEW EMPLOYEE INTO THE JSON SERVER
export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employee: Employee, { rejectWithValue }) => {
    try {
      await axios.post(JSON_API_LINK, employee);
      let employeesData = await axios.get(JSON_API_LINK);
      const employees = await employeesData.data;
      return employees;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// GET ALL EMPLOYEES FROM SRC/API/DB.JSON
export const getEmployees = createAsyncThunk(
  "employees/getEmployees",
  async (_, { rejectWithValue }) => {
    try {
      let { data } = await axios.get(JSON_API_LINK);
      const employees = await data;
      return employees;
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// GET SINGLE EMPLOYEE FROM SRC/API/DB.JSON
export const getSingleEmployee = createAsyncThunk(
  "employees/getSingleEmployee",
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      let { data } = await axios.get(`${JSON_API_LINK}/${id}`);
      const employee = await data;
      return [employee];
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// UPDATE EMPLOYEE FROM SRC/API/DB.JSON
export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, dataInfo }: any, { rejectWithValue }) => {
    try {
      let { data } = await axios.put(`${JSON_API_LINK}/${id}`, dataInfo);
      const employee = await data;
      return [employee];
    } catch (err) {
      const error: AxiosError<KnownError> = err as any;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: EmployeesState = {
  employees: [],
  employee: [],
  error: false,
  loading: false,
  errMsg: "" as string | undefined,
  update: false,
  // deduction:0
};

const EmployeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    // deductionTotal: (state, action) => {
    // },
    updateEmployeeData: (state, { payload }) => {
      state.update = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addEmployee.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(addEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.employees = action.payload;
      state.errMsg = "";
    });
    builder.addCase(addEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errMsg = action.error.message;
    });

    builder.addCase(getEmployees.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.employees = action.payload;
      state.errMsg = "";
    });
    builder.addCase(getEmployees.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errMsg = action.error.message;
    });
    builder.addCase(getSingleEmployee.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getSingleEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.employee = action.payload;
      state.errMsg = "";
    });
    builder.addCase(getSingleEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errMsg = action.error.message;
    });
    builder.addCase(updateEmployee.pending, (state, action) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.employee = action.payload;
      state.errMsg = "";
    });
    builder.addCase(updateEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.errMsg = action.error.message;
    });
  },
});
export const { updateEmployeeData } = EmployeesSlice.actions;

export default EmployeesSlice.reducer;
