import React, { useEffect, useMemo, useState } from "react";

import { Left } from "@bigbinary/neeto-icons";
import {
  Button,
  Input,
  Select,
  Textarea,
  Typography,
} from "@bigbinary/neetoui";
import { is } from "ramda";
import { useHistory } from "react-router-dom";
import { fetchCategories } from "src/apis/categories";
import { createPost } from "src/apis/posts";

import { MAX_TITLE_LENGTH, MAX_DESCRIPTION_LENGTH } from "./constants";
import Layout from "./Layout";

const New = () => {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async event => {
    event.preventDefault();

    if (!canSubmit) return;

    setIsSubmitting(true);
    try {
      await createPost({
        title: title.trim(),
        description: description.trim(),
        user_id: 2,
        category_ids: selectedCategories.map(({ value }) => value),
      });

      history.push("/blogs");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-10">
          <Button
            icon={Left}
            label="Back"
            style="text"
            onClick={() => history.push("/blogs")}
          />
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-8">
          <Typography component="h1" style="h2" weight="bold">
            New blog post
          </Typography>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                isLoadingCategories
                  ? "Loading categories..."
                  : "Search category"
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
            <div className="flex justify-end gap-3 pt-4">
              <Button
                label="Cancel"
                style="secondary"
                onClick={() => history.push("/blogs")}
              />
              <Button
                className="cursor-pointer bg-black"
                disabled={!canSubmit}
                label={isSubmitting ? "Submitting..." : "Submit"}
                loading={isSubmitting}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default New;
