# frozen_string_literal: true

class User < ApplicationRecord
  belongs_to :organization
  has_many :posts, dependent: :destroy

  has_secure_password

  validates :name, presence: true
  validates :email, uniqueness: true, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  validates :password, presence: true, length: { minimum: 6 }, if: :password_digest_changed?
  validates :password_confirmation, presence: true, if: :password_digest_changed?
end
