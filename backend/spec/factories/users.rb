FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    name { Faker::Name.name }
    password { 'password123' }
    avatar_url { "" }
  end
end
