import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import Layout from "src/components/commons/Layout";
import { useFetchMyPosts } from "src/hooks/usePosts";

import Posts from "./posts";

const MyBlogPosts = () => {
  const { t } = useTranslation();
  const { data: { posts = [] } = {}, isLoading, refetch } = useFetchMyPosts();

  return (
    <Layout>
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-10">
          <Typography component="h1" style="h1" weight="bold">
            {t("myBlogPosts.title")}
          </Typography>
          <Typography className="mt-2 text-gray-600" style="body2">
            {t("myBlogPosts.articlesCount", { count: posts.length })}
          </Typography>
        </div>
        <Posts isLoading={isLoading} posts={posts} onReload={refetch} />
      </div>
    </Layout>
  );
};

export default MyBlogPosts;
