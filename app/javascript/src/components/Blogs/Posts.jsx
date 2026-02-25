import React from "react";

import { Button, Pagination, Typography } from "@bigbinary/neetoui";
import withT from "src/commons/withT";

import Card from "./Card";

const Posts = ({
  onAddNew,
  onPageChange,
  pageNumber,
  pageSize,
  posts = [],
  t,
  totalCount = 0,
}) => {
  if (!posts.length) {
    return (
      <div className="py-24">
        <Typography component="h2" style="h4" weight="semibold">
          {t("blogs.emptyTitle")}
        </Typography>
        <Typography className="mt-2 text-gray-600" style="body2">
          {t("blogs.emptySubtitle")}
        </Typography>
        <div className="mt-6">
          <Button label={t("blogs.addNew")} size="small" onClick={onAddNew} />
        </div>
      </div>
    );
  }

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="divide-y divide-gray-200">
        {posts.map(post => (
          <Card key={post.id} {...{ post }} />
        ))}
      </div>
      {totalCount > pageSize && (
        <div className="flex justify-end border-t border-gray-200 px-6 py-4">
          <Pagination
            count={totalCount}
            navigate={onPageChange}
            pageNo={pageNumber}
            pageSize={pageSize}
          />
        </div>
      )}
    </section>
  );
};

export default withT(Posts);
