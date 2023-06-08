import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import categorySlice from "./categorySlice";

export const store = configureStore({
  reducer: {
    productStore: productSlice,
    cartStore: cartSlice,
    categoryStore: categorySlice,
  },
});
