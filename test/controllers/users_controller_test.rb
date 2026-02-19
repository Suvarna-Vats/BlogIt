# frozen_string_literal: true

require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "creates user with valid params" do
    assert_difference "User.count", 1 do
      post users_url,
        params: {
          user: {
            name: "Oliver Smith",
            email: "oliver.smith@example.com",
            password: "welcome",
            password_confirmation: "welcome"
          }
        },
        as: :json
    end

    assert_response :created
    response_body = response.parsed_body

    assert_equal I18n.t("user.signed_up"), response_body["notice"]
    assert_equal "Oliver Smith", response_body["name"]
    assert_equal "oliver.smith@example.com", response_body["email"]
    assert response_body["id"].present?
  end

  test "returns unprocessable entity for invalid params" do
    assert_no_difference "User.count" do
      post users_url,
        params: { user: { name: "", email: "bad", password: "", password_confirmation: "" } },
        as: :json
    end

    assert_response :unprocessable_entity
    assert response.parsed_body["error"].present?
  end
end
