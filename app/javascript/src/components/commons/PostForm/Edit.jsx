import React from "react";

import { Input, Select, Textarea, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import withT from "src/commons/withT";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
} from "src/components/constants";

const PostFormEdit = ({
  title,
  setTitle,
  description,
  setDescription,
  categoryOptions,
  selectedCategories,
  handleCategoriesChange,
  isLoadingCategories,
  t,
}) => (
  <>
    <Input
      required
      label={t("postForm.fields.title")}
      maxLength={MAX_TITLE_LENGTH}
      placeholder={t("postForm.placeholders.title")}
      value={title}
      onChange={event => setTitle(event.target.value)}
    />
    <Select
      isMulti
      isSearchable
      required
      label={t("postForm.fields.categories")}
      options={categoryOptions}
      value={selectedCategories}
      placeholder={classNames({
        [t("postForm.placeholders.categoriesLoading")]: isLoadingCategories,
        [t("postForm.placeholders.categoriesSearch")]: !isLoadingCategories,
      })}
      onChange={handleCategoriesChange}
    />
    <div>
      <Textarea
        required
        label={t("postForm.fields.description")}
        maxLength={MAX_DESCRIPTION_LENGTH}
        placeholder={t("postForm.placeholders.description")}
        rows={10}
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
      <div className="mt-1 flex justify-end">
        <Typography className="text-gray-500" style="nano">
          {description.length}/{MAX_DESCRIPTION_LENGTH}
        </Typography>
      </div>
    </div>
  </>
);

export default withT(PostFormEdit);
