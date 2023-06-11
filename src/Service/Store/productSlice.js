import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: [],
  overviewProductOn: false,
  selectedOption: "",
  menProducts: [],
  womenProducts: [],
  kidsProducts: [],
  bestProducts: [],
  arrivalsProducts: [],
  searchProducts: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getAllProduct: (state, action) => {
      state.products = action.payload;
      if (state.selectedOption === "Asc") {
        state.products.sort((a, b) => a.price.raw - b.price.raw);
      }
      if (state.selectedOption === "Desc") {
        state.products.sort((a, b) => b.price.raw - a.price.raw);
      }
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
    whichSelectOption: (state, action) => {
      state.selectedOption = action.payload;
    },
    menProductsArray: (state, action) => {
      state.menProducts = action.payload;
      if (state.selectedOption === "Asc") {
        state.menProducts.sort((a, b) => a.price.raw - b.price.raw);
      }
      if (state.selectedOption === "Desc") {
        state.menProducts.sort((a, b) => b.price.raw - a.price.raw);
      }
    },
    womenProductsArray: (state, action) => {
      state.womenProducts = action.payload;
      if (state.selectedOption === "Asc") {
        state.womenProducts.sort((a, b) => a.price.raw - b.price.raw);
      }
      if (state.selectedOption === "Desc") {
        state.womenProducts.sort((a, b) => b.price.raw - a.price.raw);
      }
    },
    kidsProductsArray: (state, action) => {
      state.kidsProducts = action.payload;
      if (state.selectedOption === "Asc") {
        state.kidsProducts.sort((a, b) => a.price.raw - b.price.raw);
      }
      if (state.selectedOption === "Desc") {
        state.kidsProducts.sort((a, b) => b.price.raw - a.price.raw);
      }
    },
    bestProductsArray: (state, action) => {
      state.bestProducts = action.payload;
      if (state.selectedOption === "Asc") {
        state.bestProducts.sort((a, b) => a.price.raw - b.price.raw);
      }
      if (state.selectedOption === "Desc") {
        state.bestProducts.sort((a, b) => b.price.raw - a.price.raw);
      }
    },
    arrivalsProductsArray: (state, action) => {
      state.arrivalsProducts = action.payload;
      if (state.selectedOption === "Asc") {
        state.arrivalsProducts.sort((a, b) => a.price.raw - b.price.raw);
      }
      if (state.selectedOption === "Desc") {
        state.arrivalsProducts.sort((a, b) => b.price.raw - a.price.raw);
      }
    },
    searchProductsArray: (state, action) => {
      state.searchProducts = action.payload;
      if (state.selectedOption === "Asc") {
        state.searchProducts.sort((a, b) => a.price.raw - b.price.raw);
      }
      if (state.selectedOption === "Desc") {
        state.searchProducts.sort((a, b) => b.price.raw - a.price.raw);
      }
    },
  },
});

export const {
  getAllProduct,
  singleProduct,
  getSecondImage,
  incrementCount,
  decrementCount,
  isOverviewProductOn,
  menProductsArray,
  womenProductsArray,
  kidsProductsArray,
  bestProductsArray,
  arrivalsProductsArray,
  searchProductsArray,
  whichSelectOption,
} = productSlice.actions;
export default productSlice.reducer;
