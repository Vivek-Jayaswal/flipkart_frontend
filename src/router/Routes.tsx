import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/main-layout";
import { HomePageRoutes } from "../pages/buyer/home-page/$routes";
import CategoryNavbar from "../components/navbar/category-navbar";
import SellerLayout from "../layout/seller-layout";
import { SellerSignup } from "../auth/seller-auth/signup";
import { SellerDashboard } from "../pages/seller/dashboard/dashboard";
import SellerDashboardLayout from "../layout/seller-dashboard-layout";
import HomePage from "../pages/seller/dashboard/home/home";
import { SellerProtectedRoute, PublicSellerRoute } from "./gaurd";
import SellerOnboardingProtectedRoute from "./protected-gaurds/onboarding-protectd-route";
import { AdminLogin } from "../auth/admin/admin-login";
import { AdminSignup } from "../auth/admin/admin-signup";
import { BuyerLogin } from "../auth/buyer/buyer-login";
import { BuyerSignup } from "../auth/buyer/buyer-signup";
import { AdminLayout } from "../layout/admin-layout";
import { AdminPublicProtectedRoute } from "./protected-gaurds/admin-protectd-route";
import ProductAddPage from "../pages/seller/dashboard/product/createProduct";
import { ProductListPage } from "../pages/seller/dashboard/product/product-list";
import { ProductMainDetail } from "../pages/buyer/home-page/product-details";
import { Cart } from "../pages/buyer/cart/cart";
import SellerLandingPage from "../pages/seller/seller-landing-page/SellerLanding";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/cart", element: <Cart /> },
      {
        path: "",
        element: <CategoryNavbar />,
        children: [...HomePageRoutes],
      },
      {
        path: "/product-details/:name/:id",
        element: <ProductMainDetail />,
      },
      { path: "more", element: <h1>more</h1> },
      { path: "login", element: <BuyerLogin /> },
      { path: "signup", element: <BuyerSignup /> },
    ],
  },

  {
    path: "/seller",

    element: (
      <PublicSellerRoute>
        <SellerLayout />
      </PublicSellerRoute>
    ),
    children: [
      {
        index: true,
        element: <SellerLandingPage />,
      },
      {
        path: "signup",
        element: <SellerSignup />,
      },
    ],
  },

  {
    path: "/seller/onboarding",
    element: (
      <SellerOnboardingProtectedRoute>
        <SellerDashboard />
      </SellerOnboardingProtectedRoute>
    ),
  },

  {
    path: "/seller/dashboard",

    element: (
      <SellerProtectedRoute>
        <SellerDashboardLayout />
      </SellerProtectedRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "listing",
        children: [
          { path: "create-product", element: <ProductAddPage /> },
          { path: "product-list", element: <ProductListPage /> },
        ],
      },
      { path: "order", element: <>Order</> },
      { path: "return", element: <>Return</> },
      { path: "payments", element: <>Payments</> },
      { path: "payouts", element: <>Payouts</> },
      { path: "reports", element: <>Reports</> },
      { path: "advertising", element: <>Advertising</> },
      { path: "*", element: <>Not Found</> },
    ],
  },

  {
    path: "/admin",
    element: (
      <AdminPublicProtectedRoute>
        <AdminLayout />,
      </AdminPublicProtectedRoute>
    ),
    children: [
      { path: "login", element: <AdminLogin /> },
      { path: "signup", element: <AdminSignup /> },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <AdminLayout />,
    children: [
      { path: "login", element: <AdminLogin /> },
      { path: "signup", element: <AdminSignup /> },
    ],
  },
]);
