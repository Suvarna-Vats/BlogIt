import React from "react";

import { Input, Select, Textarea, Typography } from "@bigbinary/neetoui";
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
}) => (
  <>
    <Input
      required
      label="Title"
      maxLength={MAX_TITLE_LENGTH}
      placeholder="Enter title"
      value={title}
      onChange={event => setTitle(event.target.value)}
    />
    <Select
      isMulti
      isSearchable
      required
      label="Categories"
      options={categoryOptions}
      value={selectedCategories}
      placeholder={
        isLoadingCategories ? "Loading categories..." : "Search category"
      }
      onChange={handleCategoriesChange}
    />
    <div>
      <Textarea
        required
        label="Description"
        maxLength={MAX_DESCRIPTION_LENGTH}
        placeholder="Enter description"
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

export default PostFormEdit;
