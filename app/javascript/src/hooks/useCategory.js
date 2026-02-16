import { useCallback, useEffect, useMemo, useState } from "react";

import {
  filter,
  identity,
  ifElse,
  includes,
  isEmpty,
  pipe,
  prop,
  sortBy,
  toLower,
  trim,
} from "ramda";
import { createCategory, fetchCategories } from "src/apis/categories";
import { useCategoryContext } from "src/contexts/category";

const useCategory = () => {
  const {
    isCategorySidebarOpen,
    closeCategorySidebar,
    selectedCategoryId,
    setSelectedCategory,
    clearSelectedCategory,
  } = useCategoryContext();

  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const loadCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchCategories();
      setCategories(response?.data?.categories ?? []);
    } catch {
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isCategorySidebarOpen) loadCategories();
  }, [isCategorySidebarOpen, loadCategories]);

  const filteredCategories = useMemo(() => {
    const normalizedNeedle = pipe(trim, toLower)(searchTerm);

    return pipe(
      sortBy(pipe(prop("name"), toLower)),
      ifElse(
        () => isEmpty(normalizedNeedle),
        identity,
        filter(category =>
          includes(normalizedNeedle, pipe(prop("name"), toLower)(category))
        )
      )
    )(categories);
  }, [categories, searchTerm]);

  const openCreateModal = useCallback(() => setIsCreateModalOpen(true), []);
  const closeCreateModal = useCallback(() => setIsCreateModalOpen(false), []);

  const handleCreateCategory = useCallback(
    async name => {
      setIsCreating(true);
      try {
        await createCategory({ name });
        closeCreateModal();
        await loadCategories();
      } finally {
        setIsCreating(false);
      }
    },
    [closeCreateModal, loadCategories]
  );

  return {
    // context driven
    isCategorySidebarOpen,
    closeCategorySidebar,
    selectedCategoryId,
    setSelectedCategory,
    clearSelectedCategory,

    // sidebar + modal state
    categories: filteredCategories,
    searchTerm,
    setSearchTerm,
    isLoading,
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    isCreating,
    handleCreateCategory,
  };
};

export default useCategory;
