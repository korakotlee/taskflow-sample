FactoryBot.define do
  factory :task do
    association :project
    association :creator, factory: :user
    association :assignee, factory: :user
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    status { 'todo' }
    priority { 'medium' }
    due_date { Date.today + 7 }
  end
end
