import { usePockets } from "@/hooks/use-pockets";
import { Upload } from "lucide-react";
import { PocketEntry } from "./PocketEntry";
import { CategoriesChart } from "./PocketsChart";

export const Dashboard = () => {
  const { data } = usePockets();

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
          <div className="flex flex-col bg-gray-100 rounded-md border border-border items-center justify-center min-h-32">
            <Upload className="text-gray-400" width={36} height={36} />
            <p className="text-gray-600">Upload DKB CSV</p>
          </div>
        </div>
      </div>
    </div>
  );
};
