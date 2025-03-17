import { Pageable } from "@/types/Page";
import { useState } from "react";

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
    setPage,
  };
};
