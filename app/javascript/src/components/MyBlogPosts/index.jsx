import React, { useCallback, useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import { fetchMyPosts } from "src/apis/posts";
import Layout from "src/commons/Layout";

import Posts from "./posts";

const MyBlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchMyPosts();
      setPosts(response?.data?.posts || []);
    } catch {
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

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
        <Posts isLoading={isLoading} posts={posts} onReload={loadPosts} />
      </div>
    </Layout>
  );
};

export default MyBlogPosts;
