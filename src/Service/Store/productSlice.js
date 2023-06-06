import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: [],
  overviewProductOn: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getAllProduct: (state, action) => {
      state.products = action.payload;
    },
    singleProduct: (state, action) => {
      state.product = action.payload;
    },
    isOverviewProductOn: (state, action) => {
      state.overviewProductOn = action.payload;
    },
  },
});

export const { getAllProduct, singleProduct, isOverviewProductOn } =
  productSlice.actions;
export default productSlice.reducer;
