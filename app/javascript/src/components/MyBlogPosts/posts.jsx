import React from "react";

import { Spinner, Table, Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import useMyBlogPostsTableData from "src/hooks/useMyBlogPostsTableData";

import { PAGE_SIZE } from "./constants";

const Posts = ({ isLoading, posts = [], onReload }) => {
  const { t } = useTranslation();
  const {
    pageNumber,
    setPageNumber,
    selectedRowKeys,
    setSelectedRowKeys,
    pagePosts,
    columnData,
  } = useMyBlogPostsTableData({ posts, onReload });

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
          currentPageNumber={pageNumber}
          defaultPageSize={PAGE_SIZE}
          handlePageChange={setPageNumber}
          rowData={pagePosts}
          rowKey={post => post.id ?? post.slug}
          totalCount={posts.length}
          paginationProps={{
            position: ["bottomRight"],
            showSizeChanger: false,
          }}
          rowSelection={{
            selectedRowKeys,
            onChange: keys => setSelectedRowKeys(keys),
          }}
        />
      </div>
    </section>
  );
};

export default Posts;
