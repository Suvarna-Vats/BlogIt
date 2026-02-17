import React, { useCallback } from "react";

import { Typography } from "@bigbinary/neetoui";
import { useHistory, Redirect } from "react-router-dom";
import { setAuthHeaders } from "src/apis/axios";
import { createSession } from "src/apis/sessions";
import { isLoggedIn } from "utils/auth";
import { setToLocalStorage } from "utils/storage";

import LoginForm from "./Form/Login";

const Login = () => {
  const history = useHistory();

  const handleSubmit = useCallback(
    async values => {
      const payload = {
        email: values.email?.trim(),
        password: values.password,
      };

      const response = await createSession(payload);
      const { authentication_token, email, id, name } = response?.data ?? {};

      setToLocalStorage({
        authToken: authentication_token,
        email,
        userId: id,
        userName: name,
      });
      setAuthHeaders();
      history.push("/blogs");
    },
    [history]
  );

  if (isLoggedIn()) return <Redirect to="/blogs" />;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto w-full max-w-md rounded-lg border border-gray-200 bg-white p-8">
        <Typography component="h1" style="h2" weight="bold">
          Sign in
        </Typography>
        <Typography className="mt-2 text-gray-600" style="body2">
          Welcome back. Please enter your credentials to continue.
        </Typography>
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Login;
