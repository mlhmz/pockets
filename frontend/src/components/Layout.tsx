import { useState } from "react";
import { useAuth } from "react-oidc-context";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { SideNav } from "./SideNav";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";

export const Layout = () => {
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
        <SideNav />
        <div className="flex-grow overflow-y-auto h-screen">
          <div className="p-5">
            <SidebarTrigger />
          </div>
          <Outlet />
        </div>
      </SidebarProvider>
    </div>
  );
};
