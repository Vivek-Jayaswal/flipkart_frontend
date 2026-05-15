import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

const roleToStorageKey: Record<string, string> = {
  buyer: "buyerAccessToken",
  seller: "sellerAccessToken",
};

export const verifySellerAuth = createAsyncThunk(
  "sellerAuth/verify",
  async (_, { rejectWithValue }) => {
    console.log("seller api call");

    try {
      const token = localStorage.getItem(roleToStorageKey["seller"]);

      console.log(token);

      if (!token) {
        return null;
      }

      const response = await api.get("/auth/verify-seller");
      return response.data.data;
    } catch (error: any) {
      // localStorage.removeItem(roleToStorageKey["seller"]);
      return rejectWithValue(error.response?.data);
    }
  },
);

export const verifyBuyerAuth = createAsyncThunk(
  "auth/verify",
  async (_, { rejectWithValue }) => {
    console.log("buyer api call");

    try {
      const token = localStorage.getItem(roleToStorageKey["buyer"]);

      console.log(token);

      if (!token) {
        console.log("No buyer token found");
        return null;
      }

      const response = await api.get("/auth/verify-buyer");
      return response.data.data;
    } catch (error: any) {
      // localStorage.removeItem(roleToStorageKey["buyer"]);
      return rejectWithValue(error.response?.data);
    }
  },
);
