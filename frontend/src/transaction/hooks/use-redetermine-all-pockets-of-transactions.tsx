import { Transactions } from "@/types/Transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";

async function executeAction(token?: string) {
  const result = await fetch(
    `/api/v1/transactions/actions/redetermineAllPocketsOfTransactions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
    }
  );
  const data = await result.json();
  return data as Transactions;
}

export const useRedetermineAllPocketsOfTransactions = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: () => executeAction(user?.access_token),
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
