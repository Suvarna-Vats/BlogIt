import React from "react";

import { MatrixDots } from "@bigbinary/neeto-icons";
import { Dropdown } from "@bigbinary/neetoui";
import { buildPostActions } from "src/components/utis";

const PostActions = ({ status, onChangeStatus, onDelete }) => {
  const actions = buildPostActions({ status, onChangeStatus, onDelete });

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
          <MatrixDots size={18} />
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

export default PostActions;
