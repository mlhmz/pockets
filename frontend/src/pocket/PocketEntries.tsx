import { Card } from "@/components/ui/card";
import { Pockets } from "@/types/Pocket";
import { PocketEntry } from "./PocketEntry";
import { cn, isIndexLastListEntry } from "@/lib/utils";
export const PocketEntries = ({ data }: { data?: Pockets }) => (
  <Card className="flex flex-col">
    {data?.map((entry, index) => (
      <div className={cn(!isIndexLastListEntry(index, data) && "border-b")}>
        <PocketEntry pocket={entry} />
      </div>
    ))}
  </Card>
);
