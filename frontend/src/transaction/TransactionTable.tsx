import { FromNow } from "@/components/FromNow";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePageable } from "@/hooks/use-pageable";
import { cn } from "@/lib/utils";
import { useQueryPocket } from "@/pocket/hooks/use-query-pocket";
import { useTransactions } from "@/transaction/hooks/use-transactions";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CurrencyDisplay } from "../components/CurrencyDisplay";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { TransactionEditorDialog } from "./TransactionEditorDialog";

export const TransactionTable = () => {
  const { uuid } = useParams();
  const { data: pocket } = useQueryPocket(uuid);
  const [totalPages, setTotalPages] = useState(1);
  const { pageable, previousPage, nextPage, nextPages, setPage } =
    usePageable({
      defaultPageable: {
        size: 20,
        page: 0,
      },
      totalPages: totalPages,
    });
  const { data, isLoading } = useTransactions(uuid, pageable);

  // todo: weird, find a better way, of binding the total pages from the spring request.
  useEffect(() => {
    setTotalPages(data?.page.totalPages ?? 1);
  }, [data]);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center animate-spin">
        <Loader2 />
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center m-5 gap-3">
      <div className="self-start flex flex-col min-h-14">
        <h1 className="font-bold text-2xl m-0">Transactions</h1>
        <h2 className="text-sm">{pocket?.name}</h2>
      </div>
      <div className="border border-border shadow-sm rounded-md overflow-y-scroll h-[70vh] w-full bg-gray-100">
        <Table>
          <TableHeader className="sticky top-0 bg-background">
            <TableRow>
              <TableHead>Reason</TableHead>
              <TableHead>Issuer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data?.content?.map((transaction) => (
                <TableRow key={transaction.id} className="bg-background">
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
                  <TableCell className="w-[120px]">
                    <TransactionEditorDialog transaction={transaction} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => previousPage()}
            />
          </PaginationItem>
          {nextPages.map((value) => (
            <PaginationItem
              className={cn(
                value.current && "border rounded-md shadow-sm",
                "cursor-pointer"
              )}
            >
              <PaginationLink onClick={() => setPage(value.index)}>
                {value.index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() => nextPage()}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
