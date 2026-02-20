import React from "react";

import { Typography } from "@bigbinary/neetoui";
import Layout from "src/components/commons/Layout";
import { useFetchMyPosts } from "src/hooks/usePosts";

import Posts from "./posts";

const MyBlogPosts = () => {
  const { data: { posts = [] } = {}, isLoading, refetch } = useFetchMyPosts();

  return (
    <Layout>
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-10">
          <Typography component="h1" style="h1" weight="bold">
            My blog posts
          </Typography>
          <Typography className="mt-2 text-gray-600" style="body2">
            {posts.length} articles
          </Typography>
        </div>
        <Posts isLoading={isLoading} posts={posts} onReload={refetch} />
      </div>
    </Layout>
  );
};

export default MyBlogPosts;
