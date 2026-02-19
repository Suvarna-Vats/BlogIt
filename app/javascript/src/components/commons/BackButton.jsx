import React from "react";

import { Left } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";
import { useHistory } from "react-router-dom";

const BackButton = ({
  to = "/blogs",
  label = "Back",
  className,
  ...buttonProps
}) => {
  const history = useHistory();

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
      label={label}
      style="text"
      onClick={handleClick}
      {...buttonProps}
    />
  );
};

export default BackButton;
