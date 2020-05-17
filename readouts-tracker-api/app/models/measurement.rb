class Measurement < ApplicationRecord
  belongs_to :category
  belongs_to :user

  # validations
  validates_presence_of :day, :total_time
end
