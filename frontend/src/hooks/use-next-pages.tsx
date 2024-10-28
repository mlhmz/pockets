import { useCallback, useMemo } from "react";

export interface PageSchema {
  index: number;
  current: boolean;
}

export const useNextPages = (currentPage: number, maxPages: number) => {
  const addPagesBeforeCurrentPage = useCallback(
    (nextPages: PageSchema[]) => {
      for (let i = Math.max(currentPage - 2, 0); i < currentPage; i++) {
        nextPages.push({ index: i, current: false });
      }
    },
    [currentPage]
  );

  const addPagesAfterCurrentPage = useCallback(
    (nextPages: PageSchema[]) => {
      // Füge die 2 Seiten nach der aktuellen Seite hinzu, wenn möglich
      for (
        let i = currentPage + 1;
        i <= Math.min(currentPage + 2, maxPages - 1);
        i++
      ) {
        nextPages.push({ index: i, current: false });
      }
    },
    [currentPage, maxPages]
  );

  const fillPagesToFive = useCallback(
    (nextPages: PageSchema[]) => {
      while (nextPages.length < 5 && nextPages.length < maxPages) {
        if (nextPages[0].index > 0) {
          nextPages.unshift({ index: nextPages[0].index - 1, current: false });
        } else if (nextPages[nextPages.length - 1].index < maxPages - 1) {
          nextPages.push({
            index: nextPages[nextPages.length - 1].index + 1,
            current: false,
          });
        } else {
          break;
        }
      }
    },
    [maxPages]
  );

  return useMemo(() => {
    const nextPages: PageSchema[] = [];

    addPagesBeforeCurrentPage(nextPages);

    nextPages.push({ index: currentPage, current: true });

    addPagesAfterCurrentPage(nextPages);
    fillPagesToFive(nextPages);

    return nextPages;
  }, [
    currentPage,
    addPagesBeforeCurrentPage,
    addPagesAfterCurrentPage,
    fillPagesToFive,
  ]);
};
