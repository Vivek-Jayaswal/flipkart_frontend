import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import sellerAuthReducer from "./authSlice/sellerAuthSlice";
import adminAuthReducer from "./authSlice/adminAuthSlice";
import { productDetailsSlice } from "./productSlice/productSlice";
import { CART_STORAGE_KEY } from "./cartSlice/cartSlice";
import cartReducer from "./cartSlice/cartSlice";

const stroe = configureStore({
  reducer: {
    auth: authReducer,
    sellerAuth: sellerAuthReducer,
    adminAuth: adminAuthReducer,
    productDetails: productDetailsSlice.reducer,
    cart: cartReducer,
  },
});

stroe.subscribe(() => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(stroe.getState().cart));
});

export type RootState = ReturnType<typeof stroe.getState>;
export type AppDispatch = typeof stroe.dispatch;

export default stroe;
