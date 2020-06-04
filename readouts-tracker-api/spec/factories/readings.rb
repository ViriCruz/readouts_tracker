FactoryBot.define do
  factory :reading do
    description { Faker::Lorem.word }
    hours { Faker::Number.number(digits: 2) }
    minutes { Faker::Number.number(digits: 2) }
    day { Faker::Date.between(from: 1.days.ago, to: Date.today) }
  end
end
