import { createSlice } from "@reduxjs/toolkit";
import type { InititalState, UserLoginResData } from "../../types/login-type";

const storedAuthData = localStorage.getItem("user");
const token = localStorage.getItem("accessToken");

const fromateUserData = (d: UserLoginResData["data"]) => {
  return {
    _id: d._id,
    name: d.name,
    mobile: String(d.mobile),
    gmail: d.email,
    role: d.roles ?? [],
    address: d.address,
  };
};

const initialState: InititalState = {
  token: token ? token : null,
  user: storedAuthData ? JSON.parse(storedAuthData) : null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    loginUser: (state, actions) => {
      const { token, data } = actions.payload;
      state.token = token;
      const frometedData = fromateUserData(data);
      state.user = frometedData;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("user", JSON.stringify(frometedData));
    },
    logoutUser: (state) => {
      console.log(state);
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
