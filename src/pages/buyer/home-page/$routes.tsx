import type { RouteObject } from "react-router-dom";
import { Home } from "./index";

export const HomePageRoutes: RouteObject[] = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "fashion",
    element: <h2>Fashion</h2>,
  },
  {
    path: "beauty",
    element: <h2>Beauty</h2>,
  },
  {
    path: "mobiles",
    element: <h2>Mobiles</h2>,
  },
  {
    path: "food-health",
    element: <h2>Food and health</h2>,
  },
  {
    path: "appliances",
    element: <h2>Appliaces</h2>,
  },
  {
    path: "electronics",
    element: <h2>Electronics</h2>,
  },
  {
    path: "toys",
    element: <h2>Toys</h2>,
  },
  {
    path: "auto-acc",
    element: <h2>Auto</h2>,
  },
  {
    path: "automobiles",
    element: <h2>Two wheeler</h2>,
  },
  {
    path: "sports",
    element: <h2>sports</h2>,
  },
  {
    path: "furniture",
    element: <h2>furniture</h2>,
  },
  {
    path: "books",
    element: <h2>books</h2>,
  },
];
