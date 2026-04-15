import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";

const stroe = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default stroe;
