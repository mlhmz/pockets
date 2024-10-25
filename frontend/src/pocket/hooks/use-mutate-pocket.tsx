import { Pocket } from "@/types/Pocket";
import { useMutation } from "@tanstack/react-query";

async function createPocket(pocket: Pocket) {
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

export const useMutatePocket = () => {
  const { mutate, error } = useMutation({
    mutationFn: (pocket: Pocket) => createPocket(pocket),
  });
  return { mutate, error };
};
