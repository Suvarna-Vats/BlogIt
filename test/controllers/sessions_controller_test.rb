require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test "creates session for valid credentials" do
    user = User.create!(
      name: "Oliver Smith",
      email: "oliver.smith@example.com",
      password: "welcome",
      password_confirmation: "welcome"
    )

    post session_url,
      params: { login: { email: user.email, password: "welcome" } },
      as: :json

    assert_response :success
    response_body = response.parsed_body

    assert_equal user.id, response_body["id"]
    assert_equal user.name, response_body["name"]
    assert_equal user.email, response_body["email"]
    assert response_body["authentication_token"].present?
  end

  test "returns unauthorized for invalid credentials" do
    user = User.create!(
      name: "Oliver Smith",
      email: "oliver.smith@example.com",
      password: "welcome",
      password_confirmation: "welcome"
    )

    post session_url,
      params: { login: { email: user.email, password: "incorrect" } },
      as: :json

    assert_response :unauthorized
    assert_equal I18n.t("session.incorrect_credentials"), response.parsed_body["error"]
  end

  test "destroys session for authenticated user" do
    user = User.create!(
      name: "Oliver Smith",
      email: "oliver.smith@example.com",
      password: "welcome",
      password_confirmation: "welcome"
    )
    user.regenerate_authentication_token
    old_token = user.authentication_token

    delete session_url,
      headers: {
        "X-Auth-Email" => user.email,
        "X-Auth-Token" => old_token,
      },
      as: :json

    assert_response :success
    assert_equal I18n.t("session.logged_out"), response.parsed_body["notice"]
    assert_not_equal old_token, user.reload.authentication_token
  end
end
