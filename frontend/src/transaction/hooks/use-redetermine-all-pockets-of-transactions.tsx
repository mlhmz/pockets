import { useFetch } from "@/hooks/use-fetch";
import { Transactions } from "@/types/Transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";



export const useRedetermineAllPocketsOfTransactions = () => {
  const queryClient = useQueryClient();
  const { request } = useFetch()
  return useMutation({
    mutationFn: async () => {
      const result = await request(`/api/v1/transactions/actions/redetermineAllPocketsOfTransactions`, {
        method: "POST",
      });
      const data = await result.json();
      return data as Transactions;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pockets"],
      });
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });
};
