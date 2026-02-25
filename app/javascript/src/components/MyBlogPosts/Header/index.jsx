import React, { useMemo, useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

import ColumnsSelector from "./ColumnsSelector";
import FiltersPane, { EMPTY_FILTERS } from "./FiltersPane";
import FilterTags from "./FilterTags";

const Header = ({
  totalCount = 0,
  filters = EMPTY_FILTERS,
  onChangeFilters,
  visibleColumnKeys = [],
  onChangeVisibleColumnKeys,
}) => {
  const { t } = useTranslation();
  const [isFiltersPaneOpen, setIsFiltersPaneOpen] = useState(false);

  const titleQuery = filters?.title?.toString().trim() ?? "";

  const handleRemoveCategory = category => {
    const nextCategories = (filters.categories ?? []).filter(
      current => current.value !== category.value
    );
    onChangeFilters?.({ ...filters, categories: nextCategories });
  };

  const handleRemoveStatus = () =>
    onChangeFilters?.({ ...filters, status: null });

  const countText = useMemo(() => {
    if (titleQuery) {
      return t("myBlogPosts.resultsForTitle", {
        count: totalCount,
        title: titleQuery,
      });
    }

    return t("myBlogPosts.articlesCount", { count: totalCount });
  }, [t, titleQuery, totalCount]);

  return (
    <>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Typography className="text-gray-600" style="body2">
            {countText}
          </Typography>
          <FilterTags
            categories={filters.categories}
            status={filters.status}
            onRemoveCategory={handleRemoveCategory}
            onRemoveStatus={handleRemoveStatus}
          />
        </div>
        <div className="flex items-center gap-2">
          <ColumnsSelector
            visibleColumnKeys={visibleColumnKeys}
            onChange={keys => onChangeVisibleColumnKeys?.(keys)}
          />
          <button
            aria-label="Open filters"
            className="grid h-9 w-9 place-items-center rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            type="button"
            onClick={() => setIsFiltersPaneOpen(true)}
          >
            <i className="ri-filter-3-line text-base" />
          </button>
        </div>
      </div>
      <FiltersPane
        filters={filters}
        isOpen={isFiltersPaneOpen}
        onApply={nextFilters => onChangeFilters?.(nextFilters)}
        onClose={() => setIsFiltersPaneOpen(false)}
      />
    </>
  );
};
export default Header;
