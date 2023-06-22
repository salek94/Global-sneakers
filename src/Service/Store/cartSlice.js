import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  cartObjectId: "",
  checkoutId: "",
  lineItemRemove: "",
  lineItemUpdate: "",
  cartLineItems: [],
  isCartOn: false,
};

const cartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    getLineItems: (state, action) => {
      state.cartLineItems = [...state.cartLineItems, ...action.payload];
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
      state.cart = [action.payload];
      let duplicateCart = [];
      state.cart.forEach((product) => {
        const item = duplicateCart.some(
          (duplicateItem) => duplicateItem.id === product.id
        );
        if (!item) {
          duplicateCart.push(product);
          state.cart = duplicateCart;
        }
        // product.totalPrice = Number(product.price.raw * product.quantity);
      });
    },
    incrementCountCart: (state, action) => {
      let product = state.cart.find((item) => item.id === action.payload);
      product.quantity = product.quantity + 1;
    },
    decrementCountCart: (state, action) => {
      let product = state.cart.find((item) => item.id === action.payload);
      product.quantity = product.quantity - 1;
    },
    incrementCount: (state, action) => {
      let product = state.cartLineItems.find(
        (item) => item.id === action.payload
      );
      product.quantity = product.quantity + 1;
      product.totalPrice = Number(product.price.raw * product.quantity);
      if (product.quantity === product.inventory) return null;
      state.lineItemUpdate = product;
    },
    decrementCount: (state, action) => {
      let product = state.cartLineItems.find(
        (item) => item.id === action.payload
      );
      product.quantity = product.quantity - 1;
      product.totalPrice = Number(product.price.raw * product.quantity);
      if (product.quantity === 0) {
        let remove = state.cartLineItems.filter(
          (item) => item.id !== product.id
        );
        state.cartLineItems = remove;
      }
      state.lineItemUpdate = product;
    },
    removeItem: (state, action) => {
      let product = state.cartLineItems.find(
        (item) => item.id === action.payload
      );
      let remove = state.cartLineItems.filter((item) => item.id !== product.id);

      state.cartLineItems = remove;
    },
    removeLineItem: (state, action) => {
      state.lineItemRemove = action.payload;
      state.cart = [];
    },

    removeAll: (state) => {
      state.cart = [];
      state.cartLineItems = [];
    },
    showCartForm: (state, action) => {
      state.isCartOn = action.payload;
    },
    getCartObjectId: (state, action) => {
      state.cartObjectId = action.payload;
    },
    getCheckoutId: (state, action) => {
      state.checkoutId = action.payload;
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
  showCartForm,
  getCartObjectId,
  getCheckoutId,
  incrementCountCart,
  decrementCountCart,
} = cartSlice.actions;
export default cartSlice.reducer;
