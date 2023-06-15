import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hamburgerMenu: true,
};

const mobileSlice = createSlice({
  name: "mobile",
  initialState,
  reducers: {
    isHamMenuOpen: (state, action) => {
      state.hamburgerMenu = action.payload;
    },
  },
});

export const { isHamMenuOpen } = mobileSlice.actions;
export default mobileSlice.reducer;
