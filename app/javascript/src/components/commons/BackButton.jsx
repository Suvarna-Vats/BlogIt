import React from "react";

import { Left } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import routes from "routes";

const BackButton = ({
  to = routes.blogs.index,
  label,
  className,
  ...buttonProps
}) => {
  const history = useHistory();
  const { t } = useTranslation();
  const resolvedLabel = label ?? t("common.back");

  const handleClick = () => {
    if (typeof to === "number") {
      history.go(to);

      return;
    }

    history.push(to);
  };

  return (
    <Button
      className={className}
      icon={Left}
      label={resolvedLabel}
      style="text"
      onClick={handleClick}
      {...buttonProps}
    />
  );
};

export default BackButton;
