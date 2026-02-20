import i18n from "src/i18n";
import * as yup from "yup";

const LOGIN_VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email(i18n.t("auth.validation.invalidEmail"))
    .required(i18n.t("auth.validation.emailRequired")),
  password: yup.string().required(i18n.t("auth.validation.passwordRequired")),
});

const SIGNUP_VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().trim().required(i18n.t("auth.validation.nameRequired")),
  email: yup
    .string()
    .trim()
    .email(i18n.t("auth.validation.invalidEmail"))
    .required(i18n.t("auth.validation.emailRequired")),
  password: yup
    .string()
    .min(6, i18n.t("auth.validation.passwordMin"))
    .required(i18n.t("auth.validation.passwordRequired")),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], i18n.t("auth.validation.passwordsMismatch"))
    .required(i18n.t("auth.validation.passwordConfirmationRequired")),
});

export { LOGIN_VALIDATION_SCHEMA, SIGNUP_VALIDATION_SCHEMA };
