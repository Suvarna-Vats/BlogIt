# frozen_string_literal: true

class FilterPostsService
  def initialize(params:, scope: Post.all)
    @params = params || {}
    @scope = scope
  end

  def process!
    filtered = @scope
    filtered = with_all_categories(filtered)
    filtered = with_status(filtered)
    filtered = with_title(filtered)
    filtered
  end

  private

    def category_ids
      Array(@params[:category_ids])
        .reject(&:blank?)
        .map(&:to_i)
        .uniq
    end

    def with_all_categories(scope)
      ids = category_ids
      return scope if ids.empty?

      scope
        .joins(:categories)
        .where(categories: { id: ids })
        .group("posts.id")
        .having("COUNT(DISTINCT categories.id) = ?", ids.length)
    end

    def normalized_status
      status = @params[:status].to_s.strip.downcase
      return if status.blank?

      return unless Post.statuses.key?(status)

      status
    end

    def with_status(scope)
      status = normalized_status
      return scope unless status

      scope.where(status:)
    end

    def with_title(scope)
      title = @params[:title].to_s.strip
      return scope if title.blank?

      pattern = "%#{ActiveRecord::Base.sanitize_sql_like(title)}%"
      scope.where("LOWER(posts.title) LIKE LOWER(?)", pattern)
    end
end
