import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/main-layout";
import { Login } from "../auth/signin";
import { Signup } from "../auth/signup";
import { HomePageRoutes } from "../pages/buyer/home-page/$routes";
import CategoryNavbar from "../components/navbar/category-navbar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/cart", element: <div>Element</div> },
      {
        path : "",
        element: <CategoryNavbar />,
        children: [...HomePageRoutes],
      },
      { path: "/more", element: <h1>more</h1> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
  {
    path: "/auth",
  },
]);
