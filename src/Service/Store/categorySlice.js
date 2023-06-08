import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryName: "All",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    whichCategory: (state, action) => {
      state.categoryName = action.payload;
    },
  },
});

export const { whichCategory } = categorySlice.actions;
export default categorySlice.reducer;
