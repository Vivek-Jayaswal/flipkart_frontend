import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { verifySellerAuth } from "./authThunks";
import type { UserLoginResData } from "../../types/login-type";

const token = localStorage.getItem("sellerAccessToken");

type AuthState = {
  accessToken: string | null;
  isSellerProfileCompleted: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  isVerified: boolean;
  error: string | null;
  data: {
    gmail: string;
    mobile: string;
    name: string;
    address: string;
  };
};

const initialState: AuthState = {
  accessToken: token ? token : null,
  isAuthenticated: !!token,
  isSellerProfileCompleted: false,
  isLoading: !!token,
  isVerified: false,
  error: null,
  data: {
    gmail: "",
    mobile: "",
    name: "",
    address: "",
  },
};

const selleAuthSlice = createSlice({
  name: "sellerAuthSlice",
  initialState,
  reducers: {
    loginSellerUser: (state, actions: PayloadAction<UserLoginResData>) => {
      const d = actions.payload;
      state.accessToken = d.token ?? null;
      state.isAuthenticated = true;
      state.isSellerProfileCompleted = d.data.isProfileComplete;
      state.data = {
        ...state.data,
        gmail: d.data.email,
        mobile: String(d.data.mobile),
      };
      state.isVerified = true;
      localStorage.setItem("sellerAccessToken", d.token ?? "");
    },

    completeProfile: (state) => {
      state.isSellerProfileCompleted = true;
    },

    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isSellerProfileCompleted = false;
      state.isVerified = false;
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
      .addCase(
        verifySellerAuth.fulfilled,
        (state, action: PayloadAction<UserLoginResData>) => {
          const d = action.payload;
          state.isLoading = false;
          if (action.payload) {
            state.isVerified = d.data.isVerified && d.role === "seller";
            state.accessToken = localStorage.getItem("sellerAccessToken");
            state.isAuthenticated = true;
            state.isSellerProfileCompleted =
              d.data.isProfileComplete && d.role === "seller";
            state.data = {
              ...state.data,
              gmail: d.data.email,
              mobile: String(d.data.mobile),
            };
          } else {
            // No payload = not authenticated
            state.isAuthenticated = false;
            state.accessToken = null;
          }
        },
      )
      .addCase(verifySellerAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isVerified = false;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.error = (action.payload as any)?.message || "Verification failed";
      });
  },
});

export const { loginSellerUser, logout, completeProfile } =
  selleAuthSlice.actions;
export default selleAuthSlice.reducer;
