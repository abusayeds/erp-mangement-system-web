export type PaginationMeta = {
  currentPage: number;
  limit: number;
  totalData: number;
  totalPages?: number;
};

export type PaginatedResponse<T> = {
  data: T;
  pagination?: PaginationMeta;
};
