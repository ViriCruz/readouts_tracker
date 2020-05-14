class User < ApplicationRecord
  has_many :readings, dependent: :destroy

  # validations
  validates_presence_of :first_name, :last_name, :email
end
