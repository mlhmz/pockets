import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "react-oidc-context";
import { Toaster, toast } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error: Error) => {
        toast.error(error.message);
      },
    },
  },
});

const oidcConfig = {
  authority: "http://localhost:8081/realms/savings-categorization",
  client_id: "react-client",
  redirect_uri: "/",
};

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider {...oidcConfig}>
          <Toaster />
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
