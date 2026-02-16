# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_posts, only: [ :index ]

  def index
    render
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
      params.require(:post).permit(
        :title,
        :description,
        :user_id,
        :organization_id,
        category_ids: []
      )
    end

    def load_posts
      @posts = Post.includes(:user, :organization, :categories).order(created_at: :desc)

      return if params[:category_id].blank?

      @posts = @posts
        .joins(:categories)
        .where(categories: { id: params[:category_id] })
        .distinct
    end
end
