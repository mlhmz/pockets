import { Transactions } from "@/types/Transaction";
import { useQuery } from "@tanstack/react-query";

async function getAllTransactions() {
  const result = await fetch("/api/v1/transactions");
  const data = await result.json();
  return data as Transactions;
}

export const TransactionList = () => {
  const { data } = useQuery({
    queryKey: ["transactions"],
    queryFn: getAllTransactions,
  });

  return (
    <>
      {data?.map((transaction) => (
        <>{transaction.id}</>
      ))}
    </>
  );
};
