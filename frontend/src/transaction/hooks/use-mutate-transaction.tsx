import { useFetch } from "@/hooks/use-fetch";
import { Transaction, TransactionMutation } from "@/types/Transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutateTransaction = ({
  transactionId,
}: {
  transactionId: string;
}) => {
  const queryClient = useQueryClient();
  const { request } = useFetch();
  const { mutate, error } = useMutation({
    mutationFn: async (transaction: TransactionMutation) => {
      const response = await request(`/api/v1/transactions/${transactionId}`, {
        method: "PUT",
        body: JSON.stringify(transaction)
      })
      const data = await response.json();
      return data as Transaction;
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      toast.success(`The transaction '${result.reason}' was updated.`);
    },
  });
  return { mutate, error };
};
