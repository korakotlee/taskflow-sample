module Api
  module V1
    class AuthController < ApplicationController
      skip_before_action :authenticate_request, only: [:register, :login]

      def register
        user = User.new(user_params)

        if user.save
          token = generate_token(user)
          render json: { user: UserSerializer.new(user).serializable_hash[:data][:attributes], token: token }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def login
        user = User.find_by(email: params[:email]&.downcase)

        if user&.authenticate(params[:password])
          token = generate_token(user)
          render json: { user: UserSerializer.new(user).serializable_hash[:data][:attributes], token: token }
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end

      def me
        render json: { user: UserSerializer.new(current_user).serializable_hash[:data][:attributes] }
      end

      private

      def user_params
        params.require(:user).permit(:email, :name, :password, :password_confirmation)
      end

      def generate_token(user)
        payload = { user_id: user.id, exp: 24.hours.from_now.to_i }
        JWT.encode(payload, Rails.application.credentials.secret_key_base, 'HS256')
      end
    end
  end
end
