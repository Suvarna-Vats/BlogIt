import React, { useEffect, useRef, useState } from "react";

import { Avatar, Button, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";

const User = ({ isExpanded, userName, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);

  const safeUserName = userName?.trim() || "User";

  useEffect(() => {
    const handleOutsideClick = event => {
      if (!containerRef.current) return;

      if (containerRef.current.contains(event.target)) return;

      setIsMenuOpen(false);
    };

    const handleEscape = event => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleToggleMenu = () => setIsMenuOpen(open => !open);

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await onLogout?.();
  };

  return (
    <div
      ref={containerRef}
      className={classNames(
        "relative w-full",
        isExpanded ? "flex items-center" : "flex justify-center"
      )}
    >
      <button
        aria-label="User menu"
        type="button"
        className={classNames(
          "flex items-center gap-3 rounded-md p-1 hover:bg-gray-100",
          !isExpanded && "p-0"
        )}
        onClick={handleToggleMenu}
      >
        <Avatar size="medium" user={{ name: safeUserName, imageUrl: "" }} />
        {isExpanded && (
          <Typography
            className="max-w-[10rem] truncate text-gray-900"
            component="span"
            style="body3"
            weight="medium"
          >
            {safeUserName}
          </Typography>
        )}
      </button>
      {isMenuOpen && (
        <div
          role="menu"
          className={classNames(
            "absolute bottom-full mb-2 rounded-md border border-gray-200 bg-white p-2 shadow-lg",
            isExpanded ? "left-0 w-56" : "left-1/2 w-48 -translate-x-1/2"
          )}
        >
          <Typography
            className="mb-2 px-1 text-gray-900"
            component="p"
            style="body3"
            weight="semibold"
          >
            {safeUserName}
          </Typography>
          <Button
            fullWidth
            label="Logout"
            style="text"
            onClick={handleLogout}
          />
        </div>
      )}
    </div>
  );
};

export default User;
