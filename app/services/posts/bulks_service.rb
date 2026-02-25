# frozen_string_literal: true

class Posts::BulksService
  attr_reader :user

  def initialize(user:)
    @user = user
  end

  def update_status!(ids:, status:)
    normalized_ids = normalize_ids(ids)
    raise ArgumentError, "Ids can't be blank" if normalized_ids.empty?

    next_status = status.to_s
    raise ArgumentError, "Invalid status" unless Post.statuses.key?(next_status)

    scope = user.posts.where(id: normalized_ids)

    if next_status == "published"
      publish_drafts!(scope)
    else
      set_status!(scope, next_status)
    end
  end

  def destroy!(ids:)
    normalized_ids = normalize_ids(ids)
    raise ArgumentError, "Ids can't be blank" if normalized_ids.empty?

    user.posts.where(id: normalized_ids).destroy_all
  end

  private

    def publish_drafts!(scope)
      scope.where(status: "draft").find_each do |post|
        post.update!(status: "published")
      end
    end

    def set_status!(scope, next_status)
      scope.where.not(status: next_status).find_each do |post|
        post.update!(status: next_status)
      end
    end

    def normalize_ids(values)
      Array(values).filter_map do |value|
        Integer(value)
      rescue ArgumentError, TypeError
        nil
      end.uniq
    end
end
