export interface PagedModel<T> {
  content: Array<T>;
  page: Page;
}
export interface Page {
  size?: number;
  number?: number;
  totalElements?: number;
  totalPages?: number;
}

interface Sort {
  [key: string]: "asc" | "desc";
}

export interface Pageable {
  page?: number;
  size?: number;
  sort?: Sort[];
}

export function mapPageableToSearchParams(pageable: Pageable): URLSearchParams {
  const searchParams = new URLSearchParams(Object.entries(pageable));
  pageable.sort?.forEach((sort) => {
    const [field, direction] = Object.entries(sort)[0];
    searchParams.append("sort", `${field},${direction}`);
  });
  return searchParams;
}
