import { configureStore } from "@reduxjs/toolkit";
import earningsReducer from "./reducers/earningsSlice";
import deductionsReducer from "./reducers/deductionsSlice";
import employeesReducer from "./reducers/employeesSlice";
import sharedReducer from "./reducers/sharedSlice";

export const store = configureStore({
  reducer: {
    earnings: earningsReducer,
    deductions: deductionsReducer,
    employees: employeesReducer,
    shared: sharedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;