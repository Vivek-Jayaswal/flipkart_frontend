// import axios from "axios";
// import { store } from "../store";
// import { logout } from "../store/auth/auth-slice";

// export const api = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// api.interceptors.request.use((config) => {
//   const token =
//     store.getState().auth.accessToken;

//   if (token) {
//     config.headers.Authorization =
//       `Bearer ${token}`;
//   }

//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,

//   (error) => {
//     // token expired / unauthorized
//     if (error.response?.status === 401) {
//       store.dispatch(logout());

//       window.location.href =
//         "/seller/login";
//     }

//     return Promise.reject(error);
//   }
// );



// // =====================================================
// // 2. store/auth/auth-slice.ts
// // =====================================================

// import {
//   createSlice,
//   PayloadAction,
// } from "@reduxjs/toolkit";

// type AuthState = {
//   accessToken: string | null;

//   isAuthenticated: boolean;

//   role: "buyer" | "seller" | "admin" | null;

//   isProfileCompleted: boolean;

//   initialized: boolean;

//   loading: boolean;
// };

// const initialState: AuthState = {
//   accessToken: null,

//   isAuthenticated: false,

//   role: null,

//   isProfileCompleted: false,

//   initialized: false,

//   loading: true,
// };

// const authSlice = createSlice({
//   name: "auth",

//   initialState,

//   reducers: {
//     setAuth: (
//       state,
//       action: PayloadAction<{
//         token: string;

//         role: "buyer" | "seller" | "admin";

//         isProfileCompleted: boolean;
//       }>
//     ) => {
//       state.accessToken =
//         action.payload.token;

//       state.role =
//         action.payload.role;

//       state.isProfileCompleted =
//         action.payload
//           .isProfileCompleted;

//       state.isAuthenticated = true;

//       state.initialized = true;

//       state.loading = false;

//       localStorage.setItem(
//         "seller-token",
//         action.payload.token
//       );
//     },

//     finishAuthCheck: (state) => {
//       state.initialized = true;

//       state.loading = false;
//     },

//     completeProfile: (state) => {
//       state.isProfileCompleted = true;
//     },

//     logout: (state) => {
//       state.accessToken = null;

//       state.isAuthenticated = false;

//       state.role = null;

//       state.isProfileCompleted = false;

//       state.initialized = true;

//       state.loading = false;

//       localStorage.removeItem(
//         "seller-token"
//       );
//     },
//   },
// });

// export const {
//   setAuth,
//   logout,
//   completeProfile,
//   finishAuthCheck,
// } = authSlice.actions;

// export default authSlice.reducer;



// // =====================================================
// // 3. store/index.ts
// // =====================================================

// import { configureStore } from "@reduxjs/toolkit";

// import authReducer from "./auth/auth-slice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export type RootState =
//   ReturnType<typeof store.getState>;

// export type AppDispatch =
//   typeof store.dispatch;



// // =====================================================
// // 4. store/hooks.ts
// // =====================================================

// import {
//   TypedUseSelectorHook,
//   useDispatch,
//   useSelector,
// } from "react-redux";

// import type {
//   RootState,
//   AppDispatch,
// } from "./index";

// export const useAppDispatch =
//   () => useDispatch<AppDispatch>();

// export const useAppSelector: TypedUseSelectorHook<
//   RootState
// > = useSelector;



// // =====================================================
// // 5. store/auth/init-auth.ts
// // =====================================================

// import { api } from "../../api/axios";

// import {
//   finishAuthCheck,
//   logout,
//   setAuth,
// } from "./auth-slice";

// import { store } from "..";

// export async function initializeAuth() {
//   try {
//     const token =
//       localStorage.getItem(
//         "seller-token"
//       );

//     // no token
//     if (!token) {
//       store.dispatch(
//         finishAuthCheck()
//       );

//       return;
//     }

//     // =========================================
//     // ONE API CALL ON REFRESH
//     // =========================================

//     const response = await api.get(
//       "/seller/me",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     const seller =
//       response.data.data;

//     // hydrate redux
//     store.dispatch(
//       setAuth({
//         token,

//         role: "seller",

//         isProfileCompleted:
//           seller.isProfileCompleted,
//       })
//     );
//   } catch (error) {
//     store.dispatch(logout());
//   }
// }



// // =====================================================
// // 6. providers/app-provider.tsx
// // =====================================================

// import {
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";

// import { Provider } from "react-redux";

// import { store } from "../store";

// const queryClient = new QueryClient();

// export function AppProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <Provider store={store}>
//       <QueryClientProvider client={queryClient}>
//         {children}
//       </QueryClientProvider>
//     </Provider>
//   );
// }



// // =====================================================
// // 7. routes/protected-routes.tsx
// // =====================================================

// import {
//   Navigate,
//   Outlet,
// } from "react-router-dom";

// import { useAppSelector } from "../store/hooks";

// // ===========================================
// // LOADING SCREEN
// // ===========================================

// function FullPageLoader() {
//   return (
//     <div className="grid h-screen place-items-center">
//       Loading...
//     </div>
//   );
// }

// // ===========================================
// // AUTH ROUTE
// // ===========================================

// export function SellerProtectedRoute() {
//   const {
//     isAuthenticated,
//     initialized,
//     loading,
//   } = useAppSelector(
//     (state) => state.auth
//   );

//   // app bootstrapping
//   if (!initialized || loading) {
//     return <FullPageLoader />;
//   }

//   // not authenticated
//   if (!isAuthenticated) {
//     return (
//       <Navigate
//         to="/seller/login"
//         replace
//       />
//     );
//   }

//   return <Outlet />;
// }

// // ===========================================
// // PROFILE COMPLETION GUARD
// // ===========================================

// export function SellerProfileGuard() {
//   const { isProfileCompleted } =
//     useAppSelector(
//       (state) => state.auth
//     );

//   if (!isProfileCompleted) {
//     return (
//       <Navigate
//         to="/seller/onboarding"
//         replace
//       />
//     );
//   }

//   return <Outlet />;
// }

// // ===========================================
// // AUTH PAGE REDIRECT
// // ===========================================

// export function SellerAuthRedirectGuard() {
//   const {
//     initialized,
//     loading,
//     isAuthenticated,
//     isProfileCompleted,
//   } = useAppSelector(
//     (state) => state.auth
//   );

//   if (!initialized || loading) {
//     return <FullPageLoader />;
//   }

//   // already logged in
//   if (
//     isAuthenticated &&
//     isProfileCompleted
//   ) {
//     return (
//       <Navigate
//         to="/seller/dashboard"
//         replace
//       />
//     );
//   }

//   // onboarding incomplete
//   if (
//     isAuthenticated &&
//     !isProfileCompleted
//   ) {
//     return (
//       <Navigate
//         to="/seller/onboarding"
//         replace
//       />
//     );
//   }

//   return <Outlet />;
// }



// // =====================================================
// // 8. routes/index.tsx
// // =====================================================

// import {
//   createBrowserRouter,
// } from "react-router-dom";

// import {
//   SellerProtectedRoute,
//   SellerProfileGuard,
//   SellerAuthRedirectGuard,
// } from "./protected-routes";

// // layouts
// import { Layout } from "../layout/main-layout";

// import SellerAuthLayout from "../layout/seller-auth-layout";

// import SellerOnboardingLayout from "../layout/seller-onboarding-layout";

// import SellerDashboardLayout from "../layout/seller-dashboard-layout";

// // auth pages
// import SellerLogin from "../pages/seller/auth/login";

// import SellerSignup from "../pages/seller/auth/signup";

// // onboarding
// import SellerProfileSetup from "../pages/seller/onboarding/profile-setup";

// // dashboard pages
// import Dashboard from "../pages/seller/dashboard/dashboard";

// import Orders from "../pages/seller/dashboard/orders";

// import Listing from "../pages/seller/dashboard/listing";

// export const router =
//   createBrowserRouter([
//     // =====================================
//     // BUYER
//     // =====================================

//     {
//       path: "/",

//       element: <Layout />,
//     },

//     // =====================================
//     // SELLER AUTH
//     // =====================================

//     {
//       path: "/seller",

//       element: (
//         <SellerAuthRedirectGuard />
//       ),

//       children: [
//         {
//           element: <SellerAuthLayout />,

//           children: [
//             {
//               path: "login",

//               element: <SellerLogin />,
//             },

//             {
//               path: "signup",

//               element: <SellerSignup />,
//             },
//           ],
//         },
//       ],
//     },

//     // =====================================
//     // SELLER ONBOARDING
//     // =====================================

//     {
//       path: "/seller/onboarding",

//       element: (
//         <SellerProtectedRoute />
//       ),

//       children: [
//         {
//           element:
//             <SellerOnboardingLayout />,

//           children: [
//             {
//               index: true,

//               element:
//                 <SellerProfileSetup />,
//             },
//           ],
//         },
//       ],
//     },

//     // =====================================
//     // SELLER DASHBOARD
//     // =====================================

//     {
//       path: "/seller/dashboard",

//       element: (
//         <SellerProtectedRoute />
//       ),

//       children: [
//         {
//           element: (
//             <SellerProfileGuard />
//           ),

//           children: [
//             {
//               element:
//                 <SellerDashboardLayout />,

//               children: [
//                 {
//                   index: true,

//                   element:
//                     <Dashboard />,
//                 },

//                 {
//                   path: "orders",

//                   element: <Orders />,
//                 },

//                 {
//                   path: "listing",

//                   element: <Listing />,
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ]);



// // =====================================================
// // 9. main.tsx
// // =====================================================

// import ReactDOM from "react-dom/client";

// import { RouterProvider } from "react-router-dom";

// import { AppProvider } from "./providers/app-provider";

// import { router } from "./routes";

// import { initializeAuth } from "./store/auth/init-auth";

// // ==========================================
// // APP BOOTSTRAP
// // ==========================================

// async function bootstrap() {
//   // auth revalidation
//   await initializeAuth();

//   ReactDOM.createRoot(
//     document.getElementById("root")!
//   ).render(
//     <AppProvider>
//       <RouterProvider router={router} />
//     </AppProvider>
//   );
// }

// bootstrap();



// // =====================================================
// // FINAL FLOW
// // =====================================================

// /*

// SIGNUP
// --------------------------------

// /seller/signup
//    ↓
// token saved
//    ↓
// navigate("/seller/onboarding")


// ONBOARDING
// --------------------------------

// complete profile
//    ↓
// isProfileCompleted = true
//    ↓
// navigate("/seller/dashboard")


// LOGIN
// --------------------------------

// if profile complete:
//    → dashboard

// else:
//    → onboarding


// REFRESH
// --------------------------------

// ONE API CALL:
//    /seller/me

// validates:
//    ✅ token
//    ✅ seller exists
//    ✅ permissions
//    ✅ onboarding state

// then:
//    redux hydrated


// ROUTE CHANGES
// --------------------------------

// NO repeated auth API calls


// THIS IS THE PERFECT BALANCE FOR:
// --------------------------------

// ✅ portfolio
// ✅ resume
// ✅ scalable apps
// ✅ production architecture
// ✅ modern SaaS apps

// */