import { useQuery } from "@tanstack/react-query";
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
    const {data, isLoading} = useQuery({
        queryKey: ["oidc-config"],
        queryFn: getOidcConfig,
        retry: 3,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return <AuthProvider {...data}>{children}</AuthProvider>;
}
