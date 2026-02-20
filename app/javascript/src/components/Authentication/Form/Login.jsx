import React from "react";

import { Button, Input, Typography } from "@bigbinary/neetoui";
import { Form, Formik } from "formik";
import withT from "src/commons/withT";

import { LOGIN_VALIDATION_SCHEMA } from "./validation";

const LoginForm = ({ onSubmit, t }) => (
  <Formik
    initialValues={{ email: "", password: "" }}
    validationSchema={LOGIN_VALIDATION_SCHEMA}
    onSubmit={onSubmit}
  >
    {({ errors, handleBlur, handleChange, isSubmitting, touched, values }) => (
      <Form className="mt-6 space-y-5">
        <Input
          required
          error={touched.email && errors.email}
          label={t("auth.fields.email")}
          name="email"
          placeholder={t("auth.placeholders.emailExample")}
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Input
          required
          error={touched.password && errors.password}
          label={t("auth.fields.password")}
          name="password"
          placeholder={t("auth.placeholders.enterPassword")}
          type="password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Button
          className="w-full cursor-pointer bg-black"
          loading={isSubmitting}
          size="large"
          type="submit"
          label={
            isSubmitting
              ? t("auth.buttons.signingIn")
              : t("auth.buttons.signIn")
          }
        />
        <Typography className="text-center text-gray-500" style="nano">
          {t("auth.login.helper")}
        </Typography>
      </Form>
    )}
  </Formik>
);

export default withT(LoginForm);
