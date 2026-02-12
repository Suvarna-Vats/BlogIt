# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    render status: :ok, json: { posts: Post.all }
  end
end
