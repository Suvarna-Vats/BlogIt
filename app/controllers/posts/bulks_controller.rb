# frozen_string_literal: true

class Posts::BulksController < ApplicationController
  after_action :verify_authorized

  def update
    authorize Post, :bulk_update?

    Posts::BulksService.new(user: current_user).update_status!(
      ids: bulk_update_params[:ids],
      status: bulk_update_params[:status]
    )

    render_notice(t("successfully_updated"))
  end

  def destroy
    authorize Post, :bulk_destroy?

    Posts::BulksService.new(user: current_user).destroy!(
      ids: bulk_destroy_params[:ids]
    )

    render_notice(t("successfully_deleted"))
  end

  private

    def bulk_update_params
      params.require(:post).permit(:status, ids: [])
    end

    def bulk_destroy_params
      params.require(:post).permit(ids: [])
    end
end
