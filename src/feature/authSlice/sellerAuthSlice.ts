import { createSlice } from "@reduxjs/toolkit";

const storedSellerAuthData = localStorage.getItem("sellerData");
const token = localStorage.getItem("token");

// const fromateUserData = (d: UserLoginResData["data"]) => {
//   return {
//     _id: d._id,
//     name: d.name,
//     mobile: String(d.mobile),
//     gmail: d.email,
//     role: d.roles ?? [],
//     address: d.address,
//   };
// };

const initialState = {
  sellerData: storedSellerAuthData ? JSON.parse(storedSellerAuthData) : null,
  token: token ? token : null,
};

const selleAuthSlice = createSlice({
  name: "sellerAuthSlice",
  initialState,
  reducers: {
    loginSellerUser: (state, actions) => {
      const { token, data } = actions.payload;
      console.log(actions);
      state.token = token;
      state.sellerData = data;
      localStorage.setItem("sellerData", JSON.stringify(data));
      localStorage.setItem("accessToken", token);
    },
  },
});

export const { loginSellerUser } = selleAuthSlice.actions;
export default selleAuthSlice.reducer;
