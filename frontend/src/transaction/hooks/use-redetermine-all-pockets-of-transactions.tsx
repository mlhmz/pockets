import { Transactions } from "@/types/Transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function executeAction() {
  const result = await fetch(
    `/api/v1/transactions/actions/redetermineAllPocketsOfTransactions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await result.json();
  return data as Transactions;
}

export const useRedetermineAllPocketsOfTransactions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: executeAction,
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
