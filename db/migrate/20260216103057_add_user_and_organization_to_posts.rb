# frozen_string_literal: true

class AddUserAndOrganizationToPosts < ActiveRecord::Migration[8.0]
  def change
    add_reference :posts, :user, null: false, foreign_key: true
    add_reference :posts, :organization, null: false, foreign_key: true
  end
end
