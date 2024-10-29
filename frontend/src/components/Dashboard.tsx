import { PocketEditorDialog } from "@/pocket/PocketEditorDialog";
import { PocketEntries } from "@/pocket/PocketEntries";
import { useQueryPockets } from "@/pocket/hooks/use-query-pockets";
import { CategoriesChart } from "../pocket/PocketsChart";
import { DkbCsvUpload } from "./DkbCsvUpload";
import { Button } from "./ui/button";
import { useRedetermineAllPocketsOfTransactions } from "@/transaction/hooks/use-redetermine-all-pockets-of-transactions";
import { toast } from "sonner";

export const Dashboard = () => {
  const { data } = useQueryPockets();
  const { mutateAsync: executeAction } =
    useRedetermineAllPocketsOfTransactions();

  return (
    <div>
      <div className="flex flex-col lg:grid grid-cols-2 grid-rows-1 gap-2 px-5 py-2 md:py-5 md:my-5">
        <div>
          <div className="min-h-12 flex items-center">
            <h2 className="text-lg font-bold">Statistics</h2>
          </div>
          <div className="flex flex-col gap-3">
            {data && <CategoriesChart data={data} />}
            <DkbCsvUpload />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="min-h-12 flex items-center justify-between">
            <h2 className="text-lg font-bold">Categories</h2>
            <PocketEditorDialog />
          </div>
          <div className="flex flex-col gap-2">
            <PocketEntries data={data} />
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
          </div>
        </div>
      </div>
    </div>
  );
};
