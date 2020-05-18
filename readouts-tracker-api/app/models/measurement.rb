class Measurement < ApplicationRecord
  scope :all_measurements, -> { joins(:category).group('categories.name') } # where day equals Date
  belongs_to :category
  belongs_to :user

  # validations
  validates_presence_of :day, :total_time
end
