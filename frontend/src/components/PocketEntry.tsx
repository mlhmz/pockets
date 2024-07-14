import { Pocket } from "@/types/Pocket";
import { CurrencyDisplay } from "./CurrencyDisplay";

export const PocketEntry = ({ pocket }: { pocket?: Pocket }) => {
  return (
    <>
      <div className="flex gap-3 p-3 border-b border-b-border">
        {/* <p>
          {pocketTransactions.type &&
            getCategoryIcon(categoryTransaction.type)}
        </p> */}
        <p>{pocket?.name}</p>
        <CurrencyDisplay value={pocket?.transactionSum ?? 0} />
      </div>
    </>
  );
};
