// src/payrollSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from './types';


interface PayrollState {
  employees: Employee[] | [];
}

const initialState: PayrollState = {
  employees: [],
};

const payrollSlice = createSlice({
  name: 'payroll',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees= [...state.employees, action.payload];
    },
    
  },
});

export const { addEmployee } = payrollSlice.actions;
export default payrollSlice.reducer;
