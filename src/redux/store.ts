import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./reducers/employeesSlice";
import sharedReducer from "./reducers/sharedSlice";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    shared: sharedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
