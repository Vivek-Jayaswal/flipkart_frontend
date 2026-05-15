import api from "./api";
import store from "../feature/store";

import { logoutSellerUser } from "../feature/sellerAuthSlice";
import { logoutUser } from "../feature/buyerAuthSlice";

api.interceptors.request.use((config) => {
  const sellerToken = localStorage.getItem("sellerAccessToken");
  const buyerToken = localStorage.getItem("buyerAccessToken");

  if (window.location.pathname.startsWith("/seller")) {
    if (sellerToken) {
      config.headers.Authorization = `Bearer ${sellerToken}`;
    }
  } else {
    if (buyerToken) {
      config.headers.Authorization = `Bearer ${buyerToken}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;

      if (currentPath.startsWith("/seller")) {
        store.dispatch(logoutSellerUser());

        window.location.href = "/seller/signup";
      } else {
        store.dispatch(logoutUser());

        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;