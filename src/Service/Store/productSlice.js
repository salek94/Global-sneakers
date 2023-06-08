import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: [],
  overviewProductOn: false,
  menProducts: [],
  womenProducts: [],
  kidsProducts: [],
  bestProducts: [],
  arrivalsProducts: [],
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
    menProductsArray: (state, action) => {
      state.menProducts = action.payload;
    },
    womenProductsArray: (state, action) => {
      state.womenProducts = action.payload;
    },
    kidsProductsArray: (state, action) => {
      state.kidsProducts = action.payload;
    },
    bestProductsArray: (state, action) => {
      state.bestProducts = action.payload;
    },
    arrivalsProductsArray: (state, action) => {
      state.arrivalsProducts = action.payload;
    },
  },
});

export const {
  getAllProduct,
  singleProduct,
  incrementCount,
  decrementCount,
  isOverviewProductOn,
  menProductsArray,
  womenProductsArray,
  kidsProductsArray,
  bestProductsArray,
  arrivalsProductsArray,
} = productSlice.actions;
export default productSlice.reducer;
