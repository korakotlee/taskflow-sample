Rails.application.routes.draw do
  # Health check endpoint
  get '/health', to: 'health#show'

  # API namespace (version 1)
  namespace :api do
    namespace :v1 do
      # Authentication
      post '/auth/register', to: 'auth#register'
      post '/auth/login', to: 'auth#login'
      get '/auth/me', to: 'auth#me'

      # Projects (nested tasks)
      resources :projects do
        resources :tasks, only: [:index, :create]
      end

      # Tasks (standalone for update/delete)
      resources :tasks, only: [:show, :update, :destroy] do
        resources :comments, only: [:index, :create]
      end

      # Comments
      resources :comments, only: [:update, :destroy]

      # Current user's tasks
      get '/my_tasks', to: 'tasks#my_tasks'
    end
  end
end
