import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { isNil } from "ramda";

const CategoryContext = createContext(null);

const CategoryProvider = ({ children }) => {
  const [isCategorySidebarOpen, setIsCategorySidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const openCategorySidebar = useCallback(
    () => setIsCategorySidebarOpen(true),
    []
  );

  const closeCategorySidebar = useCallback(
    () => setIsCategorySidebarOpen(false),
    []
  );

  const toggleCategorySidebar = useCallback(
    () => setIsCategorySidebarOpen(prev => !prev),
    []
  );

  const clearSelectedCategory = useCallback(
    () => setSelectedCategory(null),
    []
  );

  const selectedCategoryId = useMemo(
    () => (isNil(selectedCategory) ? null : selectedCategory.id),
    [selectedCategory]
  );

  const value = useMemo(
    () => ({
      isCategorySidebarOpen,
      openCategorySidebar,
      closeCategorySidebar,
      toggleCategorySidebar,
      selectedCategory,
      selectedCategoryId,
      setSelectedCategory,
      clearSelectedCategory,
    }),
    [
      clearSelectedCategory,
      closeCategorySidebar,
      isCategorySidebarOpen,
      openCategorySidebar,
      selectedCategory,
      selectedCategoryId,
      toggleCategorySidebar,
    ]
  );

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

const useCategoryContext = () => {
  const ctx = useContext(CategoryContext);
  if (!ctx) {
    throw new Error("useCategoryContext must be used within CategoryProvider");
  }

  return ctx;
};

export { CategoryProvider, useCategoryContext };
