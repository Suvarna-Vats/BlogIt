# frozen_string_literal: true

class BackfillPostVoteCountersV4 < ActiveRecord::Migration[8.0]
  disable_ddl_transaction!

  def up
    say_with_time "Backfilling posts.upvotes/downvotes/is_bloggable from votes (recount)" do
      threshold = Post.bloggable_threshold

      Post.find_each do |post|
        counts_by_kind = Vote.where(post_id: post.id).group(:kind).count
        upvotes = counts_by_kind["upvote"].to_i
        downvotes = counts_by_kind["downvote"].to_i
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
