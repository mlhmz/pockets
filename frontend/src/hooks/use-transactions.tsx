import { Transactions } from "@/types/Transaction";
import { useQuery } from "@tanstack/react-query";

function getTransactionUrl(pocketUuid?: string) {
  return pocketUuid
    ? `/api/v1/transactions/pocket/${pocketUuid}`
    : "/api/v1/transactions";
}

async function fetchTransactions(pocketUuid?: string) {
  const result = await fetch(getTransactionUrl(pocketUuid));
  const data = await result.json();
  return data as Transactions;
}

export const useTransactions = (pocketUuid?: string) => {
  return useQuery({
    queryKey: ["transactions", pocketUuid],
    queryFn: () => fetchTransactions(pocketUuid),
  });
};
