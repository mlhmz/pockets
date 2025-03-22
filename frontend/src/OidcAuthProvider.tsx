import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { AuthProvider } from "react-oidc-context";

interface OidcConfig {
  authority: string;
  client_id: string;
  redirect_uri: string;
}

async function getOidcConfig() {
  const response = await fetch("/oidc-config");
  const data = await response.json();
  return data as OidcConfig;
}

export const OidcAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["oidc-config"],
    queryFn: getOidcConfig,
    retry: 3,
  });

  if (isLoading) {
    return <div className="flex flex-col justify-center items-center h-screen w-screen gap-3">
      <LoaderCircle size={32} className="animate-spin ease-in-out" />
      <p>Authenticating...</p>
    </div>;
  }
  return <AuthProvider {...data}>{children}</AuthProvider>;
}
