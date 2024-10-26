import { Pocket, PocketMutation } from "@/types/Pocket";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

async function createPocket(pocket: PocketMutation) {
  const result = await fetch("/api/v1/pockets", {
    method: "POST",
    body: JSON.stringify(pocket),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();
  return data as Pocket;
}

async function updatePocket(pocket: PocketMutation) {
  const result = await fetch("/api/v1/pockets/" + pocket.uuid, {
    method: "PUT",
    body: JSON.stringify(pocket),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await result.json();
  return data as Pocket;
}

export const useMutatePocket = () => {
  const queryClient = useQueryClient();
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
