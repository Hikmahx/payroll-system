import { createSlice } from "@reduxjs/toolkit";

interface EarningsState {
  earnings: number;
}

const initialState: EarningsState = {
  earnings: 0,
};

const earningsSlice = createSlice({
  name: "earnings",
  initialState,
  reducers: {
    employeeEarnings: (state, { payload }) => {
      // state.earnings = action.payload;
    },
  },
});

export const { employeeEarnings } = earningsSlice.actions;
export default earningsSlice.reducer;
