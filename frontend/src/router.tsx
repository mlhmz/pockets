import { createBrowserRouter } from "react-router-dom";
import { TransactionList } from "./components/TransactionList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <TransactionList />,
  },
]);
