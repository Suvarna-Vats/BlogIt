import React from "react";

import { Button, Typography } from "@bigbinary/neetoui";
import { useHistory, Redirect } from "react-router-dom";
import useLogin from "src/components/Authentication/hooks/useLogin";
import { isLoggedIn } from "utils/auth";

import { LoginForm } from "./Form";

const Login = () => {
  const history = useHistory();
  const { handleSubmit } = useLogin();

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
        <div className="mt-6 flex items-center justify-center gap-2">
          <Typography className="text-gray-600" style="body3">
            New here?
          </Typography>
          <Button
            label="Create an account"
            style="text"
            onClick={() => history.push("/signup")}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
