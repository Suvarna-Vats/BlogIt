# frozen_string_literal: true

class PostPdfExportJob
  include Sidekiq::Job

  def perform(export_id)
    export = PostPdfExport.includes(post: [ :user, :categories ]).find(export_id)
    post = export.post

    export.update!(status: "generating", progress: 10)
    ActionCable.server.broadcast(
      export.user_id.to_s,
      { message: I18n.t("report.render"), progress: 25 }
    )

    html = ApplicationController.render(
      assigns: { post: },
      template: "posts/pdf/download",
      layout: "pdf"
    )

    ActionCable.server.broadcast(
      export.user_id.to_s,
      { message: I18n.t("report.generate"), progress: 50 }
    )
    export.update!(progress: 55)
    pdf_blob = WickedPdf.new.pdf_from_string(html)

    ActionCable.server.broadcast(
      export.user_id.to_s,
      { message: I18n.t("report.upload"), progress: 75 }
    )
    export.update!(progress: 80)

    dir = Rails.root.join("tmp", "post_pdf_exports")
    FileUtils.mkdir_p(dir)
    path = dir.join("#{export.token}.pdf")
    File.binwrite(path, pdf_blob)

    export.update!(status: "completed", progress: 100, file_path: path.to_s)
    ActionCable.server.broadcast(
      export.user_id.to_s,
      { message: I18n.t("report.attach"), progress: 100 }
    )
  rescue StandardError => e
    begin
      export&.update!(status: "failed", error_message: e.message, progress: export.progress)
      ActionCable.server.broadcast(
        export.user_id.to_s,
        { message: I18n.t("generic_error"), progress: export.progress }
      )
    rescue StandardError
      # swallow errors while reporting failure
    end
    raise
  end
end
