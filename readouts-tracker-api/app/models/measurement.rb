class Measurement < ApplicationRecord
  scope :all_measurements, lambda { |day = nil| where(day: day).order(created_at: :desc) } # where day equals Date
  belongs_to :category
  belongs_to :user

  # validations
  validates_presence_of :day, :total_time
end
