import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const MyBlogPostsSelectionContext = createContext(null);

const MyBlogPostsSelectionProvider = ({ children }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isBulkSelectedAllRows, setIsBulkSelectedAllRows] = useState(false);

  const clearSelection = useCallback(() => {
    setSelectedRowKeys([]);
    setIsBulkSelectedAllRows(false);
  }, []);

  const value = useMemo(
    () => ({
      selectedRowKeys,
      setSelectedRowKeys,
      isBulkSelectedAllRows,
      setIsBulkSelectedAllRows,
      clearSelection,
    }),
    [clearSelection, isBulkSelectedAllRows, selectedRowKeys]
  );

  return (
    <MyBlogPostsSelectionContext.Provider value={value}>
      {children}
    </MyBlogPostsSelectionContext.Provider>
  );
};

const useMyBlogPostsSelection = () => {
  const ctx = useContext(MyBlogPostsSelectionContext);
  if (!ctx) {
    throw new Error(
      "useMyBlogPostsSelection must be used within MyBlogPostsSelectionProvider"
    );
  }

  return ctx;
};

export { MyBlogPostsSelectionProvider, useMyBlogPostsSelection };
