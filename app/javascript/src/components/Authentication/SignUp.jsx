import React from "react";

import { Typography, Button } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { Redirect, useHistory } from "react-router-dom";
import routes from "routes";
import useSignUp from "src/components/Authentication/hooks/useSignUp";
import { isLoggedIn } from "utils/auth";

import { SignUpForm } from "./Form";

const SignUp = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const { handleSubmit } = useSignUp();

  if (isLoggedIn()) return <Redirect to={routes.blogs.index} />;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto w-full max-w-md rounded-lg border border-gray-200 bg-white p-8">
        <Typography component="h1" style="h2" weight="bold">
          {t("auth.signup.title")}
        </Typography>
        <Typography className="mt-2 text-gray-600" style="body2">
          {t("auth.signup.subtitle")}
        </Typography>
        <SignUpForm onSubmit={handleSubmit} />
        <div className="mt-6 flex items-center justify-center gap-2">
          <Typography className="text-gray-600" style="body3">
            {t("auth.signup.alreadyHaveAccount")}
          </Typography>
          <Button
            label={t("auth.signup.signIn")}
            style="text"
            onClick={() => history.push(routes.auth.login)}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
