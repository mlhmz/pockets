import { Pockets } from "@/types/Pocket";
import { useQuery } from "@tanstack/react-query";

async function fetchPockets() {
  const result = await fetch("/api/v1/pockets");
  const data = await result.json();
  return data as Pockets;
}

export const usePockets = () => {
  return useQuery({
    queryKey: ["pockets"],
    queryFn: () => fetchPockets(),
  });
};
