# frozen_string_literal: true

class AddNotNullToOrganizationsName < ActiveRecord::Migration[8.0]
  def change
    change_column_null :organizations, :name, false
  end
end
