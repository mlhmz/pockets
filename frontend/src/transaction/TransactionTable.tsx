import { useTransactions } from "@/hooks/use-transactions";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { CurrencyDisplay } from "../components/CurrencyDisplay";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useQueryPockets } from "@/pocket/hooks/use-query-pockets";
import { FromNow } from "@/components/FromNow";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useParams } from "react-router-dom";

export const TransactionTable = () => {
  const { uuid } = useParams();
  const [selectedPocket, setSelectedPocket] = useState<string | undefined>(
    uuid ?? undefined
  );
  const { data: pockets } = useQueryPockets();
  const { data, isLoading } = useTransactions(selectedPocket);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center animate-spin">
        <Loader2 />
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center m-5 gap-3">
      <h1 className="self-start font-bold text-2xl">Transactions</h1>
      <div className="self-start flex items-center gap-2">
        <Select value={selectedPocket} onValueChange={setSelectedPocket}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a pocket..." />
          </SelectTrigger>
          <SelectContent>
            {pockets &&
              pockets?.map(
                (pocket) =>
                  pocket.uuid && (
                    <SelectItem value={pocket.uuid}>{pocket.name}</SelectItem>
                  )
              )}
          </SelectContent>
        </Select>
      </div>
      <div className="border border-border shadow rounded-md overflow-y-scroll max-h-[80vh] w-full">
        <Table>
          <TableHeader className="sticky top-0 bg-background">
            <TableRow>
              <TableHead>Reason</TableHead>
              <TableHead>Issuer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data?.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-nowrap overflow-hidden max-w-[150px]">
                    {transaction.reason}
                  </TableCell>
                  <TableCell>{transaction.issuer}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <FromNow date={transaction.date} />
                        </TooltipTrigger>
                        <TooltipContent>{transaction.date}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell className="text-right">
                    <CurrencyDisplay value={transaction.amount ?? 0} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
