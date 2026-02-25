import React, { useEffect, useMemo, useState } from "react";

import { Button, Spinner, Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { DEFAULT_PAGE_NUMBER, PAGE_SIZE } from "src/components/constants";
import { useCategoryContext } from "src/contexts/category";
import { useFetchPosts } from "src/hooks/usePosts";

import Posts from "./Posts";

const Blogs = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { selectedCategoryId } = useCategoryContext();
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);

  useEffect(() => {
    setPageNumber(DEFAULT_PAGE_NUMBER);
  }, [selectedCategoryId]);

  const params = useMemo(
    () => ({
      page: pageNumber,
      page_size: PAGE_SIZE,
      ...(selectedCategoryId ? { category_id: selectedCategoryId } : {}),
    }),
    [pageNumber, selectedCategoryId]
  );

  const { data: { posts = [], pagination = {} } = {}, isLoading } =
    useFetchPosts(params);

  const totalCount = pagination.total_count ?? posts.length;

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
        <Posts
          pageNumber={pageNumber}
          pageSize={PAGE_SIZE}
          posts={posts}
          totalCount={totalCount}
          onAddNew={handleAddNew}
          onPageChange={setPageNumber}
        />
      )}
    </>
  );
};

export default Blogs;
