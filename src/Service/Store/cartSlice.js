import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  cartLineItems: [],
  lineItem: "",
  isCheckoutOn: false,
};

const cartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    getLineItems: (state, action) => {
      state.cartLineItems = [...state.cartLineItems, ...action.payload];
      // state.cart = [...state.cartLineItems]
      let duplicateCart = [];
      state.cartLineItems.forEach((product) => {
        const item = duplicateCart.some(
          (duplicateItem) => duplicateItem.id === product.id
        );
        if (!item) {
          duplicateCart.push(product);
          state.cartLineItems = duplicateCart;
        }
        product.totalPrice = Number(product.price.raw * product.quantity);
      });
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
      let duplicateCart = [];
      state.cart.forEach((product) => {
        const item = duplicateCart.some(
          (duplicateItem) => duplicateItem.id === product.id
        );
        if (!item) {
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
    removeLineItem: (state, action) => {
      let item = state.cartLineItems.find(
        (item) => item.product_id === action.payload
      );
      state.lineItem = item.id;
    },
    lineItemNone: (state) => {
      state.lineItem = "";
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
  getLineItems,
  incrementCount,
  decrementCount,
  removeItem,
  removeLineItem,
  removeAll,
  showCheckout,
  lineItemNone,
} = cartSlice.actions;
export default cartSlice.reducer;
