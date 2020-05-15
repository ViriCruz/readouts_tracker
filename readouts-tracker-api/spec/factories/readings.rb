FactoryBot.define do
  factory :reading do
    description { Faker::Lorem.word }
    duration { Faker::Time.backward(days: 5, period: :morning, format: :short) }
  end
end