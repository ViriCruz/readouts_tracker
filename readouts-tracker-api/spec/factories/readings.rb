FactoryBot.define do
  factory :reading do
    description { Faker::Lorem.word }
    hours { Faker::Number.number(digits: 2) }
    minutes { Faker::Number.number(digits: 2) }
  end
end