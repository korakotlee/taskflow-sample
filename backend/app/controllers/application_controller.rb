class ApplicationController < ActionController::API
  before_action :authenticate_request

  private

  # Authenticate user via JWT token
  def authenticate_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header

    begin
      @decoded = JWT.decode(header, Rails.application.credentials.secret_key_base, true, { algorithm: 'HS256' })
      @current_user = User.find(@decoded[0]['user_id'])
    rescue ActiveRecord::RecordNotFound, JWT::DecodeError
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end
end
