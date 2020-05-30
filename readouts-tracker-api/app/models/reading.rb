class Reading < ApplicationRecord
  scope :filter_by_category_and_day, lambda { |category_id = nil, day = nil|
    where(category_id: category_id, day: day)
  }
  scope :sum_hours, -> { joins(:category).group('categories.name').sum(:hours) }
  scope :sum_minutes, -> { joins(:category).group('categories.name').sum(:minutes) }
  belongs_to :user
  belongs_to :category

  # validations
  validates_presence_of :description, :hours, :minutes, :day
end
