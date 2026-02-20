# frozen_string_literal: true

class AddLastPublishedAtToPosts < ActiveRecord::Migration[8.0]
  def up
    add_column :posts, :last_published_at, :datetime

    execute <<~SQL.squish
      UPDATE posts
      SET last_published_at = updated_at
      WHERE status = 'published'
        AND last_published_at IS NULL
    SQL
  end

  def down
    remove_column :posts, :last_published_at
  end
end
