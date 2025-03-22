import { useQueryPocket } from "@/pocket/hooks/use-query-pocket";

export const PocketBreadcrumb = ({uuid}: {uuid?: string}) => {
  const {data} = useQueryPocket(uuid);

  return (
    <p className="text-sm">
      {data?.name}
    </p>
  );
}