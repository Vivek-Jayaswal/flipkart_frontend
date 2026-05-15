import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
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
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let refreshSubscribers: any[] = [];

const subscribeTokenRefresh = (cb: any) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (newToken: string) => {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const currentRole = window.location.pathname.startsWith("/seller")
            ? "seller"
            : "buyer";
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
            { role: currentRole },
            { withCredentials: true },
          );

          const newToken = res.data.accessToken;

          if (currentRole === "seller") {
            localStorage.setItem("sellerAccessToken", newToken);
          } else {
            localStorage.setItem("buyerAccessToken", newToken);
          }

          isRefreshing = false;
          onRefreshed(newToken);
        } catch (err) {
          isRefreshing = false;

          // logout active role
          const currentRole = window.location.pathname.startsWith("/seller")
            ? "seller"
            : "buyer";
          if (currentRole === "seller") {
            localStorage.removeItem("sellerAccessToken");
          } else {
            localStorage.removeItem("buyerAccessToken");
          }
          return Promise.reject(err);
        }
      }

      // Queue requests while refreshing
      return new Promise((resolve) => {
        subscribeTokenRefresh((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  },
);

export default api;
