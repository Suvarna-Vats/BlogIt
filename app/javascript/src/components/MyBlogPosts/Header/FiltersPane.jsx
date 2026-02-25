import React, { useEffect, useMemo, useState } from "react";

import { Button, Input, Pane, Select, Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { useFetchCategories } from "src/hooks/useCategories";

import { normalizeSelectValueToArray } from "../util";

const EMPTY_FILTERS = {
  title: "",
  categories: [],
  status: null,
};

const FiltersPane = ({ isOpen, onClose, filters, onApply }) => {
  const { t } = useTranslation();
  const [draft, setDraft] = useState(filters ?? EMPTY_FILTERS);

  useEffect(() => {
    if (!isOpen) return;
    setDraft(filters ?? EMPTY_FILTERS);
  }, [filters, isOpen]);

  const { data: categoriesResponse, isLoading: isLoadingCategories } =
    useFetchCategories();

  const categoryOptions = useMemo(
    () =>
      (categoriesResponse?.categories ?? []).map(category => ({
        label: category.name,
        value: category.id,
      })),
    [categoriesResponse]
  );

  const statusOptions = useMemo(
    () => [
      { label: t("common.draft"), value: "draft" },
      { label: t("common.published"), value: "published" },
    ],
    [t]
  );

  return (
    <Pane isOpen={isOpen} size="small" onClose={onClose}>
      <Pane.Header>
        <Typography component="h2" style="h3" weight="semibold">
          Filters
        </Typography>
      </Pane.Header>
      <Pane.Body>
        <div className="space-y-6">
          <Input
            label="Title"
            placeholder="Search title"
            value={draft.title}
            onChange={event =>
              setDraft(prev => ({ ...prev, title: event.target.value }))
            }
          />
          <Select
            isMulti
            isSearchable
            label="Category"
            options={categoryOptions}
            placeholder={isLoadingCategories ? "Loading..." : "Select category"}
            value={draft.categories}
            onChange={value =>
              setDraft(prev => ({
                ...prev,
                categories: normalizeSelectValueToArray(value),
              }))
            }
          />
          <Select
            isSearchable={false}
            label="Status"
            options={statusOptions}
            placeholder="Select status"
            value={draft.status}
            onChange={value => setDraft(prev => ({ ...prev, status: value }))}
          />
        </div>
      </Pane.Body>
      <Pane.Footer>
        <div className="flex items-center gap-3">
          <Button
            className="bg-black hover:bg-black/90"
            label="Done"
            style="primary"
            onClick={() => {
              onApply?.(draft ?? EMPTY_FILTERS);
              onClose?.();
            }}
          />
          <Button
            label="Clear filters"
            style="secondary"
            onClick={() => {
              onApply?.(EMPTY_FILTERS);
              onClose?.();
            }}
          />
        </div>
      </Pane.Footer>
    </Pane>
  );
};

export { EMPTY_FILTERS };
export default FiltersPane;
