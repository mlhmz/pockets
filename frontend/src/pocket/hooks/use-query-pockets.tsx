import { useFetch } from "@/hooks/use-fetch";
import { Pockets } from "@/types/Pocket";
import { useQuery } from "@tanstack/react-query";

export const useQueryPockets = () => {
  const { request } = useFetch();
  return useQuery({
    queryKey: ["pockets"],
    queryFn: async () => {
      const result = await request("/api/v1/pockets");
      const data = await result.json();
      return data as Pockets;
    }
  });
};
