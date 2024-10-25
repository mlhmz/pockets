import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Layout } from "./components/Layout";
import { NotFound } from "./components/NotFound";
import { TransactionTable } from "./transaction/TransactionTable";
import { PocketEditor } from "./pocket/PocketEditor";

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
      { path: "/pockets", element: <PocketEditor /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
