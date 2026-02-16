import React, { useEffect, useState } from "react";

import { Button, Spinner, Typography } from "@bigbinary/neetoui";
import { useHistory } from "react-router-dom";
import { fetchPosts } from "src/apis/posts";
import { useCategoryContext } from "src/contexts/category";

import Layout from "./Layout";
import Posts from "./Posts";

const Blog = () => {
  const history = useHistory();
  const { selectedCategoryId } = useCategoryContext();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetchPosts(
          selectedCategoryId ? { category_id: selectedCategoryId } : {}
        );
        setPosts(response?.data?.posts || []);
      } catch {
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [selectedCategoryId]);

  const handleAddNew = () => history.push("/blogs/new");

  return (
    <Layout>
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Typography component="h1" style="h1" weight="bold">
            Blog posts
          </Typography>
          <Button
            className="cursor-pointer bg-black"
            label="Add new blog post"
            size="small"
            onClick={handleAddNew}
          />
        </div>
        {isLoading ? (
          <div className="grid place-items-center py-24">
            <Spinner />
          </div>
        ) : (
          <Posts posts={posts} onAddNew={handleAddNew} />
        )}
      </div>
    </Layout>
  );
};

export default Blog;
