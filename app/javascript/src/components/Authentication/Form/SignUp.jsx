import React from "react";

import { Button, Input, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import { Form, Formik } from "formik";
import withT from "src/commons/withT";

import { SIGNUP_VALIDATION_SCHEMA } from "./validation";

const SignUpForm = ({ onSubmit, t }) => (
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
          label={t("auth.fields.name")}
          name="name"
          placeholder={t("auth.placeholders.nameExample")}
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
        />
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
          placeholder={t("auth.placeholders.createPassword")}
          type="password"
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Input
          required
          error={touched.passwordConfirmation && errors.passwordConfirmation}
          label={t("auth.fields.confirmPassword")}
          name="passwordConfirmation"
          placeholder={t("auth.placeholders.reEnterPassword")}
          type="password"
          value={values.passwordConfirmation}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        <Button
          className="w-full cursor-pointer bg-black"
          loading={isSubmitting}
          size="large"
          type="submit"
          label={classNames({
            [t("auth.buttons.creatingAccount")]: isSubmitting,
            [t("auth.buttons.createAccount")]: !isSubmitting,
          })}
        />
        <Typography className="text-center text-gray-500" style="nano">
          {t("auth.signup.helper")}
        </Typography>
      </Form>
    )}
  </Formik>
);

export default withT(SignUpForm);
