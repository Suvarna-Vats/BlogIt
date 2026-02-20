import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";

import PostsTable from "./PostsTable";

const DashboardPostsTables = ({ posts = [], onEdit }) => {
  const { t } = useTranslation();
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
      <PostsTable posts={drafts} title={t("edit.drafts")} onEdit={onEdit} />
      <PostsTable
        posts={published}
        title={t("edit.published")}
        onEdit={onEdit}
      />
    </div>
  );
};

export default DashboardPostsTables;
