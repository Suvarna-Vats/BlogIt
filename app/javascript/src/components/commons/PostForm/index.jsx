import React, { useEffect, useMemo, useState } from "react";

import { LeftArrow, RightArrow } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui";
import PostFormActions from "components/commons/actions";
import Blog from "components/commons/Blog";
import { is } from "ramda";
import { fetchCategories } from "src/apis/categories";
import {
  buildCategoryValue,
  defaultSubmitStatusFor,
} from "src/components/utis";

import PostFormDropdown from "./dropdown";
import PostFormEdit from "./Edit";

const PostForm = ({
  heading,
  initialValues,
  onCancel,
  onSubmit,
  onDelete,
  onChange,
}) => {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? ""
  );

  const [selectedCategories, setSelectedCategories] = useState(() => {
    const safeCategories = initialValues?.categories ?? [];
    const mapped = safeCategories.map(buildCategoryValue).filter(Boolean);

    return mapped;
  });

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState(() =>
    defaultSubmitStatusFor(initialValues?.status ?? "draft")
  );

  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    if (typeof onChange !== "function") return;

    onChange({
      title,
      description,
      categories: selectedCategories,
    });
  }, [description, onChange, selectedCategories, title]);

  const handleCategoriesChange = value => {
    if (!value) {
      setSelectedCategories([]);

      return;
    }

    setSelectedCategories(is(Array, value) ? value : [value]);
  };

  useEffect(() => {
    const loadCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await fetchCategories();
        const categories = response?.data?.categories ?? [];
        setCategoryOptions(
          categories.map(category => ({
            label: category.name,
            value: category.id,
          }))
        );
      } catch {
        setCategoryOptions([]);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  const canSubmit = useMemo(
    () =>
      title.trim().length > 0 &&
      description.trim().length > 0 &&
      selectedCategories.length > 0 &&
      !isSubmitting,
    [description, isSubmitting, selectedCategories.length, title]
  );

  const submit = async status => {
    if (!canSubmit) return;

    setIsSubmitting(true);
    try {
      await onSubmit?.({
        title: title.trim(),
        description: description.trim(),
        category_ids: selectedCategories.map(({ value }) => value),
        status,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    submit(submitStatus);
  };

  const previewValues = {
    title,
    description,
    categories: selectedCategories,
    status: submitStatus,
  };

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Typography component="h1" style="h2" weight="bold">
            {heading}
          </Typography>
          <div className="flex items-center gap-3">
            <Button
              aria-label={isPreview ? "Back to edit" : "Preview post"}
              className="rounded bg-white transition-colors hover:bg-gray-100"
              icon={isPreview ? LeftArrow : RightArrow}
              iconSize={20}
              size="small"
              style="text"
              type="button"
              tooltipProps={{
                content: isPreview ? "Back to edit" : "Preview",
                position: "bottom",
              }}
              onClick={() => setIsPreview(prev => !prev)}
            />
            <Button label="Cancel" style="secondary" onClick={onCancel} />
            <PostFormDropdown
              isMenuDisabled={isSubmitting}
              isSubmitDisabled={!canSubmit}
              isSubmitting={isSubmitting}
              value={submitStatus}
              onChange={setSubmitStatus}
              onSubmit={submit}
            />
            <PostFormActions onDelete={onDelete} />
          </div>
        </div>
        {!isPreview && (
          <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
            <PostFormEdit
              categoryOptions={categoryOptions}
              description={description}
              handleCategoriesChange={handleCategoriesChange}
              isLoadingCategories={isLoadingCategories}
              selectedCategories={selectedCategories}
              setDescription={setDescription}
              setTitle={setTitle}
              title={title}
            />
          </form>
        )}
      </div>
      {isPreview && (
        <div className="mt-6">
          <Blog {...previewValues} isPreview />
        </div>
      )}
    </>
  );
};

export default PostForm;
