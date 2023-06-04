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
    },
    incrementCount: (state, action) => {
      let product = state.cart.find((item) => item.id === action.payload);
      product.count = product.count + 1;
    },
    decrementCount: (state, action) => {
      let product = state.cart.find((item) => item.id === action.payload);
      product.count = product.count - 1;
      let copyCart = [...state.cart];
      if (product.count === 0) {
        copyCart.splice(action.payload, 1);
      }
      state.cart = copyCart;
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
  showCheckout,
} = cartSlice.actions;
export default cartSlice.reducer;
