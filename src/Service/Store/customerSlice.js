import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: {
    shipping: "",
  },
  shipping: [],
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    getCustomerInfo: (state, action) => {
      state.customer = action.payload;
      state.shipping.forEach((item) => {
        if (item.description === "Domestic") {
          state.customer.shipping = item.id;
        }
      });
    },
    getShippingMethods: (state, action) => {
      state.shipping = action.payload;
    },
  },
});

export const { getCustomerInfo, getShippingMethods } = customerSlice.actions;
export default customerSlice.reducer;
