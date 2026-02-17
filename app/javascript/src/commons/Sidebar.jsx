import React, { useEffect, useMemo, useState } from "react";

import { HamburgerMenu } from "@bigbinary/neeto-icons";
import { Button, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { setAuthHeaders } from "src/apis/axios";
import { destroySession } from "src/apis/sessions";
import { getLoggedInUserName } from "utils/auth";
import { setToLocalStorage } from "utils/storage";

import { DEFAULT_ITEMS } from "./constants";
import NavItem from "./NavItem";
import User from "./User";

const Sidebar = ({ items = DEFAULT_ITEMS }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const history = useHistory();

  const navItems = useMemo(() => items ?? DEFAULT_ITEMS, [items]);
  const [userName, setUserName] = useState(() => getLoggedInUserName());

  useEffect(() => {
    const syncUserName = () => setUserName(getLoggedInUserName());
    syncUserName();

    window.addEventListener("storage", syncUserName);

    return () => window.removeEventListener("storage", syncUserName);
  }, []);

  const handleLogout = async () => {
    try {
      await destroySession();
    } finally {
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      setUserName(null);
      setAuthHeaders();
      history.push("/login");
    }
  };

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
      <div
        className={classNames(
          "border-t px-3 py-4",
          isExpanded ? "flex items-center" : "flex justify-center"
        )}
      >
        <User
          isExpanded={isExpanded}
          userName={userName}
          onLogout={handleLogout}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
