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
    ],
  },
]);
