# frozen_string_literal: true

class Posts::PdfExportsController < ApplicationController
  before_action :set_post
  after_action :verify_authorized

  def create
    authorize @post, :show?

    export = PostPdfExport.create!(
      post: @post,
      user: current_user,
      status: "queued",
      progress: 0
    )

    PostPdfExportJob.perform_async(export.id)

    render_json({ token: export.token, status: export.status, progress: export.progress }, :created)
  end

  def show
    authorize @post, :show?

    export = PostPdfExport.find_by!(token: params[:token], post_id: @post.id, user_id: current_user.id)

    if export.status == "failed"
      return render_error(export.error_message.presence || I18n.t("generic_error"), :unprocessable_entity)
    end

    if export.status != "completed" || export.file_path.blank? || !File.exist?(export.file_path)
      return render_json({ status: export.status, progress: export.progress }, :accepted)
    end

    filename = "#{@post.slug}-blog-post.pdf"
    pdf_bytes = File.binread(export.file_path)

    File.delete(export.file_path) if File.exist?(export.file_path)
    export.destroy!

    send_data pdf_bytes,
      filename:,
      type: "application/pdf",
      disposition: "attachment"
  end

  private

    def set_post
      @post = Post
        .includes(:user, :organization, :categories)
        .find_by!(slug: params[:post_slug], organization_id: current_user.organization_id)
    end
end
