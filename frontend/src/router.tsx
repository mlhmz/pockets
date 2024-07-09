import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      { path: "/category/vacation", element: <h1>Vacation</h1> },
      { path: "/category/liability", element: <h1>Liability</h1> },
      { path: "/category/gas", element: <h1>Gas</h1> },
      { path: "/category/car-insurance", element: <h1>Car Insurance</h1> },
      {
        path: "/category/public-broadcast",
        element: <h1>Public Broadcast</h1>,
      },
      { path: "/category/no-category", element: <h1>No Category</h1> },
    ],
  },
]);
