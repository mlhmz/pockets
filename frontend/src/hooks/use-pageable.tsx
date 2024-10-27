import { Pageable } from "@/types/Page";
import { useMemo, useState } from "react";

export const usePageable = ({
  defaultPageable,
  totalPages,
}: {
  defaultPageable?: Pageable;
  totalPages?: number;
}) => {
  const [pageable, setPageable] = useState<Pageable | undefined>(
    defaultPageable
  );
  const pageNumber = useMemo(() => {
    const pageNumber = pageable?.page ?? 0;
    return pageNumber + 1;
  }, [pageable]);

  const previousPage = () =>
    setPageable((old) => {
      const oldPageValue = old?.page ?? 0;
      const newPageValue = Math.max(oldPageValue - 1, 0);

      return {
        ...old,
        page: newPageValue,
      };
    });

  const nextPage = () =>
    setPageable((old) => {
      if (totalPages === undefined || totalPages === 1) {
        return;
      }
      const maxValue = totalPages - 1;
      console.log("max value", maxValue);
      const oldPageValue = old?.page ?? 0;
      console.log("old value", oldPageValue);
      const newPageValue = Math.min(oldPageValue + 1, maxValue);
      console.log("new value", newPageValue);

      return { ...old, page: newPageValue };
    });

  const reset = () => setPageable(defaultPageable);

  return { pageable, pageNumber, setPageable, previousPage, nextPage, reset };
};
