import { Pocket, PocketMutation } from "@/types/Pocket";
import { useMutation } from "@tanstack/react-query";

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
  const { mutate, error } = useMutation({
    mutationFn: (pocket: PocketMutation) =>
      pocket?.uuid ? updatePocket(pocket) : createPocket(pocket),
  });
  return { mutate, error };
};
