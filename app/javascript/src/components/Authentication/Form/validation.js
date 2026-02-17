import * as yup from "yup";

const LOGIN_VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: yup.string().required("Password is required."),
});

const SIGNUP_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().trim().required("Name is required."),
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match.")
    .required("Password confirmation is required."),
});

export { LOGIN_VALIDATION_SCHEMA, SIGNUP_VALIDATION_SCHEMA };

