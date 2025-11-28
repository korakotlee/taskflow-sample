class Task < ApplicationRecord
  belongs_to :project
  belongs_to :creator, class_name: 'User'
  belongs_to :assignee, class_name: 'User', optional: true
  has_many :comments, dependent: :destroy

  validates :title, presence: true
  validates :status, inclusion: { in: %w[todo in_progress done] }
  validates :priority, inclusion: { in: %w[low medium high] }

  # Scopes for common queries
  scope :by_status, ->(status) { where(status: status) }
  scope :by_priority, ->(priority) { where(priority: priority) }
  scope :overdue, -> { where('due_date < ?', Date.today).where.not(status: 'done') }
  scope :assigned_to, ->(user) { where(assignee: user) }
end
