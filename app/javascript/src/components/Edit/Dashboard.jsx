import React from "react";

import { Spinner, Typography } from "@bigbinary/neetoui";
import DashboardPostsTables from "components/Edit/dashboard/index";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { useFetchMyPosts } from "src/hooks/usePosts";

const Dashboard = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { data: { posts = [] } = {}, isLoading } = useFetchMyPosts();

  const handleEdit = slug => history.push(routes.blogs.edit(slug));

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <Typography component="h1" style="h1" weight="bold">
          {t("edit.title")}
        </Typography>
      </div>
      {isLoading ? (
        <div className="grid place-items-center py-24">
          <Spinner />
        </div>
      ) : (
        <DashboardPostsTables posts={posts} onEdit={handleEdit} />
      )}
    </>
  );
};

export default Dashboard;
