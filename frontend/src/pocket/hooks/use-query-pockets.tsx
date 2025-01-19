import { Pockets } from "@/types/Pocket";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";

async function fetchPockets(token?: string) {
  const result = await fetch("/api/v1/pockets", {
    headers: {
      "Authorization": "Bearer " + token
    }
  });
  const data = await result.json();
  return data as Pockets;
}

export const useQueryPockets = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["pockets"],
    queryFn: () => fetchPockets(user?.access_token),
  });
};
