class Reading < ApplicationRecord
  belongs_to :user
  belongs_to :category

  # validations
  validates_presence_of :description, :hours, :minutes
end
