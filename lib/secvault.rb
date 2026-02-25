# frozen_string_literal: true

module Secvault
  class Secrets
    def redis_url
      ENV.fetch("REDIS_URL", "redis://localhost:6379/0")
    end
  end

  def self.secrets
    @secrets ||= Secrets.new
  end
end
