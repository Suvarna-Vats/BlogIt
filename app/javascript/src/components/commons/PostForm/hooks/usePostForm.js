import { useCallback, useEffect, useMemo, useState } from "react";

import { filter, is, isEmpty, map, not, pathOr, pipe, trim } from "ramda";
import {
  buildCategoryValue,
  defaultSubmitStatusFor,
} from "src/components/utis";
import { useFetchCategories } from "src/hooks/useCategories";

const usePostForm = ({ initialValues, onChange, onSubmit }) => {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? ""
  );

  const [selectedCategories, setSelectedCategories] = useState(() =>
    pipe(
      pathOr([], ["categories"]),
      map(buildCategoryValue),
      filter(Boolean)
    )(initialValues ?? {})
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState(() =>
    defaultSubmitStatusFor(initialValues?.status ?? "draft")
  );

  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    if (!is(Function, onChange)) return;

    onChange({
      title,
      description,
      categories: selectedCategories,
    });
  }, [description, onChange, selectedCategories, title]);

  const handleCategoriesChange = useCallback(value => {
    if (!value) {
      setSelectedCategories([]);

      return;
    }

    setSelectedCategories(is(Array, value) ? value : [value]);
  }, []);

  const { data: categoriesResponse, isLoading: isLoadingCategories } =
    useFetchCategories();

  const categoryOptions = useMemo(
    () =>
      pipe(
        pathOr([], ["categories"]),
        map(category => ({ label: category.name, value: category.id }))
      )(categoriesResponse),
    [categoriesResponse]
  );

  const canSubmit = useMemo(() => {
    const hasTitle = pipe(trim, isEmpty, not)(title);
    const hasDescription = pipe(trim, isEmpty, not)(description);
    const hasCategories = pipe(isEmpty, not)(selectedCategories);

    return hasTitle && hasDescription && hasCategories && !isSubmitting;
  }, [description, isSubmitting, selectedCategories, title]);

  const submit = useCallback(
    async status => {
      if (!canSubmit) return;

      setIsSubmitting(true);
      try {
        await onSubmit?.({
          title: pipe(trim)(title),
          description: pipe(trim)(description),
          category_ids: map(({ value }) => value, selectedCategories),
          status,
        });
      } finally {
        setIsSubmitting(false);
      }
    },
    [canSubmit, description, onSubmit, selectedCategories, title]
  );

  const handleFormSubmit = useCallback(
    event => {
      event.preventDefault();
      submit(submitStatus);
    },
    [submit, submitStatus]
  );

  const previewValues = useMemo(
    () => ({
      title,
      description,
      categories: selectedCategories,
      status: submitStatus,
    }),
    [description, selectedCategories, submitStatus, title]
  );

  const togglePreview = useCallback(() => setIsPreview(prev => !prev), []);

  return {
    title,
    setTitle,
    description,
    setDescription,
    selectedCategories,
    setSelectedCategories,
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
  };
};

export default usePostForm;
