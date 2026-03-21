import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/main-layout";
import { Login } from "../auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/cart", element: <div>Element</div> },
      { path: "/more", element: <div>more</div> },
      { path: "/login", element: <Login /> },
    ],
  },
  {
    path: "/auth",
  },
]);
