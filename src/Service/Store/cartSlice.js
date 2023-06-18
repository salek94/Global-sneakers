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
    pushCart: (state, action) => {
      state.cart = action.payload;
    },
    getLineItems: (state, action) => {
      state.cartLineItems = [...state.cartLineItems, ...action.payload];
      state.cart = [...state.cartLineItems];
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
        product.totalPrice = Number(product.price * product.quantity);
      });
    },
    incrementCount: (state, action) => {
      let product = state.cart.find((item) => item.id === action.payload);
      product.quantity = product.quantity + 1;
      product.totalPrice = Number(product.price * product.quantity);
      if (product.quantity === product.inventory) return null;
    },
    decrementCount: (state, action) => {
      let product = state.cart.find((item) => item.id === action.payload);
      product.quantity = product.quantity - 1;
      product.totalPrice = Number(product.price * product.quantity);
      if (product.quantity === 0) {
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
      // let item = state.cartLineItems.find(
      //   (item) => item.product_id === action.payload
      // );
      // state.lineItemRemove = item.id;
      state.lineItemRemove = action.payload;
    },
    updateLineItem: (state, action) => {
      state.lineItemUpdate = action.payload;
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
  pushCart,
  getLineItems,
  incrementCount,
  decrementCount,
  removeItem,
  removeLineItem,
  updateLineItem,
  removeAll,
  showCartForm,
  getCartObjectId,
  getCheckoutId,
} = cartSlice.actions;
export default cartSlice.reducer;
