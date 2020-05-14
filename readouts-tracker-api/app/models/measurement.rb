class Measurement < ApplicationRecord
  belongs_to :category

  # validations
  validates_presence_of :day, :total_time
end
