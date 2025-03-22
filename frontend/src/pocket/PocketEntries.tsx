import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Pockets } from "@/types/Pocket";
import { Link } from "react-router-dom";

export const PocketEntries = ({ data }: { data?: Pockets }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
    {data?.map((entry) => (
      <Link key={entry.uuid} to={"/app/transactions/" + entry?.uuid}>
        <Card key={entry.uuid} className="hover:bg-muted transition-all cursor-pointer">
          <CardHeader>
            <p className="font-semibold text-md">{entry?.name}</p>
          </CardHeader>
          <CardContent>
            <CurrencyDisplay className="text-md self-end" value={entry?.transactionSum ?? 0} />
          </CardContent>
        </Card>
      </Link>
    ))}
  </div>
);
