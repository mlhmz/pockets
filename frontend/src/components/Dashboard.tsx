import { PocketEditorDialog } from "@/pocket/PocketEditorDialog";
import { PocketEntries } from "@/pocket/PocketEntries";
import { useQueryPockets } from "@/pocket/hooks/use-query-pockets";
import { CategoriesChart } from "../pocket/PocketsChart";
import { DkbCsvUpload } from "./DkbCsvUpload";
import { Button } from "./ui/button";
import { useRedetermineAllPocketsOfTransactions } from "@/transaction/hooks/use-redetermine-all-pockets-of-transactions";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "./ui/card";

export const Dashboard = () => {
  const { data } = useQueryPockets();
  const { mutateAsync: executeAction } =
    useRedetermineAllPocketsOfTransactions();

  return (
    <div className="container my-5">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex flex-col lg:grid grid-cols-2 grid-rows-1 gap-2 py-2 md:py-5 md:my-5">
        {data && <CategoriesChart data={data} />}
        <Card className="h-full">
          <CardHeader>
            <h2 className="font-semibold text-xl">Actions</h2>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 p-5 items-center justify-center">
            <DkbCsvUpload />
            <Button
              onClick={() =>
                toast.promise(executeAction(), {
                  loading: "Loading...",
                  success: (data) => {
                    return `${data.length} were assigned to other pockets.`;
                  },
                })
              }
              className="w-full"
            >
              Redetermine all
            </Button>
          </CardContent>
        </Card>
        <div className="flex flex-col col-span-2">
          <div className="min-h-12 flex items-center justify-between">
            <h2 className="text-lg font-bold">Categories</h2>
            <PocketEditorDialog />
          </div>
          <div>
            <PocketEntries data={data} />
          </div>
        </div>
      </div>
    </div >
  );
};