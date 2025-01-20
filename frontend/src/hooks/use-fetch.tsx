import { useAuth } from "react-oidc-context"

export const useFetch = () => {
    const { user } = useAuth();

    const request = (url: string, init?: RequestInit) => {
        return fetch(url, {
            ...init,
            headers: {
                ...init?.headers,
                "Authorization": "Bearer " + user?.access_token,
                "Content-Type": "application/json"
            }
        });
    }

    return { request };
}