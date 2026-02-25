import React, { useMemo } from "react";

import { Down } from "@bigbinary/neeto-icons";
import { Checkbox, Dropdown } from "@bigbinary/neetoui";

const ColumnsSelector = ({ visibleColumnKeys = [], onChange }) => {
  const columns = useMemo(
    () => [
      { key: "title", label: "Title", disabled: true },
      { key: "categories", label: "Category" },
      { key: "last_published_at", label: "Last published at" },
      { key: "status", label: "Status" },
    ],
    []
  );

  const toggle = (key, isChecked) => {
    const safeKeys = new Set([...(visibleColumnKeys ?? []), "title"]);

    if (key === "title") {
      safeKeys.add("title");
    } else if (isChecked) {
      safeKeys.add(key);
    } else {
      safeKeys.delete(key);
    }

    onChange?.(Array.from(safeKeys));
  };

  return (
    <Dropdown
      closeOnSelect={false}
      strategy="fixed"
      customTarget={
        <button
          className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          type="button"
        >
          <span>Columns</span>
          <Down size={16} />
        </button>
      }
    >
      <Dropdown.Menu className="py-2">
        {columns.map(column => {
          const checked =
            column.key === "title" || visibleColumnKeys.includes(column.key);

          return (
            <div className="px-3 py-1" key={column.key}>
              <Checkbox
                checked={checked}
                disabled={column.disabled}
                label={column.label}
                onChange={event => toggle(column.key, event.target.checked)}
              />
            </div>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ColumnsSelector;
