import React, { useEffect, useMemo, useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import Layout from "src/components/commons/Layout";
import { useFetchMyPosts } from "src/hooks/usePosts";
import useQueryParams from "src/hooks/useQueryParams";

import {
  DEFAULT_FILTERS,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_VISIBLE_COLUMNS,
  PAGE_SIZE,
} from "./constants";
import Header from "./Header";
import Posts from "./posts";
import { buildFilterSignature } from "./util";

const MyBlogPosts = () => {
  const { t } = useTranslation();
  const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE_NUMBER);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [visibleColumnKeys, setVisibleColumnKeys] = useState(
    DEFAULT_VISIBLE_COLUMNS
  );

  const filterSignature = useMemo(
    () => buildFilterSignature(filters),
    [filters]
  );

  useEffect(() => {
    setPageNumber(DEFAULT_PAGE_NUMBER);
  }, [filterSignature]);

  const queryParams = useQueryParams({
    filters,
    pageNumber,
    pageSize: PAGE_SIZE,
  });

  const {
    data: { posts = [], pagination = {} } = {},
    isLoading,
    refetch,
  } = useFetchMyPosts(queryParams);

  const totalCount = pagination.total_count ?? posts.length;

  return (
    <Layout>
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-10">
          <Typography component="h1" style="h1" weight="bold">
            {t("myBlogPosts.title")}
          </Typography>
          <div className="mt-2">
            <Header
              filters={filters}
              totalCount={totalCount}
              visibleColumnKeys={visibleColumnKeys}
              onChangeFilters={setFilters}
              onChangeVisibleColumnKeys={setVisibleColumnKeys}
            />
          </div>
        </div>
        <Posts
          isLoading={isLoading}
          pageNumber={pageNumber}
          posts={posts}
          totalCount={totalCount}
          visibleColumnKeys={visibleColumnKeys}
          onPageChange={setPageNumber}
          onReload={refetch}
        />
      </div>
    </Layout>
  );
};

export default MyBlogPosts;
