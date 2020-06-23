FactoryBot.define do
  factory :measurement do
    day { Faker::Date.forward(days: 5) }
    total_time { '04:34' }
  end
end
