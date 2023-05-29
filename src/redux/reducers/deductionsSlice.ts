import { createSlice } from "@reduxjs/toolkit";

interface DeductionsState {
  deductions: string;
}

const initialState: DeductionsState = {
  deductions: "",
};

const deductionsSlice = createSlice({
  name: "deductions",
  initialState,
  reducers: {
    setdeductions: (state, { payload }) => {
      //
    },
  },
});

export const { setdeductions } = deductionsSlice.actions;
export default deductionsSlice.reducer;
