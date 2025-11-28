module Api
  module V1
    class TasksController < ApplicationController
      before_action :set_project, only: [:index, :create]
      before_action :set_task, only: [:show, :update, :destroy]
      before_action :authorize_task, only: [:update, :destroy]

      def index
        tasks = @project.tasks.includes(:assignee, :creator)
        render json: TaskSerializer.new(tasks).serializable_hash
      end

      def show
        render json: TaskSerializer.new(@task).serializable_hash
      end

      def create
        task = @project.tasks.build(task_params)
        task.creator = current_user

        if task.save
          render json: TaskSerializer.new(task).serializable_hash, status: :created
        else
          render json: { errors: task.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @task.update(task_params)
          render json: TaskSerializer.new(@task).serializable_hash
        else
          render json: { errors: @task.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @task.destroy
        head :no_content
      end

      def my_tasks
        tasks = current_user.assigned_tasks.includes(:project, :creator)
        render json: TaskSerializer.new(tasks).serializable_hash
      end

      private

      def set_project
        @project = Project.find(params[:project_id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Project not found' }, status: :not_found
      end

      def set_task
        @task = Task.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Task not found' }, status: :not_found
      end

      def authorize_task
        unless @task.project.user_id == current_user.id || @task.creator_id == current_user.id
          render json: { error: 'Forbidden' }, status: :forbidden
        end
      end

      def task_params
        params.require(:task).permit(:title, :description, :status, :priority, :due_date, :assignee_id)
      end
    end
  end
end
