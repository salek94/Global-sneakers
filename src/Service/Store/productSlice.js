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
    incrementCount: (state, action) => {
      state.product = action.payload;
      let product = state.product;
      product.count = product.count + 1;
      product.totalPrice = Number(product.price * product.count);
      if (product.count === product.quantity) return null;
    },
    decrementCount: (state, action) => {
      state.product = action.payload;
      let product = state.product;
      product.count = product.count - 1;
      product.totalPrice = Number(product.price * product.count);
      if (product.count < 1) state.overviewProductOn = false;
    },
    isOverviewProductOn: (state, action) => {
      state.overviewProductOn = action.payload;
    },
  },
});

export const {
  getAllProduct,
  singleProduct,
  incrementCount,
  decrementCount,
  isOverviewProductOn,
} = productSlice.actions;
export default productSlice.reducer;
