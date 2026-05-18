import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

const roleToStorageKey: Record<string, string> = {
  buyer: "buyerAccessToken",
  seller: "sellerAccessToken",
};

export const verifySellerAuth = createAsyncThunk(
  "sellerAuth/verify",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem(roleToStorageKey["seller"]);
      if (!token) {
        return null;
      }

      const response = await api.get("/auth/verify-seller");
      return response.data;
    } catch (error: any) {
      // localStorage.removeItem(roleToStorageKey["seller"]);
      return rejectWithValue(error.response?.data);
    }
  },
);

export const verifyBuyerAuth = createAsyncThunk(
  "auth/verify",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem(roleToStorageKey["buyer"]);

      if (!token) {
        console.log("No buyer token found");
        return null;
      }

      const response = await api.get("/auth/verify-buyer");
      return response.data.data;
    } catch (error: any) {
      localStorage.removeItem(roleToStorageKey["buyer"]);
      return rejectWithValue(error.response?.data);
    }
  },
);
