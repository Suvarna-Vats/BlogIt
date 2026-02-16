import React from "react";

import useCategory from "src/hooks/useCategory";

import CreateCategoryModal from "./Modal";
import CategorySidebar from "./Sidebar";

const Category = () => {
  const {
    isCategorySidebarOpen,
    closeCategorySidebar,
    selectedCategoryId,
    setSelectedCategory,
    clearSelectedCategory,
    categories,
    searchTerm,
    setSearchTerm,
    isLoading,
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    isCreating,
    handleCreateCategory,
  } = useCategory();

  return (
    <>
      <CategorySidebar
        {...{
          isOpen: isCategorySidebarOpen,
          isLoading,
          categories,
          searchTerm,
          selectedCategoryId,
          onSearchChange: setSearchTerm,
          onAddNew: openCreateModal,
          onClose: closeCategorySidebar,
          onClearSelection: clearSelectedCategory,
          onSelectCategory: setSelectedCategory,
        }}
      />
      <CreateCategoryModal
        isOpen={isCreateModalOpen}
        isSubmitting={isCreating}
        onClose={closeCreateModal}
        onSubmit={handleCreateCategory}
      />
    </>
  );
};

export default Category;
