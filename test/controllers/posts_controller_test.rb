# frozen_string_literal: true

require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  test "GET /posts returns ok" do
    get posts_url
    assert_response :success
  end
end
