import { CurrencyDisplay } from "@/components/CurrencyDisplay";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Pockets } from "@/types/Pocket";
import { Link } from "react-router-dom";

export const PocketEntries = ({ data }: { data?: Pockets }) => (
  <div className="grid grid-cols-3 gap-3">
    {data?.map((entry) => (
      <Link className="" to={"/app/transactions/" + entry?.uuid}>
        <Card key={entry.uuid} className="hover:bg-muted transition-all cursor-pointer">
          <CardHeader>
            <p className="font-semibold text-md">{entry?.name}</p>
          </CardHeader>
          <CardContent>
            <p className="text-md self-end"><CurrencyDisplay value={entry?.transactionSum ?? 0} /></p>
          </CardContent>
        </Card>
      </Link>
    ))}
  </div>
);
