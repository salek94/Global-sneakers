import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import categorySlice from "./categorySlice";
import mobileSlice from "./mobileSlice";

export const store = configureStore({
  reducer: {
    productStore: productSlice,
    cartStore: cartSlice,
    categoryStore: categorySlice,
    mobileStore: mobileSlice,
  },
});
