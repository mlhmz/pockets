import { useAuth } from "react-oidc-context";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

export const Hero = () => {
  const location = useLocation();
  const { signinRedirect, isAuthenticated, error } = useAuth();

  error && toast.error(`An error occured while authorizing: ${error?.message}`);

  if (isAuthenticated) {
    return <Navigate to="/app" replace state={{ from: location }} />;
  } else if (isAuthenticated != null && !isAuthenticated) {
    return <><button onClick={() => signinRedirect()}>Login</button></>;
  }
}