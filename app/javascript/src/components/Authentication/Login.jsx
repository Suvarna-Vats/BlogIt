import React from "react";

import { Button, Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { useHistory, Redirect } from "react-router-dom";
import routes from "routes";
import useLogin from "src/components/Authentication/hooks/useLogin";
import { isLoggedIn } from "utils/auth";

import { LoginForm } from "./Form";

const Login = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { handleSubmit } = useLogin();

  if (isLoggedIn()) return <Redirect to={routes.blogs.index} />;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto w-full max-w-md rounded-lg border border-gray-200 bg-white p-8">
        <Typography component="h1" style="h2" weight="bold">
          {t("auth.login.title")}
        </Typography>
        <Typography className="mt-2 text-gray-600" style="body2">
          {t("auth.login.subtitle")}
        </Typography>
        <LoginForm onSubmit={handleSubmit} />
        <div className="mt-6 flex items-center justify-center gap-2">
          <Typography className="text-gray-600" style="body3">
            {t("auth.login.newHere")}
          </Typography>
          <Button
            label={t("auth.login.createAccount")}
            style="text"
            onClick={() => history.push(routes.auth.signup)}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
