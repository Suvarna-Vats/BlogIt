# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_posts, only: [ :index ]

  def index
    render
  end

  def show
    @post = Post.includes(:user, :organization, :categories).find_by!(slug: params[:slug])
  end

  def create
    post = current_user.posts.new(post_params)
    post.organization = current_user.organization

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
        category_ids: []
      )
    end

    def load_posts
      current_org_id = current_user.organization_id
      @posts = Post
        .includes(:user, :organization, :categories)
        .joins(:user)
        .where(organization_id: current_org_id)
        .where(users: { organization_id: current_org_id })
        .order(created_at: :desc)

      return if params[:category_id].blank?

      @posts = @posts
        .joins(:categories)
        .where(categories: { id: params[:category_id] })
        .distinct
    end
end
