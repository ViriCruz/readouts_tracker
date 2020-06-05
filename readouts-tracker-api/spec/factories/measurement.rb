FactoryBot.define do
  factory :measurement do
    day { Faker::Date.forward(days: 2) }
    total_time { '04:34' }
  end
end
