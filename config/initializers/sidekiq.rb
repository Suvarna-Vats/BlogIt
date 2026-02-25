# frozen_string_literal: true

Sidekiq.configure_server do |config|
  config.redis = {
    url: ENV.fetch("REDIS_URL", "redis://localhost:6379/0"),
    size: Integer(ENV.fetch("SIDEKIQ_REDIS_POOL_SIZE", "10"))
  }
end

Sidekiq.configure_client do |config|
  config.redis = {
    url: ENV.fetch("REDIS_URL", "redis://localhost:6379/0"),
    size: Integer(ENV.fetch("SIDEKIQ_REDIS_POOL_SIZE", "2"))
  }
end
