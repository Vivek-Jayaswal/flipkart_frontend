import { createSlice } from "@reduxjs/toolkit";
import type { InititalState } from "../../types/login-type";
import { verifyBuyerAuth } from "./authThunks";

const token = localStorage.getItem("buyerAccessToken");

const initialState: InititalState = {
  accessToken: token ? token : null,
  isAuthenticated: !!token,
  isLoading: false,
  isVerified: false,
  error: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    loginUser: (state, actions) => {
      const { token } = actions.payload;
      state.accessToken = token;
      state.isAuthenticated = true;
      state.isVerified = true;
      localStorage.setItem("buyerAccessToken", token);
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
      .addCase(verifyBuyerAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isVerified = true;

        if (action.payload) {
          state.accessToken = localStorage.getItem("buyerAccessToken");
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
          state.accessToken = null;
        }
      })
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
