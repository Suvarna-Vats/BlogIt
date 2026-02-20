import React from "react";

import { Button, Spinner, Typography } from "@bigbinary/neetoui";
import { useHistory } from "react-router-dom";
import { useCategoryContext } from "src/contexts/category";
import { useFetchPosts } from "src/hooks/usePosts";

import Posts from "./Posts";

const Blogs = () => {
  const history = useHistory();
  const { selectedCategoryId } = useCategoryContext();
  const params = selectedCategoryId ? { category_id: selectedCategoryId } : {};
  const { data, isLoading } = useFetchPosts(params);
  const posts = data?.data?.posts ?? [];

  const handleAddNew = () => history.push("/blogs/new");

  return (
    <>
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
    </>
  );
};

export default Blogs;
