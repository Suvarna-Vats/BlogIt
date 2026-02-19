import React, { useMemo } from "react";

import Category from "components/Category";
import Sidebar from "src/commons/Sidebar";
import { useCategoryContext } from "src/contexts/category";

import { SIDEBAR_ITEMS } from "./constants";

const Layout = ({ children }) => {
  const { isCategorySidebarOpen, toggleCategorySidebar } = useCategoryContext();

  const sidebarItems = useMemo(
    () =>
      SIDEBAR_ITEMS.map(item =>
        item.action === "categories"
          ? {
              ...item,
              onClick: toggleCategorySidebar,
              isActive: isCategorySidebarOpen,
            }
          : item
      ),
    [isCategorySidebarOpen, toggleCategorySidebar]
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        <Sidebar items={sidebarItems} />
        <Category />
        <main className="flex-1 px-10 py-12">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
