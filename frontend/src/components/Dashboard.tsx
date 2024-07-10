import { CategoryTransactions } from "@/types/Transaction";
import { useQuery } from "@tanstack/react-query";
import { Category } from "./Category";
import { CategoriesChart } from "./CategoriesChart";

async function fetchTransactionsGroupedByCategory() {
  const result = await fetch(`/api/v1/transactions/category`);
  const data = await result.json();
  return data as CategoryTransactions;
}

export const Dashboard = () => {
  const { data } = useQuery({
    queryKey: ["transactions", "categories"],
    queryFn: () => fetchTransactionsGroupedByCategory(),
  });

  return (
    <div>
      <div className="grid grid-cols-2 p-5 my-5 gap-5">
        <div>
          <h2 className="text-lg font-bold py-2">Statistics</h2>
          {data && <CategoriesChart data={data} />}
        </div>
        <div>
          <h2 className="text-lg font-bold py-2">Categories</h2>
          <div className="flex flex-col border border-border rounded-md shadow">
            {data?.map((categoryTransaction) => (
              <Category categoryTransaction={categoryTransaction} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
