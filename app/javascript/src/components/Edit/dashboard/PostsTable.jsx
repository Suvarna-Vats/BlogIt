import React, { useMemo } from "react";

import { Edit } from "@bigbinary/neeto-icons";
import { Button, Table, Typography } from "@bigbinary/neetoui";
import { formatPostDate } from "src/components/utis";

const PostsTable = ({ title, posts = [], onEdit }) => {
  const columnData = useMemo(
    () => [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        render: (_title, post) => (
          <div>
            <Typography
              className="text-gray-900"
              style="body2"
              weight="semibold"
            >
              {post.title}
            </Typography>
            <Typography className="mt-1 text-gray-600" style="body3">
              {(post.categories ?? [])
                .map(category => category?.name)
                .filter(Boolean)
                .join(", ")}
            </Typography>
          </div>
        ),
      },
      {
        title: "Last updated",
        dataIndex: "updated_at",
        key: "updated_at",
        render: updatedAt => (
          <Typography className="text-gray-600" style="body3">
            {formatPostDate(updatedAt)}
          </Typography>
        ),
      },
      {
        title: "Action",
        key: "action",
        align: "right",
        render: (_value, post) => (
          <Button
            icon={Edit}
            size="small"
            style="secondary"
            onClick={() => onEdit?.(post.slug)}
          />
        ),
      },
    ],
    [onEdit]
  );

  return (
    <section className="rounded-lg border border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-6 py-4">
        <Typography component="h2" style="h4" weight="semibold">
          {title}
        </Typography>
      </div>
      {!posts.length ? (
        <div className="px-6 py-10">
          <Typography className="text-gray-600" style="body2">
            No posts here yet.
          </Typography>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table
            columnData={columnData}
            rowData={posts}
            rowKey={post => post.id ?? post.slug}
          />
        </div>
      )}
    </section>
  );
};

export default PostsTable;
