import { useCallback, useMemo, useState } from "react";

import { useTranslation } from "react-i18next";
import { fetchMyPosts } from "src/apis/posts";
import { MAX_PAGE_SIZE } from "src/components/constants";
import { useMyBlogPostsSelection } from "src/contexts/myBlogPostsSelection";

const useMyBlogPostsTableSelection = ({
  posts = [],
  totalCount = 0,
  queryParams = {},
} = {}) => {
  const { t } = useTranslation();
  const {
    selectedRowKeys,
    setSelectedRowKeys,
    clearSelection,
    setIsBulkSelectedAllRows,
  } = useMyBlogPostsSelection();

  const [isSelectingAll, setIsSelectingAll] = useState(false);

  const pageRowKeys = useMemo(() => posts.map(post => post.id), [posts]);

  const fetchAllPostIds = useCallback(async () => {
    const firstResponse = await fetchMyPosts({
      ...(queryParams ?? {}),
      page: 1,
      page_size: MAX_PAGE_SIZE,
    });
    const firstData = firstResponse?.data ?? {};
    const totalPages = firstData?.pagination?.total_pages ?? 1;
    const ids = (firstData?.posts ?? []).map(post => post.id);

    if (totalPages <= 1) return ids;

    const pageRequests = Array.from({ length: totalPages - 1 }, (_v, idx) =>
      fetchMyPosts({
        ...(queryParams ?? {}),
        page: idx + 2,
        page_size: MAX_PAGE_SIZE,
      })
    );
    const responses = await Promise.all(pageRequests);

    responses.forEach(response => {
      const data = response?.data ?? {};
      (data?.posts ?? []).forEach(post => ids.push(post.id));
    });

    return Array.from(new Set(ids));
  }, [queryParams]);

  const handleSetBulkSelectedAllRows = useCallback(
    async value => {
      const shouldSelectAll = Boolean(value);
      setIsBulkSelectedAllRows(shouldSelectAll);

      if (!shouldSelectAll) {
        clearSelection();

        return;
      }

      setIsSelectingAll(true);
      try {
        const allIds = await fetchAllPostIds();
        setSelectedRowKeys(allIds);
      } finally {
        setIsSelectingAll(false);
      }
    },
    [
      clearSelection,
      fetchAllPostIds,
      setIsBulkSelectedAllRows,
      setSelectedRowKeys,
    ]
  );

  const bulkSelectAllRowsProps = useMemo(
    () => ({
      selectAllRowButtonLabel: t("myBlogPosts.tableSelection.selectAll", {
        count: totalCount,
      }),
      selectAllRowMessage: t("myBlogPosts.tableSelection.allOnPageSelected", {
        count: pageRowKeys.length,
      }),
      setBulkSelectedAllRows: handleSetBulkSelectedAllRows,
    }),
    [handleSetBulkSelectedAllRows, pageRowKeys.length, t, totalCount]
  );

  const handleRowSelect = useCallback(
    keys => {
      const nextKeys = Array.isArray(keys) ? keys : Array.from(keys ?? []);
      setSelectedRowKeys(nextKeys);

      if (nextKeys.length !== totalCount) {
        setIsBulkSelectedAllRows(false);
      }
    },
    [setIsBulkSelectedAllRows, setSelectedRowKeys, totalCount]
  );

  return {
    bulkSelectAllRowsProps,
    isSelectingAll,
    onRowSelect: handleRowSelect,
    selectedRowKeys,
  };
};

export default useMyBlogPostsTableSelection;

