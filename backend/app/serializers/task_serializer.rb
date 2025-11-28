class TaskSerializer
  include JSONAPI::Serializer

  attributes :id, :title, :description, :status, :priority, :due_date, :created_at, :updated_at

  attribute :project_id do |task|
    task.project_id
  end

  attribute :creator do |task|
    {
      id: task.creator.id,
      name: task.creator.name,
      email: task.creator.email
    }
  end

  attribute :assignee do |task|
    if task.assignee.present?
      {
        id: task.assignee.id,
        name: task.assignee.name,
        email: task.assignee.email
      }
    end
  end
end
