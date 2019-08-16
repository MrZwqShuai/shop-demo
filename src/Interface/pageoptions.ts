interface PageOptions {
  pageNumber?: number;
  pageSize?: number;
  currentPage?: number;
  total?: number;
  pages?: number;
}

interface PageResult<T> {
  list: T;
  total: number;
  pages: number;
}
export { PageOptions, PageResult };
