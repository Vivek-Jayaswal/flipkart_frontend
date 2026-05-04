import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/main-layout";
import { Login } from "../auth/signin";
import { Signup } from "../auth/signup";
import { HomePageRoutes } from "../pages/buyer/home-page/$routes";
import CategoryNavbar from "../components/navbar/category-navbar";
import SellerLayout from "../layout/seller-layout";
import { SellerSignup } from "../auth/seller-auth/signup";
import { SellerLogin } from "../auth/seller-auth/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/cart", element: <div>Element</div> },
      {
        path: "",
        element: <CategoryNavbar />,
        children: [...HomePageRoutes],
      },
      { path: "more", element: <h1>more</h1> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
  {
    path: "/seller",
    element: <SellerLayout />,
    children: [
      { path: "selling", element: <h1>seller</h1> },
      { path: "login", element: <SellerLogin /> },
      { path: "signup", element: <SellerSignup /> },
      { path: "learn", element: <h1>learn</h1> },
      { path: "shopeasy", element: <h1>shopeasy</h1> },
    ],
  },
  {
    path: "/admin",
    element: <SellerLayout />,
    children: [],
  },
]);
