import React, { useMemo } from "react";

import PostsTable from "./PostsTable";

const DashboardPostsTables = ({ posts = [], onEdit }) => {
  const drafts = useMemo(
    () => posts.filter(post => post.status === "draft"),
    [posts]
  );

  const published = useMemo(
    () => posts.filter(post => post.status === "published"),
    [posts]
  );

  return (
    <div className="space-y-8">
      <PostsTable posts={drafts} title="Drafts" onEdit={onEdit} />
      <PostsTable posts={published} title="Published" onEdit={onEdit} />
    </div>
  );
};

export default DashboardPostsTables;
