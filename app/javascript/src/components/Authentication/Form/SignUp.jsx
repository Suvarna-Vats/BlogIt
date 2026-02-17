import React from "react";

import { Button, Input, Typography } from "@bigbinary/neetoui";
import { Form, Formik } from "formik";

import { SIGNUP_VALIDATION_SCHEMA } from "./validation";

const SignUpForm = ({ onSubmit }) => (
  <Formik
    validationSchema={SIGNUP_VALIDATION_SCHEMA}
    initialValues={{
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    }}
    onSubmit={onSubmit}
  >
    {({ errors, handleBlur, handleChange, isSubmitting, touched, values }) => (
      <Form className="mt-6 space-y-5">
        <Input
          required
          error={touched.name && errors.name}
          label="Name"
          name="name"
          placeholder="Oliver Smith"
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Input
          required
          error={touched.email && errors.email}
          label="Email"
          name="email"
          placeholder="oliver@example.com"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Input
          required
          error={touched.password && errors.password}
          label="Password"
          name="password"
          placeholder="Create a password"
          type="password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Input
          required
          error={touched.passwordConfirmation && errors.passwordConfirmation}
          label="Confirm password"
          name="passwordConfirmation"
          placeholder="Re-enter password"
          type="password"
          value={values.passwordConfirmation}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Button
          className="w-full cursor-pointer bg-black"
          label={isSubmitting ? "Creating account..." : "Create account"}
          loading={isSubmitting}
          size="large"
          type="submit"
        />
        <Typography className="text-center text-gray-500" style="nano">
          By signing up, you’ll be able to create and manage blog posts.
        </Typography>
      </Form>
    )}
  </Formik>
);

export default SignUpForm;
