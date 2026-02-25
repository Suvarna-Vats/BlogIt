# frozen_string_literal: true

class PostPdfExport < ApplicationRecord
  STATUSES = %w[queued generating completed failed].freeze

  belongs_to :post
  belongs_to :user

  validates :token, presence: true, uniqueness: true
  validates :status, inclusion: { in: STATUSES }
  validates :progress, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }

  before_validation :ensure_token, on: :create

  private

    def ensure_token
      self.token ||= SecureRandom.urlsafe_base64(24)
    end
end
