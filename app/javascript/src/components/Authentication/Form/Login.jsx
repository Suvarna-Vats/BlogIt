import React from "react";

import { Button, Input, Typography } from "@bigbinary/neetoui";
import { Form, Formik } from "formik";
import * as yup from "yup";

const VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: yup.string().required("Password is required."),
});

const LoginForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ email: "", password: "" }}
    validationSchema={VALIDATION_SCHEMA}
    onSubmit={onSubmit}
  >
    {({ errors, handleBlur, handleChange, isSubmitting, touched, values }) => (
      <Form className="mt-6 space-y-5">
        <Input
          required
          label="Email"
          name="email"
          placeholder="oliver@example.com"
          value={values.email}
          error={touched.email && errors.email}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Input
          required
          label="Password"
          name="password"
          placeholder="Enter password"
          type="password"
          value={values.password}
          error={touched.password && errors.password}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Button
          className="w-full cursor-pointer bg-black"
          label={isSubmitting ? "Signing in..." : "Sign in"}
          loading={isSubmitting}
          size="large"
          type="submit"
        />
        <Typography className="text-center text-gray-500" style="nano">
          Use your registered email and password to sign in.
        </Typography>
      </Form>
    )}
  </Formik>
);

export default LoginForm;

