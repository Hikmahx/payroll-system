import { createSlice } from "@reduxjs/toolkit";

interface SharedState {
  menuDisplay: boolean;
}

const initialState: SharedState = {
  menuDisplay: false,
};

const sharedSlice = createSlice({
  name: "shared",
  initialState,
  reducers: {
    setMenuDisplay: (state, { payload }) => {
      state.menuDisplay = payload;
    },
  },
});

export const { setMenuDisplay } = sharedSlice.actions;
export default sharedSlice.reducer;
