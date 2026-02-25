import React, { useEffect, useMemo, useState } from "react";

import { Down } from "@bigbinary/neeto-icons";
import { Button, Dropdown, Modal, Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { useMyBlogPostsSelection } from "src/contexts/myBlogPostsSelection";
import { useBulkDestroyPosts, useBulkUpdatePosts } from "src/hooks/usePosts";

import ColumnsSelector from "./ColumnsSelector";
import FiltersPane, { EMPTY_FILTERS } from "./FiltersPane";
import FilterTags from "./FilterTags";

const Header = ({
  totalCount = 0,
  filters = EMPTY_FILTERS,
  onChangeFilters,
  visibleColumnKeys = [],
  onChangeVisibleColumnKeys,
  onReload,
}) => {
  const { t } = useTranslation();
  const { selectedRowKeys, clearSelection } = useMyBlogPostsSelection();
  const [isFiltersPaneOpen, setIsFiltersPaneOpen] = useState(false);
  const [nextStatus, setNextStatus] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const hasSelection = (selectedRowKeys ?? []).length > 0;
  const titleQuery = filters?.title?.toString().trim() ?? "";

  useEffect(() => {
    if (hasSelection) setIsFiltersPaneOpen(false);
  }, [hasSelection]);

  const ids = useMemo(
    () =>
      (selectedRowKeys ?? [])
        .map(value => Number(value))
        .filter(value => Number.isFinite(value)),
    [selectedRowKeys]
  );

  const selectedCount = ids.length;

  const { mutate: bulkUpdate, isLoading: isBulkUpdating } = useBulkUpdatePosts({
    onSuccess: () => {
      onReload?.();
      clearSelection();
      setNextStatus(null);
    },
  });

  const { mutate: bulkDestroy, isLoading: isBulkDestroying } =
    useBulkDestroyPosts({
      onSuccess: () => {
        onReload?.();
        clearSelection();
        setIsDeleteModalOpen(false);
      },
    });

  const statusLabel =
    nextStatus === "published" ? t("common.published") : t("common.draft");

  const countText = useMemo(() => {
    if (titleQuery) {
      return t("myBlogPosts.resultsForTitle", {
        count: totalCount,
        title: titleQuery,
      });
    }

    return t("myBlogPosts.articlesCount", { count: totalCount });
  }, [t, titleQuery, totalCount]);

  const handleRemoveCategory = category => {
    const nextCategories = (filters.categories ?? []).filter(
      current => current.value !== category.value
    );
    onChangeFilters?.({ ...filters, categories: nextCategories });
  };

  const handleRemoveStatus = () =>
    onChangeFilters?.({ ...filters, status: null });

  return (
    <>
      {hasSelection ? (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <Typography className="text-gray-600" style="body2">
              {t("myBlogPosts.bulk.selectedCount", {
                selected: selectedCount,
                totalCount,
              })}
            </Typography>
            <div className="flex items-center gap-2">
              <Dropdown
                strategy="fixed"
                customTarget={
                  <button
                    className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    type="button"
                  >
                    <span>{t("myBlogPosts.bulk.changeStatus.label")}</span>
                    <Down size={16} />
                  </button>
                }
              >
                <Dropdown.Menu>
                  <Dropdown.MenuItem.Button onClick={() => setNextStatus("draft")}>
                    {t("common.draft")}
                  </Dropdown.MenuItem.Button>
                  <Dropdown.MenuItem.Button
                    onClick={() => setNextStatus("published")}
                  >
                    {t("common.published")}
                  </Dropdown.MenuItem.Button>
                </Dropdown.Menu>
              </Dropdown>
              <Button
                label={t("myBlogPosts.bulk.delete.label")}
                style="danger"
                onClick={() => setIsDeleteModalOpen(true)}
              />
            </div>
          </div>
          <Modal
            isOpen={Boolean(nextStatus)}
            size="small"
            onClose={() => setNextStatus(null)}
          >
            <Modal.Header title={t("myBlogPosts.bulk.changeStatus.modal.title")} />
            <Modal.Body>
              <Typography className="text-gray-700" style="body2">
                {t("myBlogPosts.bulk.changeStatus.modal.body", {
                  selected: selectedCount,
                  status: statusLabel,
                })}
              </Typography>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="bg-black hover:bg-black/90"
                disabled={!selectedCount}
                label={t("myBlogPosts.bulk.changeStatus.modal.confirm")}
                loading={isBulkUpdating}
                style="primary"
                onClick={() => {
                  if (!nextStatus) return;
                  bulkUpdate({ ids, status: nextStatus });
                }}
              />
              <Button
                label={t("common.cancel")}
                style="secondary"
                onClick={() => setNextStatus(null)}
              />
            </Modal.Footer>
          </Modal>
          <Modal
            isOpen={isDeleteModalOpen}
            size="small"
            onClose={() => setIsDeleteModalOpen(false)}
          >
            <Modal.Header title={t("myBlogPosts.bulk.delete.modal.title")} />
            <Modal.Body>
              <Typography className="text-gray-700" style="body2">
                {t("myBlogPosts.bulk.delete.modal.body", {
                  selected: selectedCount,
                })}
              </Typography>
            </Modal.Body>
            <Modal.Footer>
              <Button
                disabled={!selectedCount}
                label={t("myBlogPosts.bulk.delete.modal.confirm")}
                loading={isBulkDestroying}
                style="danger"
                onClick={() => bulkDestroy(ids)}
              />
              <Button
                label={t("common.cancel")}
                style="secondary"
                onClick={() => setIsDeleteModalOpen(false)}
              />
            </Modal.Footer>
          </Modal>
        </>
      ) : (
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
      )}
    </>
  );
};
export default Header;
