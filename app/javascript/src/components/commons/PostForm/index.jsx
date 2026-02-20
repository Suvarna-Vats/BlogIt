import React from "react";

import { LeftArrow, RightArrow } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import PostFormActions from "components/commons/actions";
import Blog from "components/commons/Blog";
import { useTranslation } from "react-i18next";
import usePostForm from "src/components/commons/PostForm/hooks/usePostForm";

import PostFormDropdown from "./Dropdown";
import PostFormEdit from "./Edit";

const PostForm = ({
  heading,
  initialValues,
  onCancel,
  onSubmit,
  onDelete,
  onChange,
}) => {
  const { t } = useTranslation();
  const {
    title,
    setTitle,
    description,
    setDescription,
    selectedCategories,
    handleCategoriesChange,
    isLoadingCategories,
    categoryOptions,
    isSubmitting,
    canSubmit,
    submitStatus,
    setSubmitStatus,
    submit,
    handleFormSubmit,
    isPreview,
    togglePreview,
    previewValues,
  } = usePostForm({ initialValues, onChange, onSubmit });

  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Typography component="h1" style="h2" weight="bold">
            {heading}
          </Typography>
          <div className="flex items-center gap-3">
            <Button
              className="rounded bg-white transition-colors hover:bg-gray-100"
              icon={isPreview ? LeftArrow : RightArrow}
              iconSize={20}
              size="small"
              style="text"
              type="button"
              aria-label={classNames({
                [t("postForm.preview.ariaBackToEdit")]: isPreview,
                [t("postForm.preview.ariaPreviewPost")]: !isPreview,
              })}
              tooltipProps={{
                content: isPreview
                  ? t("postForm.preview.tooltipBackToEdit")
                  : t("postForm.preview.tooltipPreview"),
                position: "bottom",
              }}
              onClick={togglePreview}
            />
            <Button
              label={t("common.cancel")}
              style="secondary"
              onClick={onCancel}
            />
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
