import React, { useEffect, useMemo, useState } from "react";

import {
  Button,
  Input,
  Select,
  Textarea,
  Typography,
  Dropdown,
} from "@bigbinary/neetoui";
import {
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
} from "components/Blog/constants";
import { is } from "ramda";
import { fetchCategories } from "src/apis/categories";

const buildCategoryValue = category => {
  if (!category) return null;
  const id = category.value ?? category.id;
  const name = category.label ?? category.name;
  if (!id || !name) return null;

  return { label: name, value: id };
};

const PostForm = ({
  heading,
  initialValues = {},
  onCancel,
  onSubmit,
  onDelete,
}) => {
  const [title, setTitle] = useState(initialValues.title ?? "");
  const [description, setDescription] = useState(
    initialValues.description ?? ""
  );

  const [selectedCategories, setSelectedCategories] = useState(() => {
    const safeCategories = initialValues.categories ?? [];
    const mapped = safeCategories.map(buildCategoryValue).filter(Boolean);

    return mapped;
  });

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTitle(initialValues.title ?? "");
    setDescription(initialValues.description ?? "");
    const safeCategories = initialValues.categories ?? [];
    setSelectedCategories(
      safeCategories.map(buildCategoryValue).filter(Boolean)
    );
  }, [initialValues]);

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
    submit("published");
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Typography component="h1" style="h2" weight="bold">
          {heading}
        </Typography>
        <div className="flex items-center gap-3">
          <Button label="Cancel" style="secondary" onClick={onCancel} />
          <Dropdown
            buttonProps={{ className: "cursor-pointer bg-black" }}
            buttonStyle="primary"
            disabled={!canSubmit}
            label={isSubmitting ? "Submitting..." : "Publish"}
          >
            <Dropdown.Menu>
              <Dropdown.MenuItem.Button onClick={() => submit("published")}>
                Publish
              </Dropdown.MenuItem.Button>
              <Dropdown.MenuItem.Button onClick={() => submit("draft")}>
                Save as draft
              </Dropdown.MenuItem.Button>
            </Dropdown.Menu>
          </Dropdown>
          {onDelete && (
            <Dropdown
              strategy="fixed"
              customTarget={
                <button
                  aria-label="More actions"
                  className="grid h-10 w-10 place-items-center rounded-md text-gray-700 hover:bg-gray-100"
                  type="button"
                >
                  <i className="ri-more-2-line text-lg" />
                </button>
              }
            >
              <Dropdown.Menu>
                <Dropdown.MenuItem.Button style="danger" onClick={onDelete}>
                  Delete
                </Dropdown.MenuItem.Button>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
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
      </form>
    </div>
  );
};

export default PostForm;
