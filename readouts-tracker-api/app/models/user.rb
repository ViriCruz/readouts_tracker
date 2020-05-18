class User < ApplicationRecord
  # encrypt password
  has_secure_password
  has_many :readings, dependent: :destroy
  has_many :measurements, dependent: :destroy

  # validations
  validates_presence_of :first_name, :last_name, :email, :password_digest

end
