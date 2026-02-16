# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_categories, only: [ :index ]

  def index
    render_json({ categories: @categories.as_json(only: %i[id name]) })
  end

  private

    def load_categories
      @categories = Category.order(:name)
    end
end
