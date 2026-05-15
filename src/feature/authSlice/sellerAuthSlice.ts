import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { verifySellerAuth } from "./authThunks";

const token = localStorage.getItem("sellerAccessToken");

type AuthState = {
  accessToken: string | null;
  isSellerProfileCompleted: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  isVerified: boolean;
  error: string | null;
};

const initialState: AuthState = {
  accessToken: token ? token : null,
  isAuthenticated: !!token,
  isSellerProfileCompleted: false,
  isLoading: false,
  isVerified: false,
  error: null,
};

const selleAuthSlice = createSlice({
  name: "sellerAuthSlice",
  initialState,
  reducers: {
    loginSellerUser: (
      state,
      actions: PayloadAction<{
        token: string;
        isSellerProfileCompleted: boolean;
      }>,
    ) => {
      const { token, isSellerProfileCompleted } = actions.payload;
      state.accessToken = token;
      state.isAuthenticated = true;
      state.isSellerProfileCompleted = isSellerProfileCompleted;
      state.isVerified = true;
      localStorage.setItem("sellerAccessToken", token);
    },

    completeProfile: (state) => {
      state.isSellerProfileCompleted = true;
    },

    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isSellerProfileCompleted = false;
      state.isVerified = true;
      state.isLoading = false;
      localStorage.removeItem("sellerAccessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifySellerAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifySellerAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isVerified = true;

        if (action.payload) {
          state.accessToken = localStorage.getItem("sellerAccessToken");
          state.isAuthenticated = true;
          state.isSellerProfileCompleted =
            action.payload.isSellerProfileCompleted;
        } else {
          // No payload = not authenticated
          state.isAuthenticated = false;
          state.accessToken = null;
        }
      })
      .addCase(verifySellerAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isVerified = true;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.error = (action.payload as any)?.message || "Verification failed";
      });
  },
});

export const { loginSellerUser, logout, completeProfile } =
  selleAuthSlice.actions;
export default selleAuthSlice.reducer;
