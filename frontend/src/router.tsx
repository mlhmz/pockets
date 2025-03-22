import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Hero } from "./components/Hero";
import { Layout } from "./components/Layout";
import { NotFound } from "./components/NotFound";
import { TransactionList } from "./transaction/TransactionList";

export const router = createBrowserRouter([
  {
    path: "/app",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      { path: "/app/transactions", element: <TransactionList /> },
      { path: "/app/transactions/:uuid", element: <TransactionList /> },
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
