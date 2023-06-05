import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  isCheckoutOn: false,
};

const cartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
      let a = state.cart.find((item) => item.id === action.payload.id);

      state.cart.forEach((product) => {
        product.totalPrice = Number(product.price * product.count);
      });
    },
    incrementCount: (state, action) => {
      let product = state.cart.find((item) => item.id === action.payload);
      product.count = product.count + 1;
      product.totalPrice = Number(product.price * product.count);
      if (product.count === product.quantity) return null;
    },
    decrementCount: (state, action) => {
      let product = state.cart.find((item) => item.id === action.payload);
      product.count = product.count - 1;
      product.totalPrice = Number(product.price * product.count);
      if (product.count === 0) {
        let remove = state.cart.filter((item) => item.id !== product.id);
        state.cart = remove;
      }
    },
    removeItem: (state, action) => {
      let product = state.cart.find((item) => item.id === action.payload);
      let remove = state.cart.filter((item) => item.id !== product.id);
      state.cart = remove;
    },
    showCheckout: (state, action) => {
      state.isCheckoutOn = action.payload;
    },
  },
});

export const {
  setCart,
  addToCart,
  incrementCount,
  decrementCount,
  removeItem,
  showCheckout,
} = cartSlice.actions;
export default cartSlice.reducer;
