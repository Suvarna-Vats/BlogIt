# frozen_string_literal: true

json.notice t("user.signed_up")
json.extract! @user,
  :id,
  :name,
  :email
