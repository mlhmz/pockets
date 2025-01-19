import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Layout } from "./components/Layout";
import { NotFound } from "./components/NotFound";
import { TransactionTable } from "./transaction/TransactionTable";
import { Hero } from "./components/Hero";

export const router = createBrowserRouter([
  {
    path: "/app",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      { path: "/app/transactions", element: <TransactionTable /> },
      { path: "/app/transactions/:uuid", element: <TransactionTable /> },
    ],
  },
  {
    path: "/",
    element: <Hero />
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
