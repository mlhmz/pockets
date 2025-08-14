import { useFetch } from "@/hooks/use-fetch";
import { Pocket } from "@/types/Pocket";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRecalculateTransactionSum = () => {
  const queryClient = useQueryClient();
  const { request } = useFetch();
  const { mutate, error } = useMutation({
    mutationFn: async (uuid: string) => {
      const response = await request(`/api/v1/pockets/actions/recalculatePocketSum/${uuid}`, {
        method: "POST",
      })
      const data = await response.json();
      return data as Pocket;
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["pockets"],
      });
      toast.success(`The pocket '${result.name}' was updated to ${result.transactionSum}€.`);
    },
  });
  return { execute: mutate, error };
};
