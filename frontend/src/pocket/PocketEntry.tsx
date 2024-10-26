import { FromNow } from "@/components/FromNow";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTransactions } from "@/hooks/use-transactions";
import { cn } from "@/lib/utils";
import { Pocket } from "@/types/Pocket";
import { ChevronDown, ChevronRight, CircleX } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CurrencyDisplay } from "../components/CurrencyDisplay";
import { PocketEditorDialog } from "./PocketEditorDialog";
import { useMutateDeletePocket } from "./hooks/use-mutate-delete-pocket";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const PocketEntry = ({ pocket }: { pocket?: Pocket }) => {
  const { data } = useTransactions(pocket?.uuid);
  const { mutate: mutateDelete } = useMutateDeletePocket();
  const queryClient = useQueryClient();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="p-3 border-b border-b-border transition-all">
        <div
          onClick={() => setExpanded(!expanded)}
          className="flex items-center cursor-pointer"
        >
          <div>{expanded ? <ChevronDown /> : <ChevronRight />}</div>
          <div className="flex gap-3 justify-between flex-grow">
            <p>{pocket?.name}</p>
            <CurrencyDisplay value={pocket?.transactionSum ?? 0} />
          </div>
        </div>

        {expanded && (
          <div className="flex flex-col">
            <div className="flex w-full justify-end border-b">
              <div className="flex py-2 gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <PocketEditorDialog pocket={pocket} />
                    </TooltipTrigger>
                    <TooltipContent>Edit</TooltipContent>
                  </Tooltip>
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
            </div>

            <div>
              {data?.slice(0, 5).map((entry, index) => (
                /** TODO: Max Fetch Size in API */
                <div
                  className={cn(
                    "flex justify-between py-2 px-2",
                    index !== 0 && "border-t"
                  )}
                >
                  <div className="flex gap-2 items-center">
                    <p className="overflow-hidden text-nowrap max-w-[450px]">
                      {entry.reason?.substring(0, 45)}
                      {(entry.reason?.length ?? 0) >= 45 && "..."}
                    </p>
                    <p className="text-xs text-gray-500">
                      <FromNow date={entry.date} />
                    </p>
                  </div>
                  <CurrencyDisplay value={entry.amount ?? 0} />
                </div>
              ))}
            </div>
            <Link to={"/transactions/" + pocket?.uuid}>
              <Button variant="ghost" className="mt-1 w-full">
                More
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
