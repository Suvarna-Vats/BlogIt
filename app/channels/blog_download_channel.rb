# frozen_string_literal: true

class BlogDownloadChannel < ApplicationCable::Channel
  def subscribed
    pubsub_token = params[:pubsub_token].to_s
    stream_from pubsub_token if pubsub_token.present?
  end

  def unsubscribed
    stop_all_streams
  end
end
