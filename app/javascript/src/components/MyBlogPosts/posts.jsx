import React, { useEffect, useMemo, useState } from "react";

import { Spinner, Table, Tooltip, Typography } from "@bigbinary/neetoui";
import PostActions from "components/commons/actions";
import { NavLink } from "react-router-dom";
import { destroyPost, updatePost } from "src/apis/posts";
import { formatPostDateTime, truncate } from "src/components/utis";

import { PAGE_SIZE, TITLE_TRUNCATE_LENGTH } from "./constants";

const Posts = ({ isLoading, posts = [], onReload }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    setPageNumber(1);
    setSelectedRowKeys([]);
  }, [posts]);

  const pagePosts = useMemo(() => {
    const startIndex = (pageNumber - 1) * PAGE_SIZE;

    return posts.slice(startIndex, startIndex + PAGE_SIZE);
  }, [pageNumber, posts]);

  const columnData = useMemo(
    () => [
      {
        title: "TITLE",
        dataIndex: "title",
        key: "title",
        render: (_title, post) => {
          const title = post?.title ?? "";
          const displayTitle = truncate(title, TITLE_TRUNCATE_LENGTH);
          const isTruncated = displayTitle !== title;

          const titleNode = (
            <NavLink to={`/blogs/${post.slug}/edit`}>
              <Typography
                className="max-w-[22rem] truncate text-gray-900 hover:underline"
                style="body2"
                weight="semibold"
              >
                {displayTitle}
              </Typography>
            </NavLink>
          );

          return (
            <div className="flex items-center">
              {isTruncated ? (
                <Tooltip content={title}>{titleNode}</Tooltip>
              ) : (
                titleNode
              )}
            </div>
          );
        },
      },
      {
        title: "CATEGORY",
        dataIndex: "categories",
        key: "categories",
        render: categories => (
          <Typography className="text-gray-600" style="body3">
            {(categories ?? [])
              .map(category => category?.name)
              .filter(Boolean)
              .join(", ")}
          </Typography>
        ),
      },
      {
        title: "LAST PUBLISHED AT",
        dataIndex: "last_published_at",
        key: "last_published_at",
        render: value => (
          <Typography className="text-gray-600" style="body3">
            {formatPostDateTime(value) || "-"}
          </Typography>
        ),
      },
      {
        title: "STATUS",
        dataIndex: "status",
        key: "status",
        render: status => (
          <Typography className="text-gray-600" style="body3">
            {status === "published" ? "Published" : "Draft"}
          </Typography>
        ),
      },
      {
        title: "",
        key: "actions",
        align: "right",
        render: (_value, post) => (
          <PostActions
            status={post.status}
            onChangeStatus={async nextStatus => {
              await updatePost(post.slug, { status: nextStatus });
              await onReload?.();
            }}
            onDelete={async () => {
              await destroyPost(post.slug);
              await onReload?.();
            }}
          />
        ),
      },
    ],
    [onReload]
  );

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
          No posts here yet.
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
