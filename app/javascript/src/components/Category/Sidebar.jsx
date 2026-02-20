import React from "react";

import { Close, Plus } from "@bigbinary/neeto-icons";
import { Button, Input, Spinner, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import withT from "src/commons/withT";

const CategorySidebar = ({
  isOpen,
  isLoading,
  categories = [],
  searchTerm,
  selectedCategoryId,
  onSearchChange,
  onAddNew,
  onClose,
  onClearSelection,
  onSelectCategory,
  t,
}) => {
  if (!isOpen) return null;

  return (
    <aside
      aria-label={t("categories.sidebar.ariaLabel")}
      className={classNames(
        "h-screen w-72 shrink-0 border-r bg-gray-50",
        "flex flex-col"
      )}
    >
      <div className="flex items-center justify-between gap-2 px-4 py-4">
        <Typography
          className="text-gray-700"
          component="h2"
          style="nano"
          weight="semibold"
        >
          {t("categories.sidebar.title")}
        </Typography>
        <div className="flex items-center gap-1">
          <Button
            aria-label={t("categories.sidebar.addAriaLabel")}
            icon={Plus}
            size="small"
            style="text"
            onClick={onAddNew}
          />
          <Button
            aria-label={t("categories.sidebar.closeAriaLabel")}
            icon={Close}
            size="small"
            style="text"
            onClick={onClose}
          />
        </div>
      </div>
      <div className="px-4 pb-3">
        <Input
          placeholder={t("categories.sidebar.searchPlaceholder")}
          value={searchTerm}
          onChange={event => onSearchChange?.(event.target.value)}
        />
      </div>
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        {isLoading ? (
          <div className="grid place-items-center py-8">
            <Spinner />
          </div>
        ) : (
          <div className="space-y-1">
            <button
              type="button"
              className={classNames(
                "w-full rounded-md px-3 py-2 text-left text-sm",
                selectedCategoryId === null
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-700 hover:bg-gray-100"
              )}
              onClick={onClearSelection}
            >
              {t("common.allPosts")}
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                type="button"
                className={classNames(
                  "w-full rounded-md px-3 py-2 text-left text-sm",
                  selectedCategoryId === category.id
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={() => onSelectCategory?.(category)}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default withT(CategorySidebar);
