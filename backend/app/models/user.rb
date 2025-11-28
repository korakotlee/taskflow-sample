class User < ApplicationRecord
  # Secure password handling (uses bcrypt)
  has_secure_password

  # Associations
  has_many :projects, dependent: :destroy
  has_many :created_tasks, class_name: 'Task', foreign_key: 'creator_id', dependent: :destroy
  has_many :assigned_tasks, class_name: 'Task', foreign_key: 'assignee_id', dependent: :nullify
  has_many :comments, dependent: :destroy

  # Validations
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :name, presence: true
  validates :password, length: { minimum: 6 }, if: -> { password.present? }

  # Callbacks
  before_save :downcase_email

  private

  def downcase_email
    self.email = email.to_s.downcase
  end
end
