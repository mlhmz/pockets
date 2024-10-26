import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Layout } from "./components/Layout";
import { NotFound } from "./components/NotFound";
import { TransactionTable } from "./transaction/TransactionTable";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      { path: "/transactions", element: <TransactionTable /> },
      { path: "/transactions/:uuid", element: <TransactionTable /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
