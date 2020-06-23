class Category < ApplicationRecord
  has_many :readings, dependent: :destroy
  has_many :measurements, dependent: :destroy
  # validations
  validates_presence_of :name
end
