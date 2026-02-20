import React from "react";

import { Button, Spinner, Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { useCategoryContext } from "src/contexts/category";
import { useFetchPosts } from "src/hooks/usePosts";

import Posts from "./Posts";

const Blogs = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { selectedCategoryId } = useCategoryContext();
  const params = selectedCategoryId ? { category_id: selectedCategoryId } : {};
  const { data: { posts = [] } = {}, isLoading } = useFetchPosts(params);

  const handleAddNew = () => history.push(routes.blogs.new);

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <Typography component="h1" style="h1" weight="bold">
          {t("blogs.title")}
        </Typography>
        <Button
          className="cursor-pointer bg-black"
          label={t("blogs.addNew")}
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
