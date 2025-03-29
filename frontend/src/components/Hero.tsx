import { useAuth } from "react-oidc-context";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";

export const Hero = () => {
  const location = useLocation();
  const { signinRedirect, isAuthenticated, error } = useAuth();

  error && toast.error(`An error occured while authorizing: ${error?.message}`);

  if (isAuthenticated) {
    return <Navigate to="/app" replace state={{ from: location }} />;
  } else if (isAuthenticated != null && !isAuthenticated) {
    return <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 border p-2 rounded-md shadow-sm">
        <p className="font-bold text-xl">Login with SSO</p>
        <Button onClick={() => signinRedirect()}>Login</Button>
      </div>
    </div>;
  }
}