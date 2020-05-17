require 'rails_helper'
# Test suite for the User model
RSpec.describe User, type: :model do
  # Association test
  # ensure User model has 1:m relationship with the Reading model
  it { should have_many(:readings).dependent(:destroy) }
  it { should have_many(:measurements).dependent(:destroy) }
  # Validation tests
  # ensure columns first_name, last_name and email are present before saving
  it { should validate_presence_of(:first_name) }
  it { should validate_presence_of(:last_name) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password_digest) }
end