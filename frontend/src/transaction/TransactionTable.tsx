import { FromNow } from "@/components/FromNow";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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
import { useTransactions } from "@/hooks/use-transactions";
import { useQueryPockets } from "@/pocket/hooks/use-query-pockets";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

export const TransactionTable = () => {
  const { uuid } = useParams();
  const [selectedPocket, setSelectedPocket] = useState<string | undefined>(
    uuid ?? undefined
  );
  const { data: pockets } = useQueryPockets();
  const [totalPages, setTotalPages] = useState(1);
  const { pageable, pageNumber, previousPage, nextPage, reset } = usePageable({
    defaultPageable: {
      size: 20,
      page: 0,
    },
    totalPages: totalPages,
  });
  const { data, isLoading } = useTransactions(selectedPocket, pageable);

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
      <h1 className="self-start font-bold text-2xl">Transactions</h1>
      <div className="self-start flex items-center gap-2">
        <Select
          value={selectedPocket}
          onValueChange={(pocket) => {
            setSelectedPocket(pocket);
            reset();
          }}
        >
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
      <div className="border border-border shadow rounded-md overflow-y-scroll h-[70vh] w-full bg-gray-100">
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
          <PaginationItem>
            <PaginationLink>{pageNumber}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
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
