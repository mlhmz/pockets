import { useQueryPockets } from "@/hooks/use-query-pockets";
import { DkbCsvUpload } from "./DkbCsvUpload";
import { PocketEntry } from "./PocketEntry";
import { CategoriesChart } from "./PocketsChart";

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
          <h2 className="text-lg font-bold">Categories</h2>
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
