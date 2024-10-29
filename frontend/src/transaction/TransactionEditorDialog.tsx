import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Transaction } from "@/types/Transaction";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Info, Pencil } from "lucide-react";
import { useState } from "react";
import { TransactionEditor } from "./TransactionEditor";

export const TransactionEditorDialog = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button variant="ghost" onClick={() => setOpen(!open)}>
                <Pencil />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit Transaction</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {transaction.hideForced ||
          (transaction.pocketForced && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="cursor-default">
                  <Info />
                </TooltipTrigger>
                <TooltipContent>
                  This transaction was modified with the reason '
                  {transaction.forceReason}'
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>
            <h1 className="text-xl font-bold">
              {transaction ? "Update" : "Create"} Pocket
            </h1>
          </DialogTitle>
          {open && (
            <TransactionEditor
              transaction={transaction}
              onSuccess={() => setOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
