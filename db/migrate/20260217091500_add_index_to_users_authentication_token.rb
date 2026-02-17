# frozen_string_literal: true

class AddIndexToUsersAuthenticationToken < ActiveRecord::Migration[8.0]
  def change
    add_index :users, :authentication_token, unique: true
  end
end

