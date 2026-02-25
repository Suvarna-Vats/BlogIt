# frozen_string_literal: true

class PostsController < ApplicationController
  DEFAULT_PAGE = 1
  DEFAULT_PAGE_SIZE = 10
  MAX_PAGE_SIZE = 100

  before_action :set_post, only: [ :show, :update, :destroy ]
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index
  def index
    posts_scope = policy_scope(Post)
      .includes(:user, :categories)
      .order(created_at: :desc)

    if params[:category_id].present?
      posts_scope = posts_scope
        .joins(:categories)
        .where(categories: { id: params[:category_id] })
        .distinct
    end

    @pagy, @posts = pagy(
      :offset,
      posts_scope,
      page: normalized_page(params[:page]),
      limit: normalized_page_size(params[:page_size])
    )

    @my_votes_by_post_id = my_votes_by_post_id_for(@posts)
  end

  def mine
    authorize Post, :mine?
    base_scope = current_user.posts
      .includes(:user, :categories)
      .order(updated_at: :desc)

    filtered_scope = FilterPostsService.new(params: filter_params, scope: base_scope).process!
    @pagy, @posts = pagy(
      :offset,
      filtered_scope,
      page: normalized_page(filter_params[:page]),
      limit: normalized_page_size(filter_params[:page_size])
    )

    @my_votes_by_post_id = my_votes_by_post_id_for(@posts)
  end

  def show
    authorize @post
    kind = Vote.where(user_id: current_user.id, post_id: @post.id).pick(:kind)
    @my_vote = kind
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

    def filter_params
      params.permit(
        :page,
        :page_size,
        :status,
        :title,
        category_ids: []
      )
    end

    def set_post
      @post = Post
        .includes(:user, :organization, :categories)
        .find_by!(slug: params[:slug], organization_id: current_user.organization_id)
    end

    def my_votes_by_post_id_for(posts)
      post_ids = Array(posts).map(&:id).compact
      return {} if post_ids.empty?

      Vote
        .where(user_id: current_user.id, post_id: post_ids)
        .pluck(:post_id, :kind)
        .to_h
    end

    def normalized_page(value)
      page = value.to_i
      return DEFAULT_PAGE if page < 1

      page
    end

    def normalized_page_size(value)
      page_size = value.to_i
      page_size = DEFAULT_PAGE_SIZE if page_size < 1

      [page_size, MAX_PAGE_SIZE].min
    end
end
