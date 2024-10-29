import { Transaction, TransactionMutation } from "@/types/Transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function updateTransaction(
  transactionUuid: string,
  transaction: TransactionMutation
) {
  const result = await fetch(`/api/v1/transactions/${transactionUuid}`, {
    method: "PUT",
    body: JSON.stringify(transaction),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();
  return data as Transaction;
}

export const useMutateTransaction = ({
  transactionId,
}: {
  transactionId: string;
}) => {
  const queryClient = useQueryClient();
  const { mutate, error } = useMutation({
    mutationFn: (transaction: TransactionMutation) =>
      updateTransaction(transactionId, transaction),
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
      toast.success(`The transaction '${result.reason}' was updated.`);
    },
  });
  return { mutate, error };
};
