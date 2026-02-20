import React from "react";

import { LeftArrow, RightArrow } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui";
import PostFormActions from "components/commons/actions";
import Blog from "components/commons/Blog";
import usePostForm from "components/commons/hooks/usePostForm";

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
              onClick={togglePreview}
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
