import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Pocket } from "@/types/Pocket";
import { Pencil, PlusIcon } from "lucide-react";
import { PocketEditor } from "./PocketEditor";
import { useState } from "react";

export const PocketEditorDialog = ({ pocket }: { pocket?: Pocket }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" onClick={() => setOpen(!open)}>
        {pocket ? <Pencil /> : <PlusIcon />}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <h1 className="text-xl font-bold">
              {pocket ? "Update" : "Create"} Pocket
            </h1>
          </DialogHeader>
          <PocketEditor pocket={pocket} />
        </DialogContent>
      </Dialog>
    </>
  );
};
