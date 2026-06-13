import { createSlice } from "@reduxjs/toolkit";
import { ProductDetails } from "../../types/buyer/product";

type InitialStateType = {
  data: ProductDetails;
};

const initialState: InitialStateType = {
  data: {} as ProductDetails,
};

export const productDetailsSlice = createSlice({
  name: "product-details",
  initialState,
  reducers: {
    productDetailsReducer: (state, actions) => {
      state.data = actions.payload;
    },
  },
});

export const { productDetailsReducer } = productDetailsSlice.actions;
