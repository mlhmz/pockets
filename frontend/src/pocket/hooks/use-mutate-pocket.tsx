import { useFetch } from "@/hooks/use-fetch";
import { Pocket, PocketMutation } from "@/types/Pocket";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutatePocket = () => {
  const queryClient = useQueryClient();
  const { request } = useFetch();

  const createPocket = async (pocket: PocketMutation) => {
    const result = await request("/api/v1/pockets", {
      method: "POST",
      body: JSON.stringify(pocket),
    });
    const data = await result.json();
    return data as Pocket;
  }

  const updatePocket = async (pocket: PocketMutation) => {
    const result = await request("/api/v1/pockets/" + pocket.uuid, {
      method: "PUT",
      body: JSON.stringify(pocket),
    });
    const data = await result.json();
    return data as Pocket;
  }

  const { mutate, error } = useMutation({
    mutationFn: (pocket: PocketMutation) =>
      pocket?.uuid ? updatePocket(pocket) : createPocket(pocket),
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: ["pockets"],
      });
      toast.success(
        `The pocket '${result.name}' was ${result ? "updated" : "created"}.`
      );
    },
  });
  return { mutate, error };
};
