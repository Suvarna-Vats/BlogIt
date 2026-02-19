# frozen_string_literal: true

class UsersController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :create

  def create
    user = User.new(user_params)

    if user.save
      @user = user
      render status: :created
    else
      render_error(user.errors.full_messages.to_sentence, :unprocessable_entity)
    end
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
