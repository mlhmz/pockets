import { PocketEditorDialog } from "@/pocket/PocketEditorDialog";
import { useQueryPockets } from "@/pocket/hooks/use-query-pockets";
import { PocketEntry } from "../pocket/PocketEntry";
import { CategoriesChart } from "../pocket/PocketsChart";
import { DkbCsvUpload } from "./DkbCsvUpload";

export const Dashboard = () => {
  const { data } = useQueryPockets();

  return (
    <div>
      <div className="flex flex-col lg:grid grid-cols-2 grid-rows-1 gap-2 px-5 py-2 md:py-5 md:my-5">
        <div>
          <h2 className="text-lg font-bold">Statistics</h2>
          {data && <CategoriesChart data={data} />}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Categories</h2>
            <PocketEditorDialog />
          </div>
          <div className="flex flex-col border border-border rounded-md shadow">
            {data?.map((entry) => (
              <PocketEntry pocket={entry} />
            ))}
          </div>
          <DkbCsvUpload />
        </div>
      </div>
    </div>
  );
};
