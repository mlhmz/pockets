import { useFetch } from "@/hooks/use-fetch";
import { Pocket } from "@/types/Pocket";
import { useQuery } from "@tanstack/react-query";

export const useQueryPocket = (uuid?: string) => {
  const { request } = useFetch();
  return useQuery({
    queryKey: ["pocket", uuid],
    queryFn: async () => {
      const result = await request(`/api/v1/pockets/${uuid}`);
      const data = await result.json();
      return data as Pocket;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!uuid,
  });
};
