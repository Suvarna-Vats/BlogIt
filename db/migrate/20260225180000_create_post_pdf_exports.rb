# frozen_string_literal: true

class CreatePostPdfExports < ActiveRecord::Migration[8.0]
  def change
    create_table :post_pdf_exports do |t|
      t.references :post, null: false, foreign_key: true, index: true
      t.references :user, null: false, foreign_key: true, index: true

      t.string :token, null: false
      t.string :status, null: false, default: "queued"
      t.integer :progress, null: false, default: 0
      t.string :file_path
      t.text :error_message

      t.timestamps
    end

    add_index :post_pdf_exports, :token, unique: true
  end
end

