# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :set_post, only: [ :show, :update, :destroy ]
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

  def mine
    authorize Post, :mine?
    @posts = current_user.posts
      .includes(:user, :categories)
      .order(updated_at: :desc)
  end

  def show
    authorize @post
  end

  def create
    post = current_user.posts.new(post_params)
    post.organization = current_user.organization
    authorize post
    post.save!
    render_notice(t("successfully_created"), :created)
  end

  def update
    authorize @post

    if @post.update(post_params)
      render_notice(t("successfully_updated"))
    else
      render_error(@post.errors.full_messages.to_sentence, :unprocessable_entity)
    end
  end

  def destroy
    authorize @post
    @post.destroy!
    render_notice(t("successfully_deleted"))
  end

  private

    def post_params
      params.require(:post).permit(
        :title,
        :description,
        :status,
        category_ids: []
      )
    end

    def set_post
      @post = Post
        .includes(:user, :organization, :categories)
        .find_by!(slug: params[:slug], organization_id: current_user.organization_id)
    end
end
