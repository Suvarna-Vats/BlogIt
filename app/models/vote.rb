# frozen_string_literal: true

class Vote < ApplicationRecord
  enum :kind, { downvote: -1, upvote: 1 }

  belongs_to :post
  belongs_to :user

  validates :kind, presence: true
  validates :user_id, uniqueness: { scope: :post_id }
  validate :user_and_post_in_same_organization

  before_destroy :remember_destroy_context

  after_commit :recalculate_post_counters_after_save, on: %i[create update]
  after_commit :recalculate_post_counters_after_destroy, on: :destroy

  private

    def user_and_post_in_same_organization
      return if user.blank? || post.blank?
      return if user.organization_id == post.organization_id

      errors.add(:base, "User and post must belong to the same organization")
    end

    def remember_destroy_context
      @post_id_before_destroy = post_id
    end

    def recalculate_post_counters_after_save
      recalculate_post_counters!(post_id)
    end

    def recalculate_post_counters_after_destroy
      recalculate_post_counters!(@post_id_before_destroy)
    end

    def recalculate_post_counters!(target_post_id)
      return if target_post_id.blank?

      post_record = Post.find_by(id: target_post_id)
      return if post_record.blank?

      post_record.with_lock do
        upvote_value = Vote.kinds.fetch("upvote")
        downvote_value = Vote.kinds.fetch("downvote")
        counts_by_kind = Vote.where(post_id: target_post_id).group(:kind).count

        upvotes = counts_by_kind[upvote_value].to_i
        downvotes = counts_by_kind[downvote_value].to_i
        threshold = Post.bloggable_threshold
        is_bloggable = (upvotes - downvotes) > threshold

        post_record.update!(upvotes:, downvotes:, is_bloggable:)
      end
    end
end

