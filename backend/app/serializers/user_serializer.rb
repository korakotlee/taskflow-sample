class UserSerializer
  include JSONAPI::Serializer

  attributes :id, :email, :name, :avatar_url, :created_at

  # Exclude password_digest from JSON
end
