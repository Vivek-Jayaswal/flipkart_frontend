import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import sellerAuthReducer from "./authSlice/sellerAuthSlice";
import adminAuthReducer from "./authSlice/adminAuthSlice";
import { productDetailsSlice } from "./productSlice/productSlice";

const stroe = configureStore({
  reducer: {
    auth: authReducer,
    sellerAuth: sellerAuthReducer,
    adminAuth: adminAuthReducer,
    productDetails: productDetailsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof stroe.getState>;
export type AppDispatch = typeof stroe.dispatch;

export default stroe;
