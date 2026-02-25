# frozen_string_literal: true

class RenameValueToKindInVotes < ActiveRecord::Migration[8.0]
  def change
    rename_column :votes, :value, :kind
  end
end
