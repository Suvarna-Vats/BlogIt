# frozen_string_literal: true

class AddStatusToPosts < ActiveRecord::Migration[8.0]
  def up
    add_column :posts, :status, :string, null: false, default: "published"
    add_index :posts, :status

    execute("UPDATE posts SET status = 'published' WHERE status IS NULL")
  end

  def down
    remove_index :posts, :status
    remove_column :posts, :status
  end
end

