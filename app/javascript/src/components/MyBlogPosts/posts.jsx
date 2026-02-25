import React from "react";

import { Pagination, Spinner, Table, Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import useMyBlogPostsTableData from "src/hooks/useMyBlogPostsTableData";

import { PAGE_SIZE } from "./constants";

const Posts = ({
  isLoading,
  posts = [],
  totalCount = 0,
  pageNumber,
  onPageChange,
  onReload,
  visibleColumnKeys,
}) => {
  const { t } = useTranslation();
  const { selectedRowKeys, setSelectedRowKeys, columnData } =
    useMyBlogPostsTableData({ posts, onReload, visibleColumnKeys });

  if (isLoading) {
    return (
      <div className="grid place-items-center py-24">
        <Spinner />
      </div>
    );
  }

  if (!posts.length) {
    return (
      <section className="rounded-lg border border-gray-200 bg-white px-6 py-10">
        <Typography className="text-gray-600" style="body2">
          {t("myBlogPosts.empty")}
        </Typography>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <Table
          columnData={columnData}
          rowData={posts}
          rowKey={post => post.id ?? post.slug}
          rowSelection={{
            selectedRowKeys,
            onChange: keys => setSelectedRowKeys(keys),
          }}
        />
      </div>
      {totalCount > PAGE_SIZE && (
        <div className="flex justify-end border-t border-gray-200 px-6 py-4">
          <Pagination
            count={totalCount}
            navigate={onPageChange}
            pageNo={pageNumber}
            pageSize={PAGE_SIZE}
          />
        </div>
      )}
    </section>
  );
};

export default Posts;
