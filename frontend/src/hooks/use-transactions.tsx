import { Pageable, PagedModel, mapPageableToSearchParams } from "@/types/Page";
import { Transaction } from "@/types/Transaction";
import { useQuery } from "@tanstack/react-query";

function getTransactionUrl(pocketUuid?: string) {
  return pocketUuid
    ? `/api/v1/transactions/pocket/${pocketUuid}`
    : "/api/v1/transactions";
}

async function fetchTransactions(pocketUuid?: string, pageable?: Pageable) {
  const result = await fetch(
    getTransactionUrl(pocketUuid) +
      (pageable ? `?${mapPageableToSearchParams(pageable)}` : "")
  );
  const data = await result.json();
  return data as PagedModel<Transaction>;
}

export const useTransactions = (pocketUuid?: string, pageable?: Pageable) => {
  return useQuery({
    queryKey: ["transactions", pocketUuid, pageable],
    queryFn: () => fetchTransactions(pocketUuid, pageable),
  });
};
