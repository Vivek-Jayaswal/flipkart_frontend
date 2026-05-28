import { createSlice } from "@reduxjs/toolkit";
import { verifyAdminAuth } from "./authThunks";

const token = localStorage.getItem("adminAccessToken");

type AdminAuthState = {
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdminProfileCompleted: boolean;
  isVerified: boolean;
  error: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    address: string;
  };
};

const initialState: AdminAuthState = {
  accessToken: token ? token : null,
  isAuthenticated: !!token,
  isLoading: !!token,
  isAdminProfileCompleted: false,
  isVerified: false,
  error: null,
  user: {
    id: "",
    name: "",
    email: "",
    address: "",
  },
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    loginAdmin: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = "";
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(verifyAdminAuth.pending, (state) => {
      state.isAuthenticated = false;
      state.isLoading = true;
      state.user = initialState.user;
      state.error = null;
    });
    builder.addCase(verifyAdminAuth.fulfilled, (state, action) => {
      state.isVerified = true;
      state.isAuthenticated = true;
      //   state.user = action.payload;
      state.user = initialState.user;
      state.isLoading = false;
    });
    builder.addCase(verifyAdminAuth.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = initialState.user;
      state.isLoading = false;
      //   state.error = action.payload;
    });
  },
});


export const { loginAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
