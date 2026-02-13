# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    render status: :ok, json: { posts: Post.all }
  end

  def show
    post = Post.find_by(slug: params[:slug])
    if post
      render json: { post: post }, status: :ok
    else
      render json: { error: "Post not found" }, status: :not_found
    end
  end
end
