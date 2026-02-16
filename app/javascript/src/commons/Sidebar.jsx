import React, { useMemo, useState } from "react";

import { HamburgerMenu } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";

import { DEFAULT_ITEMS } from "./constants";
import NavItem from "./NavItem";

const Sidebar = ({ items = DEFAULT_ITEMS }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = useMemo(() => items ?? DEFAULT_ITEMS, [items]);

  return (
    <aside
      aria-label="Sidebar"
      className={classNames(
        "h-screen shrink-0 border-r bg-white",
        "flex flex-col",
        isExpanded ? "w-56" : "w-16"
      )}
    >
      <div
        className={classNames(
          "px-3 py-4",
          "flex items-center",
          isExpanded ? "justify-between" : "justify-center"
        )}
      >
        <Button
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          className="grid h-10 w-10 place-items-center rounded-md text-gray-700 hover:bg-gray-100"
          icon={HamburgerMenu}
          style="text"
          onClick={() => setIsExpanded(prev => !prev)}
        />
        {isExpanded && (
          <Typography
            className="text-gray-900"
            component="span"
            style="body2"
            weight="semibold"
          >
            Navigation
          </Typography>
        )}
      </div>
      <nav
        aria-label="Primary"
        className={classNames(
          "flex-1 px-2",
          isExpanded ? "space-y-1" : "space-y-2"
        )}
      >
        {navItems.map(item => (
          <NavItem isExpanded={isExpanded} item={item} key={item.label} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
