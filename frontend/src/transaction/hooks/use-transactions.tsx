import { Pageable, PagedModel, mapPageableToSearchParams } from "@/types/Page";
import { Transaction } from "@/types/Transaction";
import { useQuery } from "@tanstack/react-query";
import { useFetch } from "../../hooks/use-fetch";

function getTransactionUrl(pocketUuid?: string) {
  return pocketUuid
    ? `/api/v1/transactions/pocket/${pocketUuid}`
    : "/api/v1/transactions";
}

export const useTransactions = (pocketUuid?: string, pageable?: Pageable) => {
  const { request } = useFetch();
  return useQuery({
    queryKey: ["transactions", pocketUuid, pageable],
    queryFn: async () => {
      const response = await request(getTransactionUrl(pocketUuid) +
        (pageable ? `?${mapPageableToSearchParams(pageable)}` : ""));
      const data = await response.json();
      return data as PagedModel<Transaction>;
    },
  });
};
