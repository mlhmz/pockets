import { Pageable } from "@/types/Page";
import { useMemo, useState } from "react";
import { useNextPages } from "./use-next-pages";

export const usePageable = ({
  defaultPageable,
  totalPages,
}: {
  defaultPageable?: Pageable;
  totalPages?: number;
}) => {
  const [pageable, setPageable] = useState<Pageable>(
    defaultPageable ?? ({} as Pageable)
  );
  const currentPage = useMemo(() => pageable?.page ?? 1, [pageable]);
  const maxPages = useMemo(() => totalPages ?? 1, [totalPages]);
  const nextPages = useNextPages(currentPage, maxPages);

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
        return {};
      }
      const maxValue = totalPages - 1;
      const oldPageValue = old.page ?? 0;
      const newPageValue = Math.min(oldPageValue + 1, maxValue);

      return { ...old, page: newPageValue };
    });

  const setPage = (value: number) =>
    setPageable((old) => {
      return { ...old, page: value };
    });

  const reset = () => setPageable(defaultPageable ?? {});

  return {
    pageable,
    setPageable,
    previousPage,
    nextPage,
    reset,
    nextPages,
    setPage,
  };
};
