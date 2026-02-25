import { useMemo } from "react";

const useQueryParams = ({ filters, pageNumber, pageSize }) =>
  useMemo(() => {
    const title = (filters?.title ?? "").toString().trim();
    const categoryIds = (filters?.categories ?? [])
      .map(category => category.value)
      .filter(Boolean);
    const status = filters?.status?.value;

    return {
      page: pageNumber,
      page_size: pageSize,
      ...(title ? { title } : {}),
      ...(status ? { status } : {}),
      ...(categoryIds.length ? { category_ids: categoryIds } : {}),
    };
  }, [filters, pageNumber, pageSize]);

export default useQueryParams;
