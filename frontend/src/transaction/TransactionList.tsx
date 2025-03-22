import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { FromNow } from "@/components/FromNow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useMutateDeletePocket } from "@/pocket/hooks/use-mutate-delete-pocket";
import { useQueryPocket } from "@/pocket/hooks/use-query-pocket";
import { PocketEditorDialog } from "@/pocket/PocketEditorDialog";
import { useTransactions } from "@/transaction/hooks/use-transactions";
import { Transaction } from "@/types/Transaction";
import { format } from "date-fns";
import { CircleX, Loader } from "lucide-react";
import { useMemo, useRef } from "react";
import { useParams } from "react-router-dom";

export const TransactionCard = ({ transaction, isFirst, isLast }: { transaction: Transaction, isFirst: boolean, isLast: boolean }) => {
  // How could i implement that the first element is top rounded and the last is bottom rounded?
  const roundedClasses = `${isFirst ? 'rounded-t-md' : ''} ${isLast ? 'rounded-b-md border-b' : ''}`;
  return <div className={`flex justify-between items-center p-2 border-t ${roundedClasses} border-x w-full shadow-sm hover:bg-muted transition-colors`}>
    <div>
      <h2 className="font-bold">{transaction.issuer}</h2>
      <p className="text-xs text-gray-600">{transaction.reason}</p>
    </div>
    <div className="flex flex-col items-end">
      <CurrencyDisplay value={transaction.amount ?? 0} />
      <p className="text-sm"><FromNow date={transaction.date} /></p>
    </div>

  </div>
}

export const TransactionList = () => {
  const { uuid } = useParams();
  const { data: pocket } = useQueryPocket(uuid);
  const { data, isLoading, isFetching, fetchNextPage } = useTransactions(uuid);
  const listRef = useRef<HTMLDivElement | null>(null);
  const { mutate: mutateDelete } = useMutateDeletePocket();

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    const allTransactions = data?.pages.flatMap(page => page.content) || [];
    return allTransactions.reduce((groups: { [key: string]: Transaction[] }, transaction: Transaction) => {
      const date = format(new Date(transaction.date ?? ""), 'dd.MM.yyyy');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    }, {});
  }, [data]);

  const onScroll = () => {
    if (!listRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
      fetchNextPage();
    }
  }

  console.log(isLoading)

  return (
    <div ref={listRef} onScroll={onScroll} className="flex flex-col items-center container h-full overflow-y-auto gap-2" >
      <Card className="w-full mt-5">
        <CardHeader>
          <h2 className="text-xl font-semibold">{pocket?.name ?? "All Transactions"}</h2>
          {pocket && <p className="text-sm">{pocket?.description}</p>}
        </CardHeader>
        {pocket && <CardContent>
          <div className="flex flex-col">
            <p className="text-xs">Summe</p>
            <p className="text-xl font-bold"><CurrencyDisplay value={pocket?.transactionSum ?? 0} /></p>
          </div>
          <div id="actions" className="flex justify-end gap-3">
            <PocketEditorDialog pocket={pocket} />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="ghost"
                    className="flex gap-1 hover:bg-red-50"
                    onClick={() => mutateDelete(pocket)}
                  >
                    <CircleX />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
        }
      </Card>
      <div className="my-2 w-full flex flex-col gap-3">
        {
          groupedTransactions && Object.keys(groupedTransactions).map(date => (
            <div key={date}>
              <h3 className="text-xs text-gray-500 mx-2">{date}</h3>
              {groupedTransactions[date].map((transaction, index) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  isFirst={index === 0}
                  isLast={index === groupedTransactions[date].length - 1}
                />
              ))}
            </div>
          ))
        }
        {(isLoading || isFetching) && <div className="w-full flex justify-center my-2" ><Loader className="animate-spin" /></div>}
      </div>
    </div >
  );
}