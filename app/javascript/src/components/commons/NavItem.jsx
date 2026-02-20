import React, { useMemo } from "react";

import { Button } from "@bigbinary/neetoui";
import classNames from "classnames";
import { useHistory, useLocation } from "react-router-dom";

const NavItem = ({ isExpanded, item }) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const { exact = true, icon, isActive, label, onClick, to } = item;

  const isRouteActive = useMemo(() => {
    if (!to) return false;

    return exact ? pathname === to : pathname.startsWith(to);
  }, [exact, pathname, to]);

  const isItemActive = isActive ?? isRouteActive;

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      history.push(to);
    }
  };

  return (
    <Button
      aria-label={label}
      icon={icon}
      label={isExpanded ? label : ""}
      style="text"
      className={classNames(
        "w-full rounded-md px-2 py-2 text-gray-700 hover:bg-gray-100",
        !isExpanded && "!justify-center",
        isItemActive && "bg-gray-100 text-gray-900"
      )}
      onClick={handleClick}
    />
  );
};

export default NavItem;
