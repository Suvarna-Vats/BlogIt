# frozen_string_literal: true

class BackfillPostVoteCountersV2 < ActiveRecord::Migration[8.0]
  disable_ddl_transaction!

  def up
    say_with_time "Backfilling posts.upvotes/downvotes/is_bloggable from votes (enum-safe)" do
      threshold = Rails.configuration.x.bloggable_threshold.to_i

      counts = Vote.group(:post_id, :kind).count
      by_post_id = Hash.new { |h, k| h[k] = Hash.new(0) }

      counts.each do |(post_id, kind), count|
        by_post_id[post_id][kind.to_s] = count.to_i
      end

      Post.find_each do |post|
        upvotes = by_post_id[post.id]["upvote"].to_i
        downvotes = by_post_id[post.id]["downvote"].to_i
        is_bloggable = (upvotes - downvotes) > threshold

        post.update_columns(
          upvotes:,
          downvotes:,
          is_bloggable:,
          updated_at: Time.current
        )
      end
    end
  end

  def down
    # no-op
  end
end
