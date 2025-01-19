import { Pocket } from "@/types/Pocket";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "react-oidc-context";
import { toast } from "sonner";

async function deletePocket(pocket?: Pocket, token?: string) {
  const result = await fetch("/api/v1/pockets/" + pocket?.uuid, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
  });
  if (result.status !== 204) {
    throw new Error("The deletion wasn't successful.");
  }
  return pocket;
}

export const useMutateDeletePocket = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { mutate, error } = useMutation({
    mutationFn: (pocket?: Pocket) => deletePocket(pocket, user?.access_token),
    onSuccess: (pocket) => {
      queryClient.invalidateQueries({
        queryKey: ["pockets"],
      });
      toast.success(`The pocket '${pocket?.name}' was successfully deleted.`);
    },
  });
  return { mutate, error };
};
