import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  cartId: "",
  isCheckoutOn: false,
};

const cartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    getCardId: (state, action) => {
      state.cartId = action.payload;
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
      let duplicateCart = [];
      state.cart.forEach((product) => {
        const a = duplicateCart.some(
          (duplicateItem) => duplicateItem.id === product.id
        );
        if (!a) {
          duplicateCart.push(product);
          state.cart = duplicateCart;
        }
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
    removeAll: (state) => {
      state.cart = [];
    },
    showCheckout: (state, action) => {
      state.isCheckoutOn = action.payload;
    },
  },
});

export const {
  addToCart,
  getCardId,
  incrementCount,
  decrementCount,
  removeItem,
  removeAll,
  showCheckout,
} = cartSlice.actions;
export default cartSlice.reducer;
