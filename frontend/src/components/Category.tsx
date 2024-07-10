import { getCategoryIcon, getCategoryName } from "@/types/CategoryType";
import { CategoryTransaction } from "@/types/Transaction";
import { CurrencyDisplay } from "./CurrencyDisplay";

export const Category = ({
  categoryTransaction,
}: {
  categoryTransaction: CategoryTransaction;
}) => {
  return (
    <>
      <div className="flex gap-3 p-3 border-b border-b-border">
        <p>
          {categoryTransaction.type &&
            getCategoryIcon(categoryTransaction.type)}
        </p>
        <p>
          {categoryTransaction.type &&
            getCategoryName(categoryTransaction.type)}
        </p>
        <CurrencyDisplay value={categoryTransaction.sum ?? 0} />
      </div>
    </>
  );
};
