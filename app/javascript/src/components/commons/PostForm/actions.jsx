import React from "react";

import { Dropdown } from "@bigbinary/neetoui";

const PostFormActions = ({ onDelete }) => {
  const actions = [
    typeof onDelete === "function" && {
      key: "delete",
      label: "Delete",
      style: "danger",
      onClick: onDelete,
    },
  ].filter(Boolean);

  if (actions.length === 0) return null;

  return (
    <Dropdown
      strategy="fixed"
      customTarget={
        <button
          aria-label="More actions"
          className="grid h-10 w-10 place-items-center rounded-md text-gray-700 hover:bg-gray-100"
          type="button"
        >
          <i className="ri-more-2-line text-lg" />
        </button>
      }
    >
      <Dropdown.Menu>
        {actions.map(action => {
          if (!action?.key || typeof action?.onClick !== "function") {
            return null;
          }

          return (
            <Dropdown.MenuItem.Button
              key={action.key}
              style={action.style}
              onClick={action.onClick}
            >
              {action.label}
            </Dropdown.MenuItem.Button>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PostFormActions;
