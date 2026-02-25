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

  def bulk_update
    authorize Post, :bulk_update?

    ids = normalized_ids(bulk_update_params[:ids])
    status = bulk_update_params[:status].to_s

    return render_error("Ids can't be blank", :unprocessable_entity) if ids.empty?
    return render_error("Invalid status", :unprocessable_entity) unless Post.statuses.key?(status)

    scope = current_user.posts.where(id: ids)
    now = Time.current

    if status == "published"
      scope.where(status: "draft").update_all(
        status: "published",
        last_published_at: now,
        updated_at: now
      )
    else
      scope.where.not(status: status).update_all(status:, updated_at: now)
    end

    render_notice(t("successfully_updated"))
  end

  def bulk_destroy
    authorize Post, :bulk_destroy?

    ids = normalized_ids(bulk_destroy_params[:ids])
    return render_error("Ids can't be blank", :unprocessable_entity) if ids.empty?

    current_user.posts.where(id: ids).destroy_all
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

    def bulk_update_params
      params.require(:post).permit(:status, ids: [])
    end

    def bulk_destroy_params
      params.require(:post).permit(ids: [])
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

    def normalized_ids(values)
      Array(values).filter_map do |value|
        Integer(value, 10)
      rescue ArgumentError, TypeError
        nil
      end.uniq
    end

    def set_post
      @post = Post
        .includes(:user, :organization, :categories)
        .find_by!(slug: params[:slug], organization_id: current_user.organization_id)
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
