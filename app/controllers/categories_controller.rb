# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_categories, only: [ :index ]
  skip_before_action :authenticate_user_using_x_auth_token, only: [ :index ]
  def index
    render_json({ categories: @categories.as_json(only: %i[id name]) })
  end

  def create
    category = Category.new(category_params)
    if category.save
      render_notice(t("successfully_created"), :created)
    else
      render_error(category.errors.full_messages.to_sentence, :unprocessable_entity)
    end
  end

  private

    def load_categories
      @categories = Category.order(:name)
    end

    def category_params
      params.require(:category).permit(:name)
    end
end
