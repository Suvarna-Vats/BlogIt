import React from "react";

import { withTranslation } from "react-i18next";

const withT = WrappedComponent => {
  const WithTComponent = props => {
    const { t, ...rest } = props;

    return <WrappedComponent t={t} {...rest} />;
  };

  return withTranslation()(WithTComponent);
};

export default withT;
