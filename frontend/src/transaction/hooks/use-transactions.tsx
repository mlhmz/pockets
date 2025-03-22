import { PagedModel, mapPageableToSearchParams } from "@/types/Page";
import { Transaction } from "@/types/Transaction";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useFetch } from "../../hooks/use-fetch";

function getTransactionUrl(pocketUuid?: string) {
  return pocketUuid
    ? `/api/v1/transactions/pocket/${pocketUuid}`
    : "/api/v1/transactions";
}

export const useTransactions = (pocketUuid?: string) => {
  const { request } = useFetch();
  return useInfiniteQuery({
    queryKey: ["transactions", pocketUuid],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await request(getTransactionUrl(pocketUuid) +
        `?${mapPageableToSearchParams({
          size: 20,
          page: pageParam
        })}`);
      const data = await response.json();
      return data as PagedModel<Transaction>;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.page.totalPages === (lastPage.page.number ?? 0) + 1) {
        return undefined;
      }
      return (lastPage.page.number ?? 0) + 1;
    },
  })
};
