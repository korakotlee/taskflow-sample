require 'rails_helper'

RSpec.describe 'Api::V1::Tasks', type: :request do
  let(:user) { create(:user) }
  let(:project) { create(:project, user: user) }
  let(:token) { JWT.encode({ user_id: user.id }, Rails.application.credentials.secret_key_base, 'HS256') }
  let(:headers) { { 'Authorization' => "Bearer #{token}" } }

  describe 'GET /api/v1/projects/:project_id/tasks' do
    it 'returns tasks for the project' do
      task1 = create(:task, project: project, creator: user)
      task2 = create(:task, project: project, creator: user)

      get "/api/v1/projects/#{project.id}/tasks", headers: headers

      expect(response).to have_http_status(:ok)
      json = JSON.parse(response.body)
      expect(json['data'].length).to eq(2)
    end
  end

  describe 'POST /api/v1/projects/:project_id/tasks' do
    it 'creates a new task' do
      task_params = {
        task: {
          title: 'New task',
          description: 'Task description',
          status: 'todo',
          priority: 'high'
        }
      }

      expect {
        post "/api/v1/projects/#{project.id}/tasks", params: task_params, headers: headers
      }.to change(Task, :count).by(1)

      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json['data']['attributes']['title']).to eq('New task')
    end
  end

  describe 'PATCH /api/v1/tasks/:id' do
    let(:task) { create(:task, project: project, creator: user) }

    it 'updates the task' do
      patch "/api/v1/tasks/#{task.id}", params: { task: { status: 'done' } }, headers: headers

      expect(response).to have_http_status(:ok)
      expect(task.reload.status).to eq('done')
    end
  end
end
