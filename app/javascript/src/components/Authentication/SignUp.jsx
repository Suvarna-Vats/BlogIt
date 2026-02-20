import React from "react";

import { Typography, Button } from "@bigbinary/neetoui";
import { Redirect, useHistory } from "react-router-dom";
import useSignUp from "src/components/Authentication/hooks/useSignUp";
import { isLoggedIn } from "utils/auth";

import { SignUpForm } from "./Form";

const SignUp = () => {
  const history = useHistory();
  const { handleSubmit } = useSignUp();

  if (isLoggedIn()) return <Redirect to="/blogs" />;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="mx-auto w-full max-w-md rounded-lg border border-gray-200 bg-white p-8">
        <Typography component="h1" style="h2" weight="bold">
          Sign up
        </Typography>
        <Typography className="mt-2 text-gray-600" style="body2">
          Create your account to start blogging.
        </Typography>
        <SignUpForm onSubmit={handleSubmit} />
        <div className="mt-6 flex items-center justify-center gap-2">
          <Typography className="text-gray-600" style="body3">
            Already have an account?
          </Typography>
          <Button
            label="Sign in"
            style="text"
            onClick={() => history.push("/login")}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
