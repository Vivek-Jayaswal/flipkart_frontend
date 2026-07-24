import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { InititalState, UserLoginResData } from "../../types/login-type";
import { verifyBuyerAuth } from "./authThunks";

const token = localStorage.getItem("buyerAccessToken");

const initialState: InititalState = {
  accessToken: token ? token : null,
  isAuthenticated: !!token,
  isLoading: false,
  isVerified: false,
  userData: {
    name: "",
    mobile: "",
    gmail: "",
    address: "",
  },
  error: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    loginUser: (state, actions: PayloadAction<UserLoginResData>) => {
      const { token } = actions.payload;
      const data = actions.payload.data;
      state.accessToken = token ?? "";
      state.isAuthenticated = true;
      state.isVerified = true;
      state.userData = {
        name: data.name,
        gmail: data.email,
        mobile: data.mobile.toString(),
        address: data.address,
      };
      localStorage.setItem("buyerAccessToken", token ?? "");
    },
    logoutUser: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isVerified = false;
      localStorage.removeItem("buyerAccessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyBuyerAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        verifyBuyerAuth.fulfilled,
        (state, action: PayloadAction<UserLoginResData>) => {
          console.log(action.payload.data);

          const d = action.payload.data;
          state.isLoading = false;
          state.isVerified = true;
          state.isAuthenticated = true;

          if (action.payload) {
            state.accessToken = localStorage.getItem("buyerAccessToken");
            state.isAuthenticated = true;
            state.userData = {
              name: d.name,
              mobile: d.mobile.toString(),
              gmail: d.email,
              address: d.address,
            };
          } else {
            state.isAuthenticated = false;
            state.accessToken = null;
          }
        },
      )
      .addCase(verifyBuyerAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isVerified = true;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.error = (action.payload as any)?.message || "Verification failed";
      });
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
