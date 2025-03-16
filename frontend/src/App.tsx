import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster, toast } from "sonner";
import { OidcAuthProvider } from "./OidcAuthProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error: Error) => {
        toast.error(error.message);
      },
    },
  },
});


function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <OidcAuthProvider>
          <Toaster />
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </OidcAuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
