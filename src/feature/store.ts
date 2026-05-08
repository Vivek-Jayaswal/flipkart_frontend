import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import sellerAuthReducer from "./authSlice/sellerAuthSlice";

const stroe = configureStore({
  reducer: {
    auth: authReducer,
    sellerAuth: sellerAuthReducer,
  },
});

export default stroe;
