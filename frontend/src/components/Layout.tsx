import { useAuth } from "react-oidc-context";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Breadcrumbs } from "./Breadcrumbs";
import { SideNav } from "./SideNav";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { Loader, Loader2, LoaderCircle, LoaderPinwheel } from "lucide-react";

export const Layout = () => {
  const location = useLocation();
  const { isAuthenticated, isLoading, error } = useAuth();

  error && toast.error(`An error occured while logging in: ${error?.message}`);

  if (isAuthenticated === undefined || isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-screen gap-3">
        <LoaderCircle size={32} className="animate-spin ease-in-out" />
        <p>Authenticating...</p>
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />
  }
  return (
    <div className="flex">
      <SidebarProvider>
        <SideNav />
        <div className="flex-grow overflow-y-auto h-screen">
          <div className="flex items-center gap-3 p-5 border-b shadow-sm bg-sidebar h-[7vh]">
            <SidebarTrigger />
            <Breadcrumbs location={location} />
          </div>
          <div className="overflow-y-auto h-[93vh]">
            <Outlet />
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};
