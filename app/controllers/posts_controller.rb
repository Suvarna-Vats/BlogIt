# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :set_post, only: [ :show, :update ]
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index
  def index
    @posts = policy_scope(Post)
      .includes(:user, :categories)
      .order(created_at: :desc)

    if params[:category_id].present?
      @posts = @posts
        .joins(:categories)
        .where(categories: { id: params[:category_id] })
        .distinct
    end
  end

  def show
    authorize @post
  end

  def create
    post = current_user.posts.new(post_params)
    post.organization = current_user.organization
    authorize post

    if post.save
      render_notice(t("successfully_created"), :created)
    else
      render_error(post.errors.full_messages.to_sentence, :unprocessable_entity)
    end
  end

  def update
    authorize @post

    if @post.update(post_params)
      render_notice(t("successfully_updated"))
    else
      render_error(@post.errors.full_messages.to_sentence, :unprocessable_entity)
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

    def set_post
      @post = policy_scope(Post)
        .includes(:user, :organization, :categories)
        .find_by!(slug: params[:slug])
    end
end
