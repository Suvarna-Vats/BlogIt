import React, { useMemo } from "react";

import { Tooltip, Typography } from "@bigbinary/neetoui";
import PostActions from "components/commons/actions";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import routes from "routes";
import { TITLE_TRUNCATE_LENGTH } from "src/components/MyBlogPosts/constants";
import { formatPostDateTime, truncate } from "src/components/utis";
import { useDestroyPost, useUpdatePost } from "src/hooks/usePosts";

const useMyBlogPostsTableData = ({ onReload, visibleColumnKeys = [] }) => {
  const { t } = useTranslation();
  const { mutate: updatePost } = useUpdatePost({
    onSuccess: () => onReload?.(),
  });

  const { mutate: destroyPost } = useDestroyPost({
    onSuccess: () => onReload?.(),
  });

  const columnData = useMemo(() => {
    const allColumns = [
      {
        title: t("myBlogPosts.table.title"),
        dataIndex: "title",
        key: "title",
        render: (_title, post) => {
          const title = post?.title ?? "";
          const displayTitle = truncate(title, TITLE_TRUNCATE_LENGTH);
          const isTruncated = displayTitle !== title;

          const titleNode = (
            <NavLink to={routes.blogs.edit(post.slug)}>
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
        title: t("myBlogPosts.table.category"),
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
        title: t("myBlogPosts.table.lastPublishedAt"),
        dataIndex: "last_published_at",
        key: "last_published_at",
        render: value => (
          <Typography className="text-gray-600" style="body3">
            {formatPostDateTime(value) || "-"}
          </Typography>
        ),
      },
      {
        title: t("myBlogPosts.table.status"),
        dataIndex: "status",
        key: "status",
        render: status => (
          <Typography className="text-gray-600" style="body3">
            {status === "published" ? t("common.published") : t("common.draft")}
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
            onChangeStatus={nextStatus => {
              updatePost({
                slug: post.slug,
                payload: { status: nextStatus },
              });
            }}
            onDelete={() => {
              destroyPost(post.slug);
            }}
          />
        ),
      },
    ];

    const safeVisibleKeys = new Set([...(visibleColumnKeys ?? []), "title"]);

    return allColumns.filter(
      column => column.key === "actions" || safeVisibleKeys.has(column.key)
    );
  }, [destroyPost, t, updatePost, visibleColumnKeys]);

  return {
    columnData,
  };
};

export default useMyBlogPostsTableData;
