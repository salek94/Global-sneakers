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

const sortByPrice = (state) => {
  if (state.selectedOption === "Asc") {
    state.products.sort((a, b) => a.price.raw - b.price.raw);
  }
  if (state.selectedOption === "Desc") {
    state.products.sort((a, b) => b.price.raw - a.price.raw);
  }
  if (state.selectedOption === "Default") {
    state.products.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getAllProduct: (state, action) => {
      state.products = action.payload;
      sortByPrice(state);
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
      sortByPrice(state);
    },
    womenProductsArray: (state, action) => {
      state.womenProducts = action.payload;
      sortByPrice(state);
    },
    kidsProductsArray: (state, action) => {
      state.kidsProducts = action.payload;
      sortByPrice(state);
    },
    bestProductsArray: (state, action) => {
      state.bestProducts = action.payload;
      sortByPrice(state);
    },
    arrivalsProductsArray: (state, action) => {
      state.arrivalsProducts = action.payload;
      sortByPrice(state);
    },
    searchProductsArray: (state, action) => {
      state.searchProducts = action.payload;
      sortByPrice(state);
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
