# frozen_string_literal: true

class PostsController < ApplicationController
  def index
    posts = Post.order(created_at: :desc)
    render_json({ posts: })
  end

  def show
    post = Post.find_by!(slug: params[:slug])
    render_json({ post: })
  end

  def create
    post = Post.new(post_params)
    if post.save
      render_notice(t("successfully_created"), :created)
    else
      render_error(post.errors.full_messages.to_sentence, :unprocessable_entity)
    end
  end

  private

    def post_params
      params.require(:post).permit(:title, :description)
    end
end
