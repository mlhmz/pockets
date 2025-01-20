import { useFetch } from "@/hooks/use-fetch";
import { Pocket } from "@/types/Pocket";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutateDeletePocket = () => {
  const queryClient = useQueryClient();
  const { request } = useFetch()
  const { mutate, error } = useMutation({
    mutationFn: async (pocket?: Pocket) => {
      const result = await request("/api/v1/pockets/" + pocket?.uuid, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result.status !== 204) {
        throw new Error("The deletion wasn't successful.");
      }
      return pocket;
    },
    onSuccess: (pocket) => {
      queryClient.invalidateQueries({
        queryKey: ["pockets"],
      });
      toast.success(`The pocket '${pocket?.name}' was successfully deleted.`);
    },
  });
  return { mutate, error };
};
