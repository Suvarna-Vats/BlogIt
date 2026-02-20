import { useCallback, useMemo, useState } from "react";

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
import { useCategoryContext } from "src/contexts/category";
import { useCreateCategory, useFetchCategories } from "src/hooks/useCategories";

const useCategory = () => {
  const {
    isCategorySidebarOpen,
    closeCategorySidebar,
    selectedCategoryId,
    setSelectedCategory,
    clearSelectedCategory,
  } = useCategoryContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { data, isLoading } = useFetchCategories({
    enabled: isCategorySidebarOpen,
  });
  const categories = data?.data?.categories ?? [];

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

  const { mutateAsync: createCategory, isLoading: isCreating } =
    useCreateCategory();

  const handleCreateCategory = useCallback(
    async name => {
      await createCategory({ name });
      closeCreateModal();
    },
    [closeCreateModal, createCategory]
  );

  return {
    isCategorySidebarOpen,
    closeCategorySidebar,
    selectedCategoryId,
    setSelectedCategory,
    clearSelectedCategory,

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
