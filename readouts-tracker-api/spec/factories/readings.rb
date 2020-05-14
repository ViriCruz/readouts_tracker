FactoryBot.define do
  factory :reading do
    description { Faker::Lorem.word }
    duration { Faker::Time }
  end
end