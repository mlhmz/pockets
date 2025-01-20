import { Menu } from "lucide-react";
import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { SideNav } from "./SideNav";
import { Button } from "./ui/button";
import { useAuth } from "react-oidc-context";
import { toast } from "sonner";
import { SidebarProvider } from "./ui/sidebar";

export const Layout = () => {
  const [showSideNav, setShowSideNav] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isLoading, error } = useAuth();

  error && toast.error(`An error occured while logging in: ${error?.message}`);

  if (isAuthenticated === undefined || isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-3">
        <span className="loading loading-spinner loading-lg"></span>
        <p>Loading</p>
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />
  }
  return (
    <div className="flex">
      <SidebarProvider>
        <SideNav showSideNav={showSideNav} setShowSideNav={setShowSideNav} />
        <div className="flex-grow overflow-y-auto h-screen">
          <div className="p-5">
            <Button
              onClick={() => setShowSideNav(!showSideNav)}
              variant="secondary"
              className="md:hidden"
            >
              <Menu />
            </Button>
          </div>
          <Outlet />
        </div>
      </SidebarProvider>
    </div>
  );
};
