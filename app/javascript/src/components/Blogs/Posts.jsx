import React from "react";

import { Button, Typography } from "@bigbinary/neetoui";
import withT from "src/commons/withT";

import Card from "./Card";

const Posts = ({ posts = [], onAddNew, t }) => {
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
    <div className="divide-y divide-gray-200">
      {posts.map(post => (
        <Card key={post.id} {...{ post }} />
      ))}
    </div>
  );
};

export default withT(Posts);
