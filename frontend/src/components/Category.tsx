import {
  CategoryType,
  getCategoryIcon,
  getCategoryName,
} from "@/types/CategoryType";
import { Transactions, calculateSum } from "@/types/Transaction";
import { useQuery } from "@tanstack/react-query";

async function fetchTransactionsWithCategory(category: CategoryType) {
  const result = await fetch(`/api/v1/transactions/category/${category}`);
  const data = await result.json();
  return data as Transactions;
}

export const Category = ({ category }: { category: CategoryType }) => {
  const { data } = useQuery({
    queryKey: ["transaction", category],
    queryFn: () => fetchTransactionsWithCategory(category),
  });

  return (
    <div>
      <p>{getCategoryIcon(category)}</p>
      <p>{getCategoryName(category)}</p>
      <p>{data && calculateSum(data)}</p>
    </div>
  );
};
