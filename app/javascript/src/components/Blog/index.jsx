import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import { fetchPosts } from "src/apis/posts";
import Sidebar from "src/commons/Sidebar";

import Card from "./Card";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetchPosts();
        setPosts(response?.data?.posts || []);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    loadPosts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        <Sidebar
          items={[
            { label: "Blog posts", to: "/blogs", icon: "ri-file-list-2-line" },
          ]}
        />
        <main className="flex-1 px-10 py-12">
          <div className="mx-auto w-full max-w-5xl">
            <Typography
              className="mb-10"
              component="h1"
              style="h1"
              weight="bold"
            >
              Blog posts
            </Typography>
            <div className="divide-y divide-gray-200">
              {posts.map(post => (
                <Card key={post.id} {...{ post }} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Blog;
