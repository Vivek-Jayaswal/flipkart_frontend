import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/main-layout";
import { Login } from "../auth/signin";
import { Signup } from "../auth/signup";
import { Home } from "../pages/buyer/home-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/cart", element: <div>Element</div> },
      { path: "/more", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
  {
    path: "/auth",
  },
]);
